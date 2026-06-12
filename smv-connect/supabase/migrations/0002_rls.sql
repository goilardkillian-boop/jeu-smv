-- SMV Connect — Row Level Security
--
-- Règles :
--  * les contenus publiés/actifs sont lisibles par tous (anon) ;
--  * les recruteurs/admins de centre ne voient et ne modifient que les
--    données de LEUR centre ;
--  * les super admins voient tout ;
--  * les candidatures : INSERT public (dépôt anonyme), lecture/écriture
--    réservées aux admins du centre concerné.

-- Fonctions utilitaires (SECURITY DEFINER pour éviter la récursion RLS
-- sur la table profiles).
CREATE OR REPLACE FUNCTION public.user_role()
RETURNS TEXT LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT role FROM profiles WHERE id = auth.uid() AND actif = TRUE;
$$;

CREATE OR REPLACE FUNCTION public.user_centre_id()
RETURNS UUID LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT centre_id FROM profiles WHERE id = auth.uid() AND actif = TRUE;
$$;

CREATE OR REPLACE FUNCTION public.is_super_admin()
RETURNS BOOLEAN LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT COALESCE(public.user_role() = 'super_admin', FALSE);
$$;

CREATE OR REPLACE FUNCTION public.is_admin_du_centre(cible UUID)
RETURNS BOOLEAN LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT public.is_super_admin()
         OR (public.user_role() IS NOT NULL AND public.user_centre_id() = cible);
$$;

ALTER TABLE centres      ENABLE ROW LEVEL SECURITY;
ALTER TABLE formations   ENABLE ROW LEVEL SECURITY;
ALTER TABLE actualites   ENABLE ROW LEVEL SECURITY;
ALTER TABLE temoignages  ENABLE ROW LEVEL SECURITY;
ALTER TABLE partenaires  ENABLE ROW LEVEL SECURITY;
ALTER TABLE candidatures ENABLE ROW LEVEL SECURITY;
ALTER TABLE profiles     ENABLE ROW LEVEL SECURITY;

-- ------------------------------------------------------------------ centres
CREATE POLICY "centres_lecture_publique" ON centres
  FOR SELECT USING (actif = TRUE OR public.is_admin_du_centre(id));

CREATE POLICY "centres_maj_admin" ON centres
  FOR UPDATE USING (public.is_admin_du_centre(id))
  WITH CHECK (public.is_admin_du_centre(id));

CREATE POLICY "centres_insert_super" ON centres
  FOR INSERT WITH CHECK (public.is_super_admin());

CREATE POLICY "centres_delete_super" ON centres
  FOR DELETE USING (public.is_super_admin());

-- --------------------------------------------------------------- formations
CREATE POLICY "formations_lecture_publique" ON formations
  FOR SELECT USING (actif = TRUE OR public.is_admin_du_centre(centre_id));

CREATE POLICY "formations_crud_admin" ON formations
  FOR ALL USING (public.is_admin_du_centre(centre_id))
  WITH CHECK (public.is_admin_du_centre(centre_id));

-- --------------------------------------------------------------- actualites
CREATE POLICY "actualites_lecture_publique" ON actualites
  FOR SELECT USING (
    publie = TRUE
    OR public.is_super_admin()
    OR (centre_id IS NOT NULL AND public.is_admin_du_centre(centre_id))
  );

CREATE POLICY "actualites_crud_admin" ON actualites
  FOR ALL USING (
    public.is_super_admin()
    OR (centre_id IS NOT NULL AND public.is_admin_du_centre(centre_id))
  )
  WITH CHECK (
    public.is_super_admin()
    OR (centre_id IS NOT NULL AND public.is_admin_du_centre(centre_id))
  );

-- -------------------------------------------------------------- temoignages
CREATE POLICY "temoignages_lecture_publique" ON temoignages
  FOR SELECT USING (
    publie = TRUE
    OR public.is_super_admin()
    OR (centre_id IS NOT NULL AND public.is_admin_du_centre(centre_id))
  );

CREATE POLICY "temoignages_crud_admin" ON temoignages
  FOR ALL USING (
    public.is_super_admin()
    OR (centre_id IS NOT NULL AND public.is_admin_du_centre(centre_id))
  )
  WITH CHECK (
    public.is_super_admin()
    OR (centre_id IS NOT NULL AND public.is_admin_du_centre(centre_id))
  );

-- -------------------------------------------------------------- partenaires
CREATE POLICY "partenaires_lecture_publique" ON partenaires
  FOR SELECT USING (TRUE);

CREATE POLICY "partenaires_crud_admin" ON partenaires
  FOR ALL USING (
    public.is_super_admin()
    OR (centre_id IS NOT NULL AND public.is_admin_du_centre(centre_id))
  )
  WITH CHECK (
    public.is_super_admin()
    OR (centre_id IS NOT NULL AND public.is_admin_du_centre(centre_id))
  );

-- ------------------------------------------------------------- candidatures
-- Dépôt public (formulaire anonyme), avec statut initial imposé.
CREATE POLICY "candidatures_depot_public" ON candidatures
  FOR INSERT TO anon, authenticated
  WITH CHECK (statut = 'en_attente' AND notes_recruteur IS NULL);

-- Visibles uniquement par les admins du centre concerné (ou super admin).
CREATE POLICY "candidatures_lecture_admin" ON candidatures
  FOR SELECT USING (public.is_admin_du_centre(centre_id));

CREATE POLICY "candidatures_maj_admin" ON candidatures
  FOR UPDATE USING (public.is_admin_du_centre(centre_id))
  WITH CHECK (public.is_admin_du_centre(centre_id));

CREATE POLICY "candidatures_delete_super" ON candidatures
  FOR DELETE USING (public.is_super_admin());

-- ----------------------------------------------------------------- profiles
CREATE POLICY "profiles_lecture_soi_ou_super" ON profiles
  FOR SELECT USING (id = auth.uid() OR public.is_super_admin());

CREATE POLICY "profiles_gestion_super" ON profiles
  FOR ALL USING (public.is_super_admin())
  WITH CHECK (public.is_super_admin());

-- ------------------------------------------------------------------ storage
CREATE POLICY "images_lecture_publique" ON storage.objects
  FOR SELECT USING (bucket_id = 'images');

CREATE POLICY "images_upload_admin" ON storage.objects
  FOR INSERT TO authenticated
  WITH CHECK (bucket_id = 'images' AND public.user_role() IS NOT NULL);

CREATE POLICY "images_suppression_admin" ON storage.objects
  FOR DELETE TO authenticated
  USING (bucket_id = 'images' AND public.user_role() IS NOT NULL);

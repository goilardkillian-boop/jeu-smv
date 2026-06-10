// Prompts de génération pixel art (Hugging Face Inference API).
// Utilisés par imageGenerator.ts quand un token HF est fourni.
// Sans token : placeholders procéduraux (voir PixelBackground.tsx).

export const BACKGROUND_PROMPTS: Record<string, string> = {
  chambre_avant:
    'pixel art 16-bit, messy teenager bedroom in France, closed curtains, dim daylight, clothes on floor, melancholic blue tones, no people',
  phone_screen:
    'pixel art 16-bit, cracked smartphone screen close-up, glowing SMS notification, dark room background, blue light on face area, no people',
  mission_locale:
    'pixel art 16-bit, French job center office interior, desk with computer, motivational posters, fluorescent lighting, warm beige tones, no people',
  arret_bus:
    'pixel art 16-bit, lonely bus stop in light rain, French suburban street, grey morning sky, puddles reflecting streetlight, no people',
  caserne_exterior_rain:
    'pixel art 16-bit, French military barracks exterior gate, La Rochelle France, night light rain, puddles on cobblestones, navy blue tones, atmospheric, no people',
  caserne_exterior_jour:
    'pixel art 16-bit, French military barracks exterior gate in morning sunlight, open gate, hopeful golden tones, no people',
  cour_caserne:
    'pixel art 16-bit, military barracks courtyard, flagpole with French flag, formation ground markings, overcast sky, green and navy tones, no people',
  cour_ceremonie:
    'pixel art 16-bit, military ceremony courtyard, French flags, podium, families standing on the side, golden morning light, festive solemn atmosphere',
  magasin_habillement:
    'pixel art 16-bit, military clothing warehouse interior, shelves of folded camouflage uniforms, boots rows, counter, fluorescent light, no people',
  chambree:
    'pixel art 16-bit, military dormitory room, eight beds with perfect square folded blankets, metal lockers, window with courtyard view, daylight',
  chambree_nuit:
    'pixel art 16-bit, military dormitory at night, moonlight through window, dark blue shadows, sleeping silhouettes in beds, quiet atmosphere',
  refectoire:
    'pixel art 16-bit, military mess hall interior, long tables, food counter, warm lighting, steam from kitchen, busy atmosphere',
  foyer:
    'pixel art 16-bit, military recreation room, old TV, couch, foosball table, vending machine, warm evening lighting, cozy',
  zone_fumeur:
    'pixel art 16-bit, outdoor smoking area near barracks wall, bench, cigarette bin, evening light, chain link fence, no people',
  couloir:
    'pixel art 16-bit, long military barracks corridor, polished floor reflecting ceiling lights, doors on both sides, notice board',
  salle_formation:
    'pixel art 16-bit, classroom in military barracks, desks in rows, whiteboard, educational posters, daylight through windows, no people',
  bureau_ferreira:
    'pixel art 16-bit, strict military office, tidy desk, French flag, maps on wall, single chair facing desk, authority atmosphere, no people',
  bureau_moreau:
    'pixel art 16-bit, officer office with bookshelves, organized files, window with harbor view, calm professional atmosphere, no people',
  bureau_commandant:
    'pixel art 16-bit, commanding officer office, imposing wooden desk, medals display, French and regiment flags, solemn atmosphere, no people',
  bureau_claire:
    'pixel art 16-bit, social worker office, green plants, warm lamp light, two comfortable chairs, tissue box on small table, reassuring atmosphere, no people',
  terrain_boue:
    'pixel art 16-bit, military obstacle course in mud, wooden walls, rope obstacles, rain, grey sky, splashing mud, dramatic',
  camp_karola_jour:
    'pixel art 16-bit, military bivouac camp daytime, Atlantic coast France, canvas tents, pine trees, sandy ground, ocean glimpse in background',
  camp_karola_night:
    'pixel art 16-bit, military bivouac camp night, Île de Ré France Atlantic coast, canvas tents, campfire glow, stars visible, pine trees, ocean background',
  route_aube:
    'pixel art 16-bit, country road at dawn, dark blue sky turning orange, marching column silhouettes with red lamps, mist, atmospheric',
  route_jour:
    'pixel art 16-bit, country road in daylight, French countryside, line of marching soldiers with backpacks, clouds, determined atmosphere',
  ville_larochelle:
    'pixel art 16-bit, La Rochelle France old port, Tour de la Chaîne, Tour Saint-Nicolas, golden hour sunset, Atlantic ocean, fishing boats',
  stage_lieu:
    'pixel art 16-bit, French workplace interior, warehouse or workshop, professional equipment, morning light, work atmosphere, no people'
};

export const SPRITE_PROMPTS: Record<string, string> = {
  ferreira:
    'pixel art character sprite, French military adjutant 38 years, stern face, salt-pepper hair, military camouflage uniform, medals, front facing, no background',
  ines:
    'pixel art character sprite, young French woman 20 years, brown ponytail, uncertain expression, military volunteer uniform, front facing, no background',
  dimitri:
    'pixel art character sprite, young man 23 years, big smile, short dark hair, military volunteer uniform, energetic pose, front facing, no background',
  moreau:
    'pixel art character sprite, French military captain 41 years, calm precise expression, impeccable uniform, front facing, no background',
  thomas:
    'pixel art character sprite, young man 19 years, fragile look, light brown hair, slightly oversized military uniform, anxious expression, front facing, no background',
  kevin:
    'pixel art character sprite, muscular young man 22 years, short hair, sporty build, military t-shirt, confident smile, front facing, no background',
  lea: 'pixel art character sprite, young woman 21 years, observant eyes, sketchbook under arm, military volunteer uniform, quiet expression, front facing, no background',
  momo: 'pixel art character sprite, friendly cook 47 years, white apron over kitchen uniform, moustache, knowing smile, front facing, no background',
  claire:
    'pixel art character sprite, social worker woman 35 years, civilian clothes cardigan, warm reassuring expression, front facing, no background',
  enzo: 'pixel art character sprite, young man 22 years, smirk, leaning posture, military uniform worn casually, cigarette behind ear, front facing, no background'
};

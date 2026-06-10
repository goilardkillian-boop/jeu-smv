export function CRTOverlay({ enabled }: { enabled: boolean }) {
  if (!enabled) return null;
  return <div className="crt-overlay" aria-hidden="true" />;
}

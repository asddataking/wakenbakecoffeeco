export function DemoModeBanner({ show }: { show: boolean }) {
  if (!show) return null;

  return (
    <div
      role="status"
      className="border-b border-sunrise/40 bg-sunrise/15 text-ocean-deep"
    >
      <div className="mx-auto max-w-6xl px-4 py-2 text-center text-sm font-medium">
        Development demo mode — mock catalog only. Shopify credentials are not connected.
        This banner never appears as a silent substitute for live commerce in production.
      </div>
    </div>
  );
}

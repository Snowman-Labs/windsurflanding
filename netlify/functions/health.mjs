export default async () => {
  return new Response(JSON.stringify({ ok: true, ts: Date.now() }), {
    headers: { 'Content-Type': 'application/json' },
    status: 200,
  });
};

export const config = {
  path: ['/api/health', '/healthz']
};

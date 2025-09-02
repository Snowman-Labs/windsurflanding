// Netlify Function: GET Pipefy form fields
// Usage: GET /.netlify/functions/pipefy-fields?pipeId=306642120

const PIPEFY_API = 'https://api.pipefy.com/graphql';

export default async (req) => {
  try {
    const url = new URL(req.url);
    const pipeId = url.searchParams.get('pipeId') || '306642120';

    const token = Netlify?.env?.get?.('PIPEFY_TOKEN') || process.env.PIPEFY_TOKEN;
    if (!token) {
      return new Response(JSON.stringify({ error: 'PIPEFY_TOKEN not configured' }), { status: 500 });
    }

    const query = `
      query GetPipe($id: ID!) {
        pipe(id: $id) {
          id
          name
          start_form_fields { id label type description required }
        }
      }
    `;

    const res = await fetch(PIPEFY_API, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({ query, variables: { id: pipeId } }),
    });

    const data = await res.json();
    if (!res.ok || data.errors) {
      return new Response(JSON.stringify({ error: 'Pipefy API error', details: data.errors || data }), { status: 502 });
    }

    return new Response(JSON.stringify(data.data.pipe), {
      headers: { 'Content-Type': 'application/json' },
      status: 200,
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: 'Unexpected error', details: String(err) }), { status: 500 });
  }
};

export const config = {
  path: '/api/pipefy/fields',
};

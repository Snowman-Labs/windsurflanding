// Netlify Function: GET Pipefy form fields
// Usage: GET /.netlify/functions/pipefy-fields?pipeId=306642120

const PIPEFY_API = 'https://api.pipefy.com/graphql';

export default async function handler(event, context) {
  try {
    const url = new URL(event.url);
    const pipeId = url.searchParams.get('pipeId') || '306642120';

    // Try multiple ways to get the token
    const token = process.env.PIPEFY_TOKEN || 
                  context?.env?.PIPEFY_TOKEN ||
                  Netlify?.env?.get?.('PIPEFY_TOKEN') ||
                  'eyJhbGciOiJIUzUxMiJ9.eyJpc3MiOiJQaXBlZnkiLCJpYXQiOjE3NTY4NDE5MjAsImp0aSI6IjY4NzQwYjEzLTU1OGQtNGQ1MS1iYjFkLWRlMmNjMzJmMzFkZSIsInN1YiI6MzAzMjk1MzQwLCJ1c2VyIjp7ImlkIjozMDMyOTUzNDAsImVtYWlsIjoic3Vwb3J0ZUBzbm93bWFubGFicy5jb20ifSwidXNlcl90eXBlIjoiYXV0aGVudGljYXRlZCJ9.s6lAhBXge_I6hagZKY3j0bG1w0otsA7wA2TbKtj5jR4BH7MoexFqMV2XbCnawrJdtG2sy7m3b21KI7i0Xn1s2w';
    
    if (!token) {
      return new Response(JSON.stringify({ error: 'PIPEFY_TOKEN not configured', hint: 'Create a .env with PIPEFY_TOKEN=... for local dev' }), { status: 500 });
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

// Netlify Function: POST Pipefy create card
import 'dotenv/config'
// Usage: POST /.netlify/functions/pipefy-submit
// Body JSON: { pipeId: 306642120, title?: string, fields: [{ id: string, value: any }] }

const PIPEFY_API = 'https://api.pipefy.com/graphql';

export default async (req) => {
  try {
    if (req.method !== 'POST') {
      return new Response(JSON.stringify({ error: 'Method not allowed' }), { status: 405 });
    }

    const token = (globalThis.Netlify?.env?.get?.('PIPEFY_TOKEN')) || process.env.PIPEFY_TOKEN;
    if (!token) {
      return new Response(JSON.stringify({ error: 'PIPEFY_TOKEN not configured', hint: 'Create a .env with PIPEFY_TOKEN=... for local dev' }), { status: 500 });
    }

    const { pipeId, title, fields } = await req.json();
    if (!pipeId || !Array.isArray(fields) || fields.length === 0) {
      return new Response(JSON.stringify({ error: 'Missing pipeId or fields' }), { status: 400 });
    }

    const mutation = `
      mutation CreateCard($input: CreateCardInput!) {
        createCard(input: $input) {
          card { id url title }
        }
      }
    `;

    const input = {
      pipe_id: String(pipeId),
      title: title || 'Website Lead',
      fields_attributes: fields.map(f => ({ field_id: String(f.id), field_value: f.value }))
    };

    const res = await fetch(PIPEFY_API, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({ query: mutation, variables: { input } }),
    });

    const data = await res.json();
    if (!res.ok || data.errors) {
      return new Response(JSON.stringify({ error: 'Pipefy API error', details: data.errors || data }), { status: 502 });
    }

    return new Response(JSON.stringify(data.data.createCard.card), {
      headers: { 'Content-Type': 'application/json' },
      status: 200,
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: 'Unexpected error', details: String(err) }), { status: 500 });
  }
};

export const config = {
  path: '/api/pipefy/submit',
};

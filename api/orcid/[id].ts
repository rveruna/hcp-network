export const config = {
  runtime: 'edge'
};

export default async function handler(req: Request): Promise<Response> {
  const url = new URL(req.url);
  const orcid = url.pathname.split('/').pop();

  if (!orcid) {
    return new Response(JSON.stringify({ error: 'Missing ORCID ID' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  try {
    const res = await fetch(`https://pub.orcid.org/v3.0/${orcid}/person`, {
      headers: { Accept: 'application/json' }
    });

    const text = await res.text(); // Always parse as text
    try {
      const json = JSON.parse(text); // Confirm it's valid JSON
      return new Response(JSON.stringify(json), {
        status: res.status,
        headers: { 'Content-Type': 'application/json' }
      });
    } catch (err) {
      return new Response(JSON.stringify({ error: 'Invalid JSON from ORCID' }), {
        status: 502,
        headers: { 'Content-Type': 'application/json' }
      });
    }
  } catch (err) {
    console.error('Network or fetch error:', err);
    return new Response(JSON.stringify({ error: 'Fetch failed' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}

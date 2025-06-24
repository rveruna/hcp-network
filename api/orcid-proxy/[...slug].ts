// api/orcid-proxy/[...slug].ts
console.log('[ORCID PROXY] API route loaded');

export default async function handler(req, res) {
  console.log('[ORCID PROXY] API route loaded');

  const token = process.env.VITE_ORCID_TOKEN;
  const slug = req.query.slug;
  const targetPath = Array.isArray(slug) ? '/' + slug.join('/') : '';
  const targetUrl = `https://pub.orcid.org/v3.0${targetPath}`;

  console.log('[ORCID Proxy] Incoming slug:', slug);
  console.log('[ORCID Proxy] Full ORCID URL:', targetUrl);

  try {
    const proxyRes = await fetch(targetUrl, {
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${token}`
      }
    });

    console.log('[ORCID Proxy] ORCID responded with status:', proxyRes.status);

    const body = await proxyRes.text();
    res.status(proxyRes.status).send(body);
  } catch (err) {
    console.error('[ORCID Proxy] Error during fetch:', err);
    res.status(500).json({ error: 'Proxy failed' });
  }
}

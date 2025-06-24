export async function fetchOrcidProxy(orcid: string) {
  const res = await fetch(`/api/orcid?orcid=${orcid}`);
  if (!res.ok) throw new Error(`Failed to fetch ORCID ${orcid}`);
  return res.json();
}

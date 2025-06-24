export async function loadGraphML(url: string): Promise<{
  nodes: { id: string; label: string }[];
  links: { source: string; target: string; label: string }[];
}> {
  const res = await fetch(`${url}?t=${Date.now()}`, {
    cache: 'no-store'
  });
  const text = await res.text();
  const parser = new DOMParser();
  const xml = parser.parseFromString(text, 'text/xml');

  const nodes: { id: string; label: string }[] = [];
  const links: { source: string; target: string; label: string }[] = [];

  xml.querySelectorAll('node').forEach((el) => {
    const id = el.getAttribute('id')!;
    const label =
      Array.from(el.querySelectorAll('data')).find((d) => d.getAttribute('key')?.includes('label'))
        ?.textContent || '';
    nodes.push({ id, label });
  });

  xml.querySelectorAll('edge').forEach((el) => {
    const source = el.getAttribute('source')!;
    const target = el.getAttribute('target')!;
    const dataEl = Array.from(el.querySelectorAll('data')).find(
      (d) => d.getAttribute('key') === 'd1'
    );
    const label = dataEl?.textContent || '';
    links.push({ source, target, label });
  });

  console.log('[loadGraphML] Total nodes:', nodes.length);
  console.log('[loadGraphML] Total edges:', links.length);

  return { nodes, links };
}

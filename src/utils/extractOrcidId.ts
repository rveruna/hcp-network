export function extractOrcidId(id: string): string | null {
  const match = id.match(/\d{4}-\d{4}-\d{4}-\d{3}[0-9X]/);
  return match ? match[0] : null;
}

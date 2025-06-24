import { useState } from 'react';
import { parseOrcidRecord } from '../utils/parseOrcidRecord';

export function useOrcidProfile() {
  const [profileData, setProfileData] = useState<ReturnType<typeof parseOrcidRecord> | null>(null);

  const fetchProfile = async (nodeId: string) => {
    const orcidMatch = nodeId.match(/\d{4}-\d{4}-\d{4}-\d{3}[0-9X]/);
    const orcidId = orcidMatch?.[0];
    if (!orcidId) return;

    try {
      const ORCID_TOKEN = import.meta.env.VITE_ORCID_TOKEN;

      const baseUrl = '/api/orcid-proxy';

      const res = await fetch(`${baseUrl}/${orcidId}/record`, {
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${ORCID_TOKEN}`
        }
      });

      if (!res.ok) {
        console.warn(`Failed to fetch ORCID record for ${orcidId}`);
        return;
      }

      const data = await res.json();
      const parsed = parseOrcidRecord(data);
      setProfileData(parsed);
    } catch (err) {
      console.error('ORCID fetch failed', err);
    }
  };

  return { profileData, fetchProfile, setProfileData };
}

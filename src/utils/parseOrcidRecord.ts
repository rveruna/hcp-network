type ParsedOrcidData = {
  name: string;
  biography?: string;
  educations: string[];
  employments: string[];
  publications: string[];
};

export function parseOrcidRecord(record: any): ParsedOrcidData {
  const name =
    record?.person?.name?.['given-names']?.value +
    ' ' +
    record?.person?.name?.['family-name']?.value;

  const biography = record?.person?.biography?.content || '';

  const educations =
    record?.['activities-summary']?.educations?.['education-summary']?.map((edu: any) => {
      const institution = edu?.organization?.name || 'Unknown Institution';
      const role = edu?.roleTitle || 'Student';
      const startYear = edu?.['start-date']?.year?.value || '?';
      const endYear = edu?.['end-date']?.year?.value || '?';
      return `${role} at ${institution} (${startYear}–${endYear})`;
    }) || [];

  const employments =
    record?.['activities-summary']?.employments?.['employment-summary']?.map((job: any) => {
      const institution = job?.organization?.name || 'Unknown Organization';
      const role = job?.roleTitle || 'Employee';
      const startYear = job?.['start-date']?.year?.value || '?';
      const endYear = job?.['end-date']?.year?.value || 'Present';
      return `${role} at ${institution} (${startYear}–${endYear})`;
    }) || [];

  const publications =
    record?.['activities-summary']?.works?.group?.map((group: any) => {
      const title = group?.['work-summary']?.[0]?.title?.title?.value;
      const year = group?.['work-summary']?.[0]?.['publication-date']?.year?.value;
      return title ? `${title}${year ? ` (${year})` : ''}` : 'Untitled work';
    }) || [];

  return {
    name: name.trim(),
    biography,
    educations,
    employments,
    publications
  };
}

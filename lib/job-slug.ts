/**
 * Job URL slug: "job-title--uuid" so the URL shows the job name and we can resolve by id.
 * Format: slugify(title) + "--" + id (-- is used so we can split and get id; UUIDs don't contain "--")
 */

function slugify(title: string): string {
  return title
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '') || 'job';
}

/** Build URL segment for a job: e.g. "software-engineer--uuid-here" */
export function toJobSlug(title: string, id: string): string {
  const slug = slugify(title);
  return `${slug}--${id}`;
}

/** Extract job id from URL segment. Supports "slug--uuid" or plain "uuid" (backward compat). */
export function parseJobSlug(slug: string): string {
  if (!slug) return '';
  const idx = slug.indexOf('--');
  if (idx === -1) return slug; // legacy: entire param is id
  return slug.slice(idx + 2);
}

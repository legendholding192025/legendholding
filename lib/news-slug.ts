/**
 * News article URL slug: article-1, article-2, article-3, ...
 * Legacy: /news/[uuid] still works (param is resolved by id when it looks like a UUID).
 */

const UUID_REGEX = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
const ARTICLE_SLUG_REGEX = /^article-(\d+)$/;

/** Whether the URL param is a UUID (legacy id). */
export function isNewsIdParam(param: string): boolean {
  return UUID_REGEX.test(param);
}

/** URL segment for an article: slug if set (e.g. article-1), otherwise id for backward compatibility. */
export function getNewsArticleSlug(article: { slug?: string | null; id: string }): string {
  if (article.slug && article.slug.trim()) return article.slug;
  return article.id;
}

/** Parse number from slug like "article-1" => 1. Returns 0 if not matching. */
export function parseArticleSlugNumber(slug: string): number {
  const m = slug.match(ARTICLE_SLUG_REGEX);
  return m ? parseInt(m[1], 10) : 0;
}

/** Given existing slugs (e.g. from DB), return the next slug: "article-N". */
export function getNextArticleSlug(existingSlugs: (string | null | undefined)[]): string {
  const numbers = existingSlugs
    .filter((s): s is string => typeof s === 'string' && s.length > 0)
    .map(parseArticleSlugNumber)
    .filter((n) => n > 0);
  const max = numbers.length > 0 ? Math.max(...numbers) : 0;
  return `article-${max + 1}`;
}

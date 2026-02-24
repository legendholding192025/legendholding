# QA Checklist: News Article Slugs (article-1, article-2) — Pre-Production

Use this checklist before deploying the news slug feature to production.

---

## 1. Database & Migrations

- [ ] **Run migrations in order** (Supabase Dashboard → SQL Editor or `supabase db push`):
  1. `20250624000000_add_news_articles_slug.sql` — adds `slug` column
  2. `20250624000001_backfill_news_articles_slug.sql` — sets `article-1`, `article-2`, … for all rows
  3. (Optional) `20250624000002_force_article_number_slugs.sql` — only if some rows still have old headline slugs
- [ ] **Verify in Supabase**: Table `news_articles` has column `slug` (TEXT, unique when not null). All published articles have values like `article-1`, `article-2`.
- [ ] **RLS**: Confirm policy allows public `SELECT` on `news_articles` where `published = true` (existing behavior).

---

## 2. Public Routes

- [ ] **News listing** (`/news`): Page loads; cards link to `/news/article-1`, `/news/article-2`, etc. (not UUIDs).
- [ ] **Article by slug**: Open `/news/article-1` (replace with your first article’s slug). Article loads; no “Article not found”.
- [ ] **Article by legacy UUID**: Open `/news/<paste-a-real-uuid-from-db>`. Article still loads (backward compatibility).
- [ ] **Invalid slug**: Open `/news/article-99999` or `/news/invalid`. “Article not found” with “Back to News” link; no uncaught error.
- [ ] **Homepage news section**: If you have a “Latest news” block on `/`, links go to `/news/article-N`, not UUID.
- [ ] **Share / copy link**: On an article page, share or copy link; URL is `.../news/article-N` (or legacy UUID if that’s what you opened).

---

## 3. Admin (Create / Update)

- [ ] **Create article**: Add a new article; save. It gets the next slug (e.g. `article-3`). Open `/news/article-3`; article loads.
- [ ] **Update article**: Edit an existing article (title, content, etc.); save. Slug does **not** change (e.g. stays `article-2`). URL still works.
- [ ] **Legacy article (no slug)**: If any row had `slug` null and you edit & save, it receives a slug. Confirm in DB and that the new URL works.

---

## 4. SEO & Discovery

- [ ] **Sitemap**: Open `https://<your-domain>/sitemap.xml`. Entries include `/news`, and one entry per published article (e.g. `/news/article-1`, `/news/article-2`). No 404s when opening those URLs.
- [ ] **Metadata**: On an article page, view page source. `<title>` and meta description reflect the article (or SEO overrides). Layout uses `generateMetadata` with slug/id resolution.
- [ ] **robots.txt**: Still allows `/news` (no change required).

---

## 5. Analytics & Tracking

- [ ] **PageTracker**: Visit `/news/article-1`. Analytics (e.g. `news_article_view`) fire as expected; no console errors from `PageTracker`.
- [ ] **Breadcrumbs / structured data**: If you use JSON-LD or breadcrumbs that reference news, they still point to `/news` or correct article URLs.

---

## 6. Edge Cases

- [ ] **Empty state**: With 0 published articles, `/news` shows empty state; no errors. Sitemap has no news article URLs.
- [ ] **Single article**: One published article has slug `article-1`; listing and direct link work.
- [ ] **Related / latest**: On an article page, “Related articles” and “Latest articles” links use `/news/article-N` and open correctly.

---

## 7. Build & Deploy

- [ ] **Clean build**: `Remove-Item -Recurse -Force .next` (or delete `.next`), then `npm run build`. Build completes with no errors.
- [ ] **Route present**: Build output lists `/news/[slug]` (no `/news/[id]`).
- [ ] **Env**: Production has `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` set; same Supabase project as where migrations were run.

---

## 8. Rollback (if needed)

- Old UUID links continue to work; no code change needed for them.
- If you must revert slugs: (1) stop writing `slug` in admin (code revert), (2) optionally set `slug = NULL` in DB for new rows. Existing `article-N` URLs would 404 until you restore slug values or revert the route to `[id]` and links to use `id` again.

---

## Summary

| Area           | Status |
|----------------|--------|
| Migrations     | ☐      |
| Public routes  | ☐      |
| Admin CRUD     | ☐      |
| SEO / sitemap  | ☐      |
| Analytics      | ☐      |
| Edge cases     | ☐      |
| Build / deploy | ☐      |

**Sign-off**: ___________________ **Date**: ___________

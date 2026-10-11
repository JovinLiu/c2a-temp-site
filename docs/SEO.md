# Search setup for C2A Cabinetry

## Website identity

- Canonical origin: https://www.c2acabinetry.com
- Market: Australia-wide, English (Australia).
- Main service page: /custom-cabinetry
- Search themes: custom cabinetry from China to Australia, kitchen cabinets, wardrobes, whole-home joinery, custom furniture, cabinetry for builders, developers, interior designers and homeowners.
- Edit the canonical origin in lib/seo.js if the primary domain changes. Keep www/non-www redirects consistent with this origin in Vercel.

## Included in the site

Public pages have their own titles, descriptions, canonical URLs and social sharing text. The service page explains the offering, project audiences and enquiry requirements. Homepage and footer links make it discoverable without changing the main navigation. The homepage includes Organization structured data, and the service page includes Service structured data using known business details only.

/sitemap.xml includes public pages and published projects. Draft projects and login/admin URLs are excluded. Published projects get individual metadata and image entries. Login and admin pages use noindex. robots.txt blocks management APIs and admin routes; access control is still enforced by authentication. Vercel non-production environments are marked noindex and disallow crawling.

## After deployment

1. Confirm the primary domain serves the latest deployment and other domain variants redirect to it.
2. Add c2acabinetry.com as a Domain property in Google Search Console and complete the DNS ownership verification using Google's supplied TXT record.
3. Submit https://www.c2acabinetry.com/sitemap.xml in Search Console.
4. Inspect the homepage and /custom-cabinetry with URL Inspection and request indexing.
5. Monitor indexing and actual search queries; refine copy using observed impressions and enquiries rather than keyword-density targets.
6. Publish genuine project case studies: room type, location where appropriate, brief, materials, scope and original photos with descriptive alt text. Do not fabricate reviews, addresses, certifications or completed projects.

## Known deployment dependency

Project content currently uses the local filesystem in lib/server/store.js and app/api/stories/route.js. Do not rely on a Vercel function's local filesystem for persistent project records or uploads. Move those to durable database/object storage before relying on the publishing system to maintain searchable case studies. Static service pages and their metadata do not depend on this migration.

## Scope

No Search Console account or DNS changes have been made. Ranking and indexing are determined by Google; these changes improve crawlability, page meaning and search presentation without guaranteeing a position. A dedicated Chinese-language page with real translated content can be added if Chinese-speaking Australian customers become a priority; do not add hreflang for translations that do not exist.

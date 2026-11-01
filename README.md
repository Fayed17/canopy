# Canopy site
Build: `node build.js` (Node 18+) -> `dist/`. Preview: `npx serve dist`. Deploy `dist/` to Netlify/Cloudflare Pages/GitHub Pages.
Edit `content/site.json` first (phone, WhatsApp, email, domain, formAction = your Formspree/Netlify form URL).
Every page is a markdown file: English text first, then a line `<!--bn-->`, then Bangla. Bangla pages live under /bn/.
- New product: copy a file in content/products/ (category + sub must match slugs in site.json). Photos go in static/images/, then add `image: /images/x.jpg`. Optional: `images: /images/front.jpg, /images/side.jpg` for a product gallery, `draft: true` to keep it unpublished, `old:` price, `tag:` New|Sale|Bestseller
- New category/subcategory: add to "cats" in content/site.json. Set `"draft": true` on a category or subcategory to keep its page unpublished and hide its products.
- Our Works / Blog / Areas (local SEO) / Pages / Testimonials: add .md files in the matching content/ folder (blog needs `date:`)

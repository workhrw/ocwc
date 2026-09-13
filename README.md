# Oklahoma City Woodcarvers Club Website

Production website source for [okcarver.com](https://okcarver.com). The project is a static React, TypeScript, and Vite site designed for Namecheap Stellar Plus shared hosting.

## Services used

- Google Calendar is the authoritative source for meeting and event dates.
- Zeffy handles membership applications, payments, paid class registrations, and Artistry in Wood vendor reservations.
- EmailOctopus handles newsletter subscriptions and email delivery.
- Google Drive hosts public newsletter PDFs and selected historical documents.
- The website does not store payment, membership, attendee, vendor, volunteer, or subscriber records.

## Local development

```bash
npm install
npm run dev
```

Vite will print the local preview address.

## Production build

```bash
npm install
npm run build
```

The finished site is created in `dist/`. Upload **the contents inside `dist/`**, not the `dist` folder itself, to the document root for `okcarver.com` in Namecheap cPanel.

The production build includes a hidden `.htaccess` file. Make sure hidden files are visible when uploading or extracting the build. The file provides HTTPS/canonical-domain redirects and sends direct requests for React routes such as `/classes` and `/membership` to `index.html`.

## Safe content updates

Frequently changed facts and external service links are in:

```text
src/data.ts
```

Update these four blank fields before launch when the public links are ready:

```ts
zeffyMembershipUrl
zeffyVendor2027Url
zeffyVolunteer2027Url
emailOctopusSignupUrl
```

Do not put passwords, private Drive links, API keys, attendee lists, or member information in this repository.

Newsletter issues are stored in the `newsletters` object in `src/data.ts`. Event dates should be changed in Google Calendar rather than manually copied into the website.

## Deployment checklist

1. Back up the current `public_html` folder in cPanel File Manager.
2. Run `npm run build` locally.
3. Confirm `dist/.htaccess`, `dist/index.html`, `dist/robots.txt`, and `dist/sitemap.xml` exist.
4. Upload everything inside `dist/` to the `okcarver.com` document root.
5. Test the home page and direct visits to `/classes`, `/membership`, `/artistry-in-wood`, and a nonexistent path.
6. Test the calendar, Zeffy, EmailOctopus, Google Drive, Facebook, map, and phone links.
7. Confirm `https://www.okcarver.com`, `https://okcarver.org`, and `https://www.okcarver.org` redirect to the matching path on `https://okcarver.com`.

## Rollback

If a production problem appears, restore the backed-up document-root files in cPanel. Source history remains available in GitHub.

Every push to `main` and every pull request also runs a free GitHub Actions production-build check. A green “Build website” check means the TypeScript source compiles and Vite can create the deployable site.

# Placeholder assets

**No images on the site are placeholders anymore.** The earlier Unsplash stock
photos (and the `public/images/placeholders/` folder that held them) have been
replaced with real New Era Academy campus photography and logo files, which now
live directly in `public/images/`.

_Last audited: 2026-09-21._

## Images currently in use

| File | Used on |
| --- | --- |
| `hero-home-banner-children-playing.jpeg` | Home — full-bleed hero |
| `home-mission-toddler-camera.jpeg` | Home — Mission Statement section |
| `hero-service-caregiver-child-coloring.JPG` | Service — full-bleed hero |
| `service-curriculum-blocks.JPG` | Service — Education Curriculum section |
| `service-empowering-art.jpeg` | Service — Empowering Children section |
| `IMG_0156.JPG` | Service — lower section |
| `mainlogo.png` | Logo, site icons, Open Graph metadata, web manifest |

`trustbadges.png` is only referenced from commented-out code in
`src/components/TrustBadges.tsx` (the badges are currently switched off).

## Leftover placeholder wording (not placeholder assets)

These are text leftovers, not stand-in images:

- The `alt` text on the images in `src/app/page.tsx` and `src/app/service/page.tsx`
  still begins "Placeholder photo — …" and ends "Replace with a real New Era
  Academy … photo", and in several places describes a different photo than the
  one now shown. Screen readers will read this out, so it should be rewritten to
  describe the actual images.
- `src/app/page.tsx` has a stale code comment above the home hero ("PLACEHOLDER
  PHOTO (Unsplash, free license) — must be swapped…").

## Unreferenced image files

Nothing in `src/` points at these. Safe to delete once confirmed:

| File | Note |
| --- | --- |
| `hero-service-caregiver-child-coloring.jpeg` | Byte-identical to `home-mission-toddler-camera.jpeg` |
| `hero-service-caregiver-child-coloring2.jpeg` | Unused variant |
| `IMG_0155.JPG` | Byte-identical to `service-curriculum-blocks.JPG` |
| `IMG_0156 copy.JPG` | Byte-identical to `IMG_0156.JPG` |
| `IMG_0158.JPG` | Unused |
| `logo.JPG` | Unused (the site uses `mainlogo.png`) |
| `service-curriculum-blocks.jpg` | Old 900×600 version; the code uses the `.JPG` |
| `service-empowering-art2.jpeg` | Unused variant |

## Not a placeholder, but not finished

- **Email delivery:** until `SMTP_HOST` is set, `src/lib/mailer.ts` runs in stub
  mode and only logs submissions instead of emailing them. See `.env.example`.
- **`CONTACT_FORM_RECIPIENT_EMAIL`** must be set (locally and on Vercel) or the
  contact, tour-request, and career forms return an error.

## Replacing a hero photo

Hero photos are full-bleed and cropped with `object-cover`, so **landscape and at
least 2000px wide** is recommended. The subject should sit in the middle
horizontal band — the top and bottom get cropped at wide viewports — and the
left third should stay visually calm, since the headline and intro are overlaid
there on a dark scrim. (The current heroes are 1200×1600 portrait photos, below
that recommendation.)

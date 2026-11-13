# Security Policy

AZ-400 Study Notes v2 is a static site of hand-built HTML, CSS and JavaScript, published to GitHub Pages. It has no accounts, no sign-in, no forms and no search. The only thing it stores is your light or dark theme choice, kept in your own browser's local storage. Diagrams are drawn by [Mermaid](https://mermaid.js.org/), loaded from the jsDelivr CDN at a pinned version with a Subresource Integrity hash, and analytics are cookieless, through [Umami](https://umami.is/). The attack surface is small, but security reports are still welcome, and I'd rather hear about a problem privately before it's public.

---

## 🛡️ Supported Versions

There are no releases. Only what's live is maintained.

| Version | Supported |
| --- | --- |
| The live site at [marcogrimaldi29.com/az-400-study-notes-v2](https://marcogrimaldi29.com/az-400-study-notes-v2/) and the `main` branch | ✅ |
| Older commits, forks and copies hosted elsewhere | ❌ |

## 📮 Reporting a Vulnerability

**Please don't open a public issue or comment.** Report it privately through GitHub instead: open the repo's **Security** tab and choose **Report a vulnerability**, or go straight to the [private report form](https://github.com/marcogrimaldi29/az-400-study-notes-v2/security/advisories/new). Only you and I can see the report, and we can discuss and fix the problem there before anything is made public.

It helps to include:

- The affected URL, or the file in this repo
- What the problem is and what someone could do with it
- The steps to reproduce it, or a short proof of concept

Please don't include real secrets, credentials or anyone else's personal data in the report. When testing, stick to your own copy of the site or to requests that don't affect other visitors, and don't run denial-of-service or high-volume automated tests against the live site. Please give me a chance to fix the problem before you share any details publicly.

If you can't use GitHub, send me a private message on [LinkedIn](https://www.linkedin.com/in/marco-grimaldi29/) instead, starting it with **"Security: AZ-400 Study Notes v2"** so it's easy to spot.

## 🎯 Scope

**In scope:**

- The published site, including its pages, scripts and assets
- This repository's source code and its GitHub Actions workflow
- A dependency version used here that has a known vulnerability, such as the pinned Mermaid release or one of the actions in the workflow

**Out of scope:**

- **Azure DevOps, GitHub, Azure or any other Microsoft product.** Report Microsoft products to the [Microsoft Security Response Center](https://msrc.microsoft.com/create-report), and GitHub itself through the [GitHub Security Bug Bounty](https://bounty.github.com/).
- **A vulnerability in Mermaid, Umami or another dependency itself.** Report it to that project. If this repo uses an affected version, let me know as well.
- **HTTP response headers set by GitHub Pages.** The repo can't change them.
- **Automated scanner output** with no demonstrated impact on this site.
- **An insecure pattern in the notes**, such as a YAML sample that keeps a secret in a plain pipeline variable, or a service connection that uses a client secret where workload identity federation would be safer. That's a content issue, so it's welcome as a public issue: see the [contributing guide](CONTRIBUTING.md).

## ⏱️ What to Expect

I maintain this repo on my own, so responses are best effort. I'll confirm I've received your report, keep you posted in the private report while I look into it, and let you know when it's fixed. If you'd like to be credited, say so and I'll credit you in the security advisory or the fix.

Dependabot alerts and security updates are turned on for this repo. This site has no package manifest, though: Mermaid loads from a CDN and the workflow's actions are pinned to commit SHAs, and Dependabot doesn't raise alerts for either, so a heads-up about a known vulnerability in one of them is welcome.

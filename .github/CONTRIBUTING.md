# Contributing to AZ-400 Study Notes v2

Thanks for helping keep these notes accurate. They cover **Microsoft Exam AZ-400: Designing and Implementing Microsoft DevOps Solutions**, which spans both Azure DevOps and GitHub. Both platforms ship changes every few weeks, so a feature can be renamed, retired or replaced between one revision of the study guide and the next, the way classic release gates gave way to environment checks. Reports from people studying with the notes are the best way for me to catch that.

> [!IMPORTANT]
> **This repo takes issues, not pull requests.** Pull requests are turned off: I write every change myself and check it against the official documentation, so the notes keep one voice and stay consistent from page to page. If you know exactly how something should read, put your proposed wording in the issue. It's just as useful.

---

## Contents

- [Ways to Help](#-ways-to-help)
- [Before You Open an Issue](#-before-you-open-an-issue)
- [Opening an Issue](#-opening-an-issue)
- [Out of Scope](#-out-of-scope)
- [What Happens Next](#-what-happens-next)
- [Code of Conduct](#-code-of-conduct)
- [Security](#-security)

## 🙌 Ways to Help

Every report fits one of the four types in the issue template:

| Type | What it covers | For example |
| --- | --- | --- |
| 🐞 **Site bug** | Something doesn't work, such as a link, a diagram, the navigation menu or the theme toggle | A Mermaid diagram doesn't redraw after switching to dark mode, the Domain 3 dropdown won't open, or a link returns 404 |
| ✏️ **Content issue** | Something in the notes is wrong, unclear or missing | A YAML sample uses a keyword Azure Pipelines doesn't accept, a side-by-side comparison pairs an Azure Pipelines feature with the wrong GitHub Actions one, or a rapid-recap table contradicts the text above it |
| 🕰️ **Outdated content** | A product, a feature or the exam itself has changed since the page was written | A feature has been renamed or retired, the study guide shows a later "Skills measured as of" date than July 27, 2026, or a domain's exam weighting has changed |
| 📱 **Device issue** | The problem only appears on a certain device, browser or screen size, or in print | A side-by-side YAML comparison overflows on a phone in portrait, the Domain 3 dropdown won't close on a tablet, or a diagram is cut off when you print a page |

## 🔎 Before You Open an Issue

- **Search the existing issues**, [open and closed](https://github.com/marcogrimaldi29/az-400-study-notes-v2/issues?q=is%3Aissue). If yours is already there, add a 👍 reaction or a comment with anything new instead of opening a duplicate.
- **Check the date.** The notes are written against the **skills measured as of July 27, 2026**. If the "Skills measured as of" heading in the [AZ-400 study guide](https://learn.microsoft.com/en-us/credentials/certifications/resources/study-guides/az-400) shows a later date, say so in the issue. The guide's **Change log** section lists what moved, and the date tells me which revision to compare against.
- **Check the current docs.** A quick look at the [Azure DevOps documentation](https://learn.microsoft.com/en-us/azure/devops/) or [GitHub Docs](https://docs.github.com/en) usually confirms whether something has changed, and gives you the link the issue asks for. For recent changes, the list of [Azure DevOps released features](https://learn.microsoft.com/en-us/azure/devops/release-notes/features-timeline-released) and the [GitHub Changelog](https://github.blog/changelog/) are the quickest places to look.
- **One problem per issue.** Separate issues are easier to track, fix and close. Several typos on the same page can share one issue.
- **For a site bug, hard-refresh first** (Ctrl+F5, or Cmd+Shift+R on a Mac) in case your browser is showing an older copy of the page.

## 📝 Opening an Issue

1. Open a new issue with the [🐞 Report a problem](https://github.com/marcogrimaldi29/az-400-study-notes-v2/issues/new?template=ISSUE_TEMPLATE.md) template.
2. Give it a title that names the page and the problem, for example *"3.4 Deployments: blue-green section swaps the staging and production slots"* rather than *"Mistake on page"*.
3. Tick the type of report, fill in the sections that apply and delete the rest.

> [!TIP]
> To link straight to a section on a wide screen, click it in **On this page**, then copy the address from your browser. It ends in the section's anchor, such as `/domain-3-pipelines/deployments/#blue-green`. On a smaller screen, where that list is hidden, give the section's heading instead.

### What Makes a Report Easy to Fix

- **A link to the exact section**, not just the page
- **The text as the notes have it**, quoted, so I can find it even if the page has changed since
- **An official source** for any content change: Microsoft Learn for Azure DevOps and Azure, GitHub Docs for GitHub. A report without one may take longer, because every change is checked against the documentation before it goes in
- **For site bugs and device issues:** the steps to reproduce it, what you expected and what happened instead, your device, operating system, browser, theme and view (portrait, landscape or print), and a screenshot if it shows the problem
- **Your proposed wording**, if you have it. With pull requests turned off, this is the closest thing to suggesting an edit directly. I may adapt it to fit the page

## 🚫 Out of Scope

To keep the notes accurate and the issue tracker useful, please don't open issues for:

- **Live exam content.** Questions, answers or topics remembered from a real exam break [Microsoft's exam security policy](https://learn.microsoft.com/en-us/credentials/support/exam-and-assessment-lab-security-policies) and the agreement you accept before the exam. Issues or comments that include them will be closed and the content removed.
- **Exam booking, scores or retakes.** [Microsoft Credentials support](https://learn.microsoft.com/en-us/credentials/support/help) can help with those.
- **Help with your own Azure DevOps organization, GitHub repos or Azure subscription.** For a pipeline that won't run, an agent that won't connect or a permissions problem, ask on the [Azure DevOps Developer Community](https://developercommunity.visualstudio.com/AzureDevOps), [GitHub Community discussions](https://github.com/orgs/community/discussions) or [Microsoft Q&A](https://learn.microsoft.com/en-us/answers/), or open a support request with Microsoft or GitHub.
- **Anything private.** Issues are public, so leave out personal access tokens, secrets from pipeline logs, service connection details, organization URLs, subscription and tenant IDs, and customer details, including in screenshots.
- **Unofficial sources.** Exam dumps, third-party practice tests and AI chat answers aren't accepted as the source for a content change.
- **Promotion.** Links to courses, products or services, affiliate links and paid placements won't be added.
- **Security vulnerabilities.** Please [report these privately](https://github.com/marcogrimaldi29/az-400-study-notes-v2/security/advisories/new), as described in the [security policy](SECURITY.md), not in a public issue.

## 🔄 What Happens Next

- I maintain the notes on my own, in my spare time, so replies are best effort and there's no fixed response time.
- I check each report against the official documentation. If I need more detail, I'll ask on the issue, so keep an eye on your GitHub notifications.
- When a fix goes in, I close the issue with a note on what changed or a link to the commit. The live site updates shortly after.
- If nothing changes, I close the issue with the reason, such as out of scope, can't be verified, or working as intended.
- An issue waiting on a reply may be closed after a while. Comment with the missing details and I can reopen it.

## 🤝 Code of Conduct

By opening, commenting on or reacting to issues here, you agree to follow the [Code of Conduct](CODE_OF_CONDUCT.md). Comments that are abusive, spam or share live exam content may be hidden, edited or locked.

## 🔒 Security

Found a security problem with the site or this repo? Please don't report it in a public issue. Use [Report a vulnerability](https://github.com/marcogrimaldi29/az-400-study-notes-v2/security/advisories/new) instead, so only you and I can see it. The [security policy](SECURITY.md) has the details.

---

If the notes helped you, the README's [💚 Support](https://github.com/marcogrimaldi29/az-400-study-notes-v2#-support) section has a couple of ways to show it. Thanks for helping make them better for the next AZ-400 candidate.

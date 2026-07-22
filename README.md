# AZ-400 Study Notes v2 — Designing and Implementing Microsoft DevOps Solutions

[![Built with HTML/CSS/JS](https://img.shields.io/badge/Built%20with-HTML%20%C2%B7%20CSS%20%C2%B7%20JS-0078d4)](#)
[![Exam](https://img.shields.io/badge/Exam-AZ--400-d83b01)](https://learn.microsoft.com/en-us/credentials/certifications/resources/study-guides/az-400)
[![Live site](https://img.shields.io/badge/Read%20online-marcogrimaldi29.com-107c10)](https://marcogrimaldi29.com/az-400-study-notes-v2/)

Comprehensive, exam-focused study notes for the **Microsoft AZ-400: Designing and Implementing Microsoft DevOps Solutions** certification — a free, modern study companion to the official Microsoft documentation.

This is **version 2**: a full rebuild of the original AZ-400 notes, migrated off Jekyll to a hand-built **HTML · CSS · JavaScript** static site that shares the design language of the [MS-102 study notes](https://marcogrimaldi29.com/ms-102-study-notes/). Content has been re-grounded and refreshed against the **skills measured effective July 27, 2026**.

### 👉 [Read the notes online](https://marcogrimaldi29.com/az-400-study-notes-v2/)

> ⭐ **If these notes help you, please [star the repo](https://github.com/marcogrimaldi29)** — it supports the project and helps other learners find it.

---

## ⚠️ Disclaimer

These notes are an **independent study aid created for learning and study purposes only**. They are **not affiliated with, authorised, or endorsed by Microsoft**.

Microsoft frequently renames, re-scopes, and re-licenses its products (e.g. *Azure AD → Microsoft Entra ID*, *Guest Configuration → Azure Machine Configuration*, *classic release gates → environment checks*). Content can become outdated quickly.

**👉 Always verify every detail against the official Microsoft documentation before relying on it** — especially tooling names, feature availability, and exam scope.

---

## 📚 What's inside

Aligned to the official **AZ-400 "Skills Measured"** (effective **July 27, 2026**) and the **AZ-400T00** course.

| Domain | Exam weight |
|---|---|
| [1 · Design and implement processes and communications](https://marcogrimaldi29.com/az-400-study-notes-v2/domain-1-processes/) | 10–15% |
| [2 · Design and implement a source control strategy](https://marcogrimaldi29.com/az-400-study-notes-v2/domain-2-source-control/) | 10–15% |
| [3 · Design and implement build and release pipelines](https://marcogrimaldi29.com/az-400-study-notes-v2/domain-3-pipelines/) | **50–55%** |
| [4 · Develop a security and compliance plan](https://marcogrimaldi29.com/az-400-study-notes-v2/domain-4-security/) | 10–15% |
| [5 · Implement an instrumentation strategy](https://marcogrimaldi29.com/az-400-study-notes-v2/domain-5-instrumentation/) | 5–10% |
| [Exam tips & high-yield caveats](https://marcogrimaldi29.com/az-400-study-notes-v2/exam-tips/) | — |
| [Resources & study plan](https://marcogrimaldi29.com/az-400-study-notes-v2/resources/) | — |

Domain 3 (over half the exam) is split into six sub-pages: **package management, testing strategy, pipelines, deployments, infrastructure as code,** and **maintaining pipelines**.

### Features

- 📊 **Progress bars** for each domain's exam weighting
- 🧜 **Mermaid diagrams** for workflows, deployment strategies and architectures
- 🔀 **Side-by-side YAML** comparisons of Azure Pipelines vs GitHub Actions
- 🎯 **Exam-caveat callouts** and per-page rapid-recap decision tables
- 🧭 Per-page table of contents with scroll tracking, plus a nested nav dropdown for Domain 3
- 🌗 **Light / dark theme** (Microsoft/Azure-inspired styling, respects your OS preference)
- 📱 Fully responsive, with a print-friendly layout

### Privacy

The site uses **[Umami](https://umami.is/)** for **cookieless, privacy-respecting analytics** — no cookies, no personal data, and no cookie-consent banner.

---

## 🛠️ Running locally

It is a fully static site — no build step. Serve the folder with any static server:

```bash
npx serve -l 4318 .
# then open http://localhost:4318/
```

## 🚀 Deployment

Deployed to **GitHub Pages** via the workflow in `.github/workflows/deploy-pages.yml`, which injects the `UMAMI_WEBSITE_ID` repository secret at build time so the analytics ID is never committed to source.

---

## 🤝 Contributing

Spotted an error, an outdated detail, or have an improvement? **Contributions are welcome** — open an [issue](https://github.com/marcogrimaldi29) or a pull request. Corrections that keep the notes accurate against the latest Microsoft documentation are especially appreciated.

---

## 👤 Author

**Marco Grimaldi** — Cloud Solution Architect.

- 🌐 Website / certification hub: **[marcogrimaldi29.com](https://marcogrimaldi29.com/)**
- ⌨️ GitHub: **[github.com/marcogrimaldi29](https://github.com/marcogrimaldi29)**
- 💼 LinkedIn: **[linkedin.com/in/marco-grimaldi29](https://www.linkedin.com/in/marco-grimaldi29/)**

Part of a wider collection of certification reviews and study notes on my personal hub.

---

## 🔗 Official resources

- [AZ-400 Study Guide (Skills Measured)](https://learn.microsoft.com/en-us/credentials/certifications/resources/study-guides/az-400)
- [Course AZ-400T00: Designing and Implementing Microsoft DevOps Solutions](https://learn.microsoft.com/en-us/training/courses/az-400t00)
- [Free official practice assessment](https://learn.microsoft.com/en-us/credentials/certifications/exams/az-400/practice/assessment)
- [Azure DevOps documentation](https://learn.microsoft.com/en-us/azure/devops/)
- [GitHub Actions documentation](https://docs.github.com/en/actions)

---

_For study & learning purposes only. Always verify against the official Microsoft documentation._

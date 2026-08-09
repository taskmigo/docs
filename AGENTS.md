# AGENTS.md

Repository-wide instructions for AI agents working on the Taskmigo documentation site.

## Source of truth

- Use the content on the current branch under `content/versions/v0/` as the product contract. The deployed site and generated `llms.txt` routes may lag behind unpublished changes.
- Read the pages relevant to the task. For cross-cutting changes, also review `resources.mdx`, `runtime.mdx`, `architecture.mdx`, `status.mdx`, `faq.mdx`, and the affected files under `manifests/`.
- Do not invent behavior, infer current behavior from planned work, or present an RFC as supported behavior. Ask for clarification when the contract is ambiguous or contradictory.
- Keep product-specific rules in the documentation, not in this file, so there is only one maintained source of truth.

## Authoring

- Write public documentation in English for Taskmigo users. Avoid implementation details unless they are part of the public contract.
- Write for product users completing a task and developers implementing or integrating the contract. Structure the reading path as outcome, smallest useful example, contract, failure states, and next step.
- The version context is already established by the page location. Avoid redundant prose such as “in v0”; preserve required identifiers and routes such as `v0/site` and `/versions/v0/...`.
- Distinguish current behavior, limitations, known issues, planned work, open decisions, and RFCs explicitly.
- Follow existing Fumadocs and MDX patterns. Prefer suitable `fumadocs-ui` components over raw HTML.
- Prefer concrete outcomes and examples over abstract descriptions. Define unavoidable terms on first use and do not assume that product users know React, graph, database, or runtime terminology.
- Keep each rule in one canonical location and link to it elsewhere. Remove filler, repeated rules, and general knowledge that does not help readers use or implement Taskmigo.
- Use Mermaid instead of ASCII diagrams. Keep diagrams small, label edges and outcomes clearly, and explain the practical takeaway in nearby prose. Do not repeat a table or simple prose as a diagram.
- Use emoji only as a compact, accessible scanning aid in a legend, status, or small matrix. Pair each emoji with a text label or legend; never rely on color or emoji alone to communicate a rule.

## MDX and content components

Use components only when they improve navigation, comparison, sequence, or emphasis. Keep required contract information in the primary reading path.

- **Accordion and Accordions:** FAQs, optional details, or long secondary explanations.
- **Banner:** Reserve for a high-priority, site-wide announcement configured at the page or layout level. Use a Callout for an important note inside an article.
- **Code blocks:** Use fenced Markdown code blocks for static code, commands, configuration, and manifests. Add a language such as `yaml`, `bash`, or `tsx`. Use the dynamic code-block component only when the rendered example must change at runtime.
- **Files, Folder, and File:** Directory layouts or multi-file architecture; use a list for a short flat set of files.
- **GitHub Info:** Live repository information that materially helps a repository or installation page; otherwise use a source link.
- **Image Zoom:** Use for screenshots, diagrams, or mockups whose details are difficult to inspect at inline size. Always provide meaningful alternative text.
- **Inline TOC:** Long overview or index pages with many peer sections.
- **Steps:** Procedures and lifecycle sequences where order is meaningful.
- **Tabs:** Equivalent alternatives such as package managers or platforms; never split one sequential procedure across tabs.
- **Type Table:** Use for every section titled `Fields` and for UI component prop or field references. Keep validation rules in prose when the table would be ambiguous. `type` describes only the field's data type. Write each `description` to explain the field's purpose, behavior, relationship, or constraint; do not repeat its name or type. If a field supports Expression, keep its actual data type and begin that field's `description` with the `<ExpressionSupport />` tag; never use `Expression`, `Expression<T>`, or a union with `Expression` as a type.
- **Cards:** Landing-page navigation or a small set of useful next steps.
- **Callouts:** Notes, tips, warnings, and safety-critical constraints; keep the primary contract in normal prose.

Before adding a visual component, ask what question it answers:

| Reader question                          | Preferred format |
| ---------------------------------------- | ---------------- |
| “What values map to what outcomes?”      | Table            |
| “What do I do first, next, and last?”    | Steps            |
| “How do these resources relate?”         | Mermaid          |
| “Which equivalent option applies to me?” | Tabs             |
| “Where should I go next?”                | Cards            |
| “What must I not miss?”                  | Callout          |

`Auto Type Table` and `Graph View` are not available in the repository's current `fumadocs-ui` version. Do not use or document them as available components unless the dependency and site integration are added first. Import non-global components from their existing `fumadocs-ui/components/*` entry points and follow examples already present in this repository. Components provided by the default MDX mapping, such as `Callout`, `Card`, and `Cards`, do not need local imports.

## Change checklist

- For a user-facing contract change, update every affected canonical page, example, cross-link, and FAQ entry.
- Record limitations, known issues, RFCs, and unresolved decisions in `content/versions/v0/status.mdx`.
- Verify edited internal routes and fragments, changed external links, and inbound references to renamed headings or IDs.
- Update the nearest `meta.json` when adding, removing, or reordering pages.
- Do not hand-edit generated output. Preserve unrelated changes and keep the diff scoped to the request.

## Verification and publishing workflow

Before installing dependencies or running verification in a new environment,
read [`TROUBLESHOOTING.md`](TROUBLESHOOTING.md). Apply any matching environment
workaround first so known setup failures do not interrupt or invalidate the
verification run.

Complete this sequence from the repository root before publishing:

1. Run every verification gate in this exact order:

```bash
npm run lint:check
npm run format:check
npm run types:check
npm run build
```

2. Fix every failure and restart at `npm run lint:check` after any change. `npm run lint:fix` can fix some lint issues, but review its changes and manually fix diagnostics that remain. Use `npm run format:fix` for formatting failures; fix type-check and build failures manually.
3. Commit only after all four gates pass.
4. Push the verified commit to GitHub.

Keep commit history concise. By default, make at most one commit and one push per completed round of work. Finish the requested changes and verification before committing; do not create incremental commits for individual files, formatting fixes, or failed verification attempts. Create multiple commits only when the user explicitly requests them or when independently reviewable changes must remain separate, and explain the split before committing.

If a required check cannot run or cannot pass, stop before commit and push, then report the blocker accurately instead of claiming the check passed.

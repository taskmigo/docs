# AGENTS.md

Repository-wide instructions for AI agents working on the Taskmigo documentation site.

## Source of truth

- Use the content on the current branch under `content/versions/v0/` as the product contract. The deployed site and generated `llms.txt` routes may lag behind unpublished changes.
- Read the pages relevant to the task. For cross-cutting changes, also review `resources.mdx`, `runtime.mdx`, `architecture.mdx`, `status.mdx`, `faq.mdx`, and the affected files under `manifests/`.
- Do not invent behavior, infer current behavior from planned work, or present an RFC as supported behavior. Ask for clarification when the contract is ambiguous or contradictory.
- Keep product-specific rules in the documentation, not in this file, so there is only one maintained source of truth.

## Authoring

- Write public documentation in English for Taskmigo users. Avoid implementation details unless they are part of the public contract.
- Write for two audiences: product users who need to complete a task and developers who need to implement or integrate the contract. Lead with the user-visible outcome, then provide the precise technical rules needed to achieve it.
- Be concise and task-oriented. Prefer one canonical explanation with links over repeated content.
- The version context is already established by the page location. Avoid redundant prose such as “in v0”; preserve required identifiers and routes such as `v0/site` and `/versions/v0/...`.
- Distinguish current behavior, limitations, known issues, planned work, open decisions, and RFCs explicitly.
- Follow existing Fumadocs and MDX patterns. Prefer suitable `fumadocs-ui` components over raw HTML.
- Design the reading path as a UX flow: orient the reader, show the smallest useful example, explain the contract, surface failure states, then link to the next relevant task.
- Prefer concrete outcomes and examples over abstract descriptions. Define unavoidable terms on first use and do not assume that product users know React, graph, database, or runtime terminology.
- Remove repeated common knowledge, duplicated rules, and filler. Keep one canonical explanation and link to it from other pages.
- Use visual structure when it reduces cognitive load: tables for exact mappings, Steps for ordered procedures, Tabs for equivalent alternatives or outcomes, Cards for navigation, and Mermaid for non-trivial relationships or state transitions.
- Use Mermaid instead of ASCII diagrams. Keep diagrams small, label edges and outcomes clearly, and explain the practical takeaway in nearby prose. Do not repeat a table or simple prose as a diagram.
- Use emoji only as a compact, accessible scanning aid in a legend, status, or small matrix. Pair each emoji with a text label or legend; never rely on color or emoji alone to communicate a rule.

## MDX and content components

Use components to improve navigation, comparison, sequence, or emphasis. Do not add a component only for decoration, and do not hide information required to understand the primary reading path.

- **Accordion and Accordions:** Use for FAQs, optional details, or long secondary explanations. Do not place required contract rules only inside a collapsed item.
- **Banner:** Reserve for a high-priority, site-wide announcement configured at the page or layout level. Use a Callout for an important note inside an article.
- **Code blocks:** Use fenced Markdown code blocks for static code, commands, configuration, and manifests. Add a language such as `yaml`, `bash`, or `tsx`. Use the dynamic code-block component only when the rendered example must change at runtime.
- **Files, Folder, and File:** Use a file tree for directory layouts or multi-file architecture. Do not represent a short flat list as a file tree.
- **GitHub Info:** Use only when live repository stars or forks materially help a repository or installation page. Use an ordinary source link when live statistics are unnecessary.
- **Image Zoom:** Use for screenshots, diagrams, or mockups whose details are difficult to inspect at inline size. Always provide meaningful alternative text.
- **Inline TOC:** Use on long overview or index pages with many peer sections. Avoid duplicating a short page's normal table of contents.
- **Steps:** Use for procedures and lifecycle sequences where order is meaningful. Use headings or a list when items are not sequential.
- **Tabs:** Use for equivalent alternatives, such as package managers or platforms, or for comparing closely related outcomes in the same context. Do not split a single sequential procedure across tabs.
- **Type Table:** Use for compact, manually maintained field, prop, or option references. Keep normative validation rules in surrounding prose when a table alone would be ambiguous.
- **Cards:** Use on landing pages or for a small set of clear next steps. Each card must lead to a useful destination; do not use cards as decorative containers.
- **Callouts:** Use sparingly for notes, tips, warnings, and safety-critical constraints. Keep the primary contract in normal prose and choose the callout type that matches its severity.

Before adding a visual component, ask what question it answers:

| Reader question                          | Preferred format |
| ---------------------------------------- | ---------------- |
| “What values map to what outcomes?”      | Table            |
| “What do I do first, next, and last?”    | Steps            |
| “How do these resources relate?”         | Mermaid          |
| “Which equivalent option applies to me?” | Tabs             |
| “Where should I go next?”                | Cards            |
| “What must I not miss?”                  | Callout          |

If plain prose answers the question more clearly, use plain prose.

`Auto Type Table` and `Graph View` are not available in the repository's current `fumadocs-ui` version. Do not use or document them as available components unless the dependency and site integration are added first. Import non-global components from their existing `fumadocs-ui/components/*` entry points and follow examples already present in this repository. Components provided by the default MDX mapping, such as `Callout`, `Card`, and `Cards`, do not need local imports.

## Change checklist

- For a user-facing contract change, update every affected canonical page, example, cross-link, and FAQ entry.
- Record limitations, known issues, RFCs, and unresolved decisions in `content/versions/v0/status.mdx`.
- Verify edited internal routes and fragments, changed external links, and inbound references to renamed headings or IDs.
- Update the nearest `meta.json` when adding, removing, or reordering pages.
- Do not hand-edit generated output. Preserve unrelated changes and keep the diff scoped to the request.

## Verification and publishing workflow

Before creating any commit or pushing to GitHub, run these required checks from the repository root in this exact order:

```bash
npm run lint:check
npm run format:check
npm run build
```

If any check fails, fix every failure and restart the sequence from `npm run lint:check`. Do not commit or push until all three checks pass successfully.

The required sequence is:

1. Run `npm run lint:check`, `npm run format:check`, then `npm run build`.
2. Fix any failures and rerun the complete sequence until it passes.
3. Commit the complete verified change.
4. Push the commit to GitHub.

Keep commit history concise. By default, make at most one commit and one push per completed round of work. Finish the requested changes and verification before committing; do not create incremental commits for individual files, formatting fixes, or failed verification attempts. Create multiple commits only when the user explicitly requests them or when independently reviewable changes must remain separate, and explain the split before committing.

If a required check cannot run or cannot pass, stop before commit and push, then report the blocker accurately instead of claiming the check passed.

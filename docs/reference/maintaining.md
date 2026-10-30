---
title: Maintaining
---

# Maintaining

## Regenerate the index

`seeds.toml` lists the sources (an entry needs only its `source`); `fobis index build` reads each source (a shallow
clone of its newest version) and fills the description, licence and provided modules:

```bash
fobis index build seeds.toml -o index.toml --force
```

Rebuilding needs FoBiS.py 3.14.0 or newer: older versions write package names holding a dot (`odbc.f`) in a form
they cannot read back, miss the modules of fypp sources (stdlib), and do not fill `builds`.

Fields written by hand in the seeds win over what the sources say. A source that cannot be read keeps its seed entry
as written, with a warning.

To list a family of projects at once, `--from-ecosystem` adds the projects of a FoBiS ecosystem registry (public
HTTPS URLs, read without credentials: private repositories are left out):

```bash
fobis index build seeds.toml --from-ecosystem -o index.toml --force
```

## Checks

The `check` workflow runs on every push and pull request, and every Monday:

| Step | Blocking | What it checks |
|---|---|---|
| Schema and names | yes | `fobis index check index.toml` |
| Sources (report) | no | `fobis index check index.toml --online`: every source readable, with a semantic-version tag |

Packages without a version tag are reported, not refused: `fobis add` takes them unpinned.

## Documentation

This site is built by the `docs` workflow on every push to `main`. The [packages](/packages/) and
[modules](/packages/modules) pages and the package-count badge are generated from `index.toml` at each build
(`docs/scripts/gen_catalog.py`), so they always match the index.

Locally:

```bash
cd docs
npm install
npm run docs:dev
```

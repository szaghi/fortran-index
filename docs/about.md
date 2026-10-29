---
title: About
---

# About fortran-index

fortran-index is a package index for [FoBiS.py](https://github.com/szaghi/FoBiS): a single file, `index.toml`, that
lists Fortran projects by their source URL. Every listed project builds with FoBiS (it has a `fobos`) or with
[fpm](https://fpm.fortran-lang.org) (it has an `fpm.toml`).

An index answers one question: *where is the package called X?* It is the starting point of `fobis search`,
`fobis info`, `fobis add` and `fobis pkg install`, and nothing else.

## Discovery, nothing more

There is no central server behind it, and it holds no power over the projects that use it:

| A registry could... | fortran-index |
|---|---|
| refuse to publish a package | anyone can publish another index; FoBiS reads several side by side |
| break builds when it is down or changes | `fobis add` writes the source URL into the project's fobos: builds never read an index |
| decide what a name means | a name is resolved once, when added; a name found in two indexes is refused, with the `INDEX:NAME` choices |
| help you find packages | yes: this is its only job |

## No versions in the index

An entry holds a source URL, a description, a licence and the modules the package provides. It holds no versions,
dependencies or hashes: the versions are the source's semantic-version tags, so tagging a release is publishing it,
and the index cannot contradict the package. The lock file of each project records the content it fetched (git tree
hashes, archive checksums), so a moved tag is noticed.

## What is listed

Public repositories with a `fobos` or an `fpm.toml` at their root, that are not forks or archived. The
[catalogue](/packages/) shows every package and the [modules](/packages/modules) their libraries provide. Anyone can
propose a package: see [Publish your own package](./tutorial/04-publish).

## Authors

- Stefano Zaghi — [@szaghi](https://github.com/szaghi)

Each listed package belongs to its authors. Contributions are welcome — see the [Contributing](./reference/contributing) page.

## Copyrights

The index and its documentation are released under [CC0-1.0](https://creativecommons.org/publicdomain/zero/1.0/).
Each package keeps its own licence.

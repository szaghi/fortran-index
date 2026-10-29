---
title: Contributing
---

# Contributing

Contributions are welcome.

## Propose a package

Open a pull request adding the entry to `index.toml` and its source to `seeds.toml` (see
[Publish your own package](../tutorial/04-publish) and the [cookbook](../cookbook#add-your-package)). The check workflow validates the schema; a maintainer merges.

## Report a problem with an entry

Open an [issue](https://github.com/szaghi/fortran-index/issues) for a wrong description, licence or module list, a
moved repository, or a package whose author wants it delisted.

## Improve FoBiS itself

The commands that read this index (`fobis index`, `search`, `info`, `add`, `pkg`) live in
[FoBiS.py](https://github.com/szaghi/FoBiS): issues and pull requests there.

## Publish your own index

You do not need permission to list packages: an index is a file anyone can publish (a git repository, a static file,
a directory). Follow this one from yours with `follows`, or fork it. Its content is CC0-1.0.

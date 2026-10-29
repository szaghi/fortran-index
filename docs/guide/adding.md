---
title: Adding a package
---

# Adding a package

Any public Fortran project that builds with FoBiS or fpm can be listed. Adding it is a pull request.

## What a package needs

- a public source: a git repository on any host, or a directory serving release archives (`fortran-releases.toml`,
  written by `fobis publish --archive`);
- a `fobos` or an `fpm.toml` at its root (a CMake or make project needs a recipe: see below);
- semantic-version tags (`v1.2.0` or `1.2.0`) are strongly recommended: without them `fobis add` cannot pin a version.

## Write the entry

`source` is the only required key:

```toml
[package.mylib]
source      = "https://github.com/you/mylib"
description = "What it does, in one line"
license     = "MIT"
keywords    = ["linear-algebra", "sparse"]
provides    = ["mylib", "mylib_kinds"]
```

Or let FoBiS write it from your working copy (description, licence and modules read from the sources):

```bash
git clone https://github.com/szaghi/fortran-index
cd ../mylib
fobis publish --index ../fortran-index/index.toml --source https://github.com/you/mylib
```

Then add the source to `seeds.toml` too (so the index can be regenerated) and open a pull request.

## Names

The entry's name (`[package.NAME]`) is what users type in `fobis add NAME`: letters, digits, `.`, `_` and `-`. Keep
the repository's name unless it is already taken in the index; a name is never reused for another source.

## What `provides` lists

The modules the package's **library** defines: for an fpm package the `[library] source-dir` (`src/` by default), for
a FoBiS package the sources without tests, examples and vendored copies. `fobis index build` and `fobis publish`
compute it; edit it by hand when they guess wrong (a hand-written list is kept when the index is rebuilt).

## CMake and make projects

A project without a `fobos` or an `fpm.toml` can still be listed with a recipe telling FoBiS how to build it:

```toml
[package.somelib]
source = "https://github.com/someone/somelib"
recipe = "recipes/somelib.toml"
```

```toml
# recipes/somelib.toml
schema     = 1
backend    = "cmake"
cmake-args = ["-DBUILD_TESTING=OFF"]
```

`fobis add` copies the recipe into the project, so builds never depend on the index.

## Removing a package

Open a pull request removing the entry, or an issue if you are the author and want it delisted. Projects that already
use it are not affected: their fobos names the source, not the index.

---
title: The index format
---

# The index format

`index.toml` follows schema 1 of FoBiS.py's package indexes. FoBiS refuses an index with an unknown key: a typo is an
error, not a silently ignored field.

```toml
schema      = 1
name        = "szaghi"
description = "Fortran packages built with FoBiS or fpm"
follows     = ["https://example.org/fortran/index.toml"]

[package.json-fortran]
source      = "https://github.com/jacobwilliams/json-fortran"
description = "A Modern Fortran JSON API"
license     = "BSD"
keywords    = ["json", "io"]
mirrors     = ["https://gitlab.com/someone/json-fortran"]
provides    = ["json_module", "json_kinds"]
recipe      = "recipes/json-fortran.toml"
```

## Top-level keys

| Key | Required | Meaning |
|---|---|---|
| `schema` | no (1) | the format version; FoBiS refuses a newer one |
| `name` | no | the index's name, used to qualify its packages when another index follows it |
| `description` | no | one line |
| `follows` | no | other indexes searched after this one (any URL an index can have) |

## Package keys

| Key | Required | Meaning |
|---|---|---|
| `source` | **yes** | the package's identity: a git URL, or a URL serving `fortran-releases.toml` |
| `description` | no | one line, shown by `fobis search` |
| `license` | no | as the package declares it (SPDX when possible) |
| `keywords` | no | matched by `fobis search` |
| `mirrors` | no | other URLs of the same content: `fobis add` copies them into a fobos as `:: mirror=URL[,URL]` |
| `provides` | no | the modules the package's library defines (`fobis search --module`) |
| `builds` | no | the build systems of the newest version: `fobis`, `fpm`, `cmake`, `make` (`fobis search --build fpm`) |
| `recipe` | no | a recipe file, relative to the index, for a package without fobos or fpm.toml |

## What is not there

No versions, dependencies or hashes. The versions are the source's tags (read by `fobis info` and `fobis add`), the
dependencies are declared by each package's own fobos or fpm.toml, and the content hashes are recorded by each
project's lock file. An entry with `version = ...` is refused.

## Validate it

```bash
fobis index check index.toml            # schema and names
fobis index check index.toml --online   # every source readable and tagged
```

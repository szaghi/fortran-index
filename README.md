# fortran-index

A package index for [FoBiS.py](https://github.com/szaghi/FoBiS): Fortran projects built with FoBiS or
[fpm](https://fpm.fortran-lang.org), listed by their source URL.

It starts with the projects of [szaghi](https://github.com/szaghi), [urbanjost](https://github.com/urbanjost) and
[jacobwilliams](https://github.com/jacobwilliams) (and those they collaborate on) that have a `fobos` or an `fpm.toml`
at their root.

## Use it

```bash
fobis index add szaghi https://github.com/szaghi/fortran-index
fobis search json
fobis search --module m_cli2
fobis info json-fortran
fobis add json-fortran          # in a project: writes the source URL into the fobos
fobis pkg install M_strings     # built with your compiler, installed with a pkg-config file
```

Requires FoBiS.py 3.11 or newer. The index is released under CC0-1.0: copy it, fork it, merge it into yours. This index is one of many: FoBiS reads several side by side, and anyone can publish
one. See [Packages and indexes](https://szaghi.github.io/FoBiS/cookbook/packages).

## What an entry holds

```toml
[package.json-fortran]
source      = "https://github.com/jacobwilliams/json-fortran"
description = "A Modern Fortran JSON API"
license     = "..."
provides    = ["json_module", "..."]
```

No versions, dependencies or hashes: the versions are the source's tags, and `fobis add` writes the source URL into
the project, so a build never reads this index. `provides` lists the modules the package's library defines (for an
fpm package, its `[library] source-dir`); a package that bundles another package's sources defines those modules
too.

## Add a package

Open a pull request adding an entry (`source` is the only required key), or generate it from your project:

```bash
fobis publish --index index.toml --source https://github.com/you/project
```

The check workflow validates the schema on every push and pull request, and reports weekly which sources cannot be
read or have no semantic-version tag (`fobis index check index.toml --online`). A source without a version tag can
still be added, unpinned.

## Regenerate

```bash
fobis index build seeds.toml -o index.toml
```

`seeds.toml` lists the sources; `index build` fills the descriptions, licences and modules from each one, keeping the
fields written by hand.

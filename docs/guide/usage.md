---
title: Using the index
---

# Using the index

Everything below needs FoBiS.py 3.11 or newer:

```bash
pip install --upgrade FoBiS.py
```

## Register the index

```bash
fobis index add szaghi https://github.com/szaghi/fortran-index
fobis index list
```

`szaghi` is the name you give it: it qualifies package names (`szaghi:PENF`). The index is cloned into
`~/.fobis/indexes/szaghi` and read from there; `fobis index update` fetches it again.

A project can name its indexes in its fobos (searched before the user's):

```ini
[indexes]
szaghi = https://github.com/szaghi/fortran-index
```

## Find a package

```bash
fobis search json                 # names, descriptions, keywords
fobis search --module m_cli2      # who provides a module
fobis info json-fortran           # versions, build system, modules, licence (read from the source)
```

`fobis info` answers from the package's source, not from the index: its versions are the source's tags, its modules
those of the newest version.

## Add it to a project

```bash
fobis add json-fortran
fobis add --module m_cli2         # the package providing that module
fobis add PENF --tag v2.0.1       # a precise version
fobis fetch && fobis build
```

`fobis add` resolves the name once and writes the source URL into the fobos `[dependencies]`, with a range starting at
the newest version (`semver=^9.3.1`). From then on the project depends on the source, not on the index.

A package without a version tag is added unpinned (it follows its default branch), with a warning.

## Install it for your compiler

```bash
fobis pkg install M_strings
fobis pkg install json-fortran --compiler intel_nextgen
fobis pkg list
fobis pkg path M_strings --pkgconfig
```

The package is built from source with your compiler and installed under
`~/.fobis/pkgs/<compiler key>/<name>/<version>/`, with a pkg-config file per library, so a CMake or make project
links it too:

```cmake
find_package(PkgConfig REQUIRED)
pkg_check_modules(STRINGS REQUIRED IMPORTED_TARGET M_strings)
target_link_libraries(app PkgConfig::STRINGS)
```

## Follow it from your own index

An index can follow others: yours lists your packages and follows this one, and `fobis search` walks both.

```toml
schema  = 1
name    = "mylab"
follows = ["https://github.com/szaghi/fortran-index"]

[package.mylib]
source = "https://git.example.org/mylab/mylib"
```

## Packages that bundle others

Some libraries ship another package's sources inside their own (a vendored copy). They then define the same modules,
flagged ⚠️ in the [modules catalogue](/packages/modules), and cannot be linked into one program with the original:
`fobis fetch` reports it before anything compiles.

See the FoBiS cookbook for everything else: [Packages and indexes](https://szaghi.github.io/FoBiS/cookbook/packages).

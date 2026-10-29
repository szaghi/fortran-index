# fortran-index

>#### A package index for FoBiS.py
> Fortran projects built with FoBiS or fpm, found by name, used by source URL. No server, no gatekeeper.

[![packages](https://img.shields.io/endpoint?url=https://szaghi.github.io/fortran-index/packages.json)](https://szaghi.github.io/fortran-index/packages/)
[![GitHub issues](https://img.shields.io/github/issues/szaghi/fortran-index)](https://github.com/szaghi/fortran-index/issues)
[![check](https://github.com/szaghi/fortran-index/actions/workflows/check.yml/badge.svg)](https://github.com/szaghi/fortran-index/actions/workflows/check.yml)
[![docs](https://github.com/szaghi/fortran-index/actions/workflows/docs.yml/badge.svg)](https://szaghi.github.io/fortran-index/)
[![License: CC0-1.0](https://img.shields.io/badge/license-CC0--1.0-lightgrey)](LICENSE)

| 🔎 **Find by name or module**<br>`fobis search json`, `fobis search --module m_cli2` | ➕ **Add by name**<br>`fobis add NAME` writes the source URL into your fobos | 🏗️ **Build by URL**<br>builds never read the index: no lock-in, no outage | 🧰 **Install for your compiler**<br>`fobis pkg install NAME`, with a pkg-config file |
|:---:|:---:|:---:|:---:|
| 📦 **FoBiS and fpm packages**<br>every package has a `fobos` or an `fpm.toml` | 🧭 **Modules catalogue**<br>who provides each module, clashes flagged | 🌐 **One index among many**<br>FoBiS reads several; follow or fork this one | 🆓 **Public domain**<br>CC0-1.0: copy, merge, mirror |

For full documentation (guide, package and module catalogues, index format) see the
[fortran-index website](https://szaghi.github.io/fortran-index/).

---

## Authors

- Stefano Zaghi — [@szaghi](https://github.com/szaghi)

Every listed package belongs to its authors: the index only says where to find it. Contributions are welcome — see
the [Contributing](https://szaghi.github.io/fortran-index/guide/contributing) page.

## Copyrights

The index (`index.toml`, `seeds.toml`) and its documentation are released under
[CC0-1.0](https://creativecommons.org/publicdomain/zero/1.0/): no rights reserved. Each listed package keeps its own
licence.

---

## Quick start

Requires [FoBiS.py](https://github.com/szaghi/FoBiS) 3.11 or newer (`pip install --upgrade FoBiS.py`).

```bash
fobis index add szaghi https://github.com/szaghi/fortran-index
fobis search json
fobis info json-fortran
```

### Use a package in a project

```bash
fobis add json-fortran     # json-fortran = https://github.com/jacobwilliams/json-fortran :: semver=^9.3.1
fobis fetch
fobis build
```

`fobis add` resolves the name once and writes the source URL into the fobos: from then on the project depends on the
source, never on this index.

### Install a package for your compiler

```bash
fobis pkg install M_strings
export PKG_CONFIG_PATH=$(fobis pkg path M_strings --pkgconfig)
gfortran main.f90 $(pkg-config --cflags --libs M_strings)
```

## Add a package

Open a pull request adding the entry to `index.toml` (and its source to `seeds.toml`). `source` is the only required
key; FoBiS can write the rest from your working copy:

```bash
fobis publish --index ../fortran-index/index.toml --source https://github.com/you/project
```

```toml
[package.project]
source      = "https://github.com/you/project"
description = "What it does, in one line"
license     = "MIT"
provides    = ["project", "project_kinds"]
```

A package needs a public source and a `fobos` or an `fpm.toml`; semantic-version tags are strongly recommended. See
[Adding a package](https://szaghi.github.io/fortran-index/guide/adding) for names, module lists and CMake projects.

## Regenerate

```bash
fobis index build seeds.toml -o index.toml --force
```

`index build` reads every source and fills descriptions, licences and modules, keeping the fields written by hand.

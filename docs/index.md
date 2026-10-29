---
layout: home

hero:
  name: fortran-index
  text: A package index for FoBiS.py
  tagline: Fortran projects built with FoBiS or fpm, found by name, used by source URL. No server, no gatekeeper.
  actions:
    - theme: brand
      text: Tutorial
      link: /tutorial/01-find
    - theme: alt
      text: Cookbook
      link: /cookbook
    - theme: alt
      text: Browse packages
      link: /packages/
    - theme: alt
      text: View on GitHub
      link: https://github.com/szaghi/fortran-index

features:
  - icon: 🔎
    title: Find by name or module
    details: fobis search finds packages by words, keywords or the Fortran module you need; fobis info reads their versions, build system and modules from the source itself.
  - icon: ➕
    title: Add by name, build by URL
    details: fobis add resolves a name once and writes the source URL into your fobos. Builds never read the index, so your project keeps building if the index disappears.
  - icon: 🧰
    title: FoBiS and fpm packages
    details: Every package has a fobos or an fpm.toml. fobis pkg install builds it with your compiler and installs it with a pkg-config file, usable from FoBiS, CMake or make.
  - icon: 🧭
    title: Modules catalogue
    details: Every module the indexed libraries provide, with the packages providing it. Modules defined by several packages are flagged before they clash at link time.
  - icon: 🌐
    title: One index among many
    details: FoBiS reads several indexes side by side, and an index can follow others. Fork this one, publish your own, or follow it from yours.
  - icon: 🆓
    title: Public domain
    details: The index is released under CC0-1.0. Copy it, merge it, mirror it. Adding a package is a pull request.
---

## Quick start

```bash
fobis index add szaghi https://github.com/szaghi/fortran-index
fobis search json
fobis search --module m_cli2
fobis info json-fortran
```

In a project:

```bash
fobis add json-fortran
fobis fetch
fobis build
```

`fobis add` writes `json-fortran = https://github.com/jacobwilliams/json-fortran :: semver=^9.3.1` into the fobos.

For your compiler, outside any project:

```bash
fobis pkg install M_strings
export PKG_CONFIG_PATH=$(fobis pkg path M_strings --pkgconfig)
gfortran main.f90 $(pkg-config --cflags --libs M_strings)
```

Requires FoBiS.py 3.11 or newer (`pip install --upgrade FoBiS.py`).

## How it fits together

```mermaid
flowchart LR
  I["fortran-index<br/>(index.toml)"] -->|"fobis search / info / add"| F["your fobos<br/>[dependencies] name = source URL"]
  O["other indexes<br/>(yours, your lab's)"] -->|"fobis search / add"| F
  F -->|"fobis fetch / build<br/>(never reads an index)"| S["package sources<br/>(git tags = versions)"]
  S -->|"fobis pkg install"| P["~/.fobis/pkgs/&lt;compiler&gt;/…<br/>lib, include, .pc"]
```

## Authors

- Stefano Zaghi — [@szaghi](https://github.com/szaghi)

Every package belongs to its authors: the index lists where to find them. Contributions are welcome — see the
[Contributing](/reference/contributing) page.

## Copyrights

The index (`index.toml`, `seeds.toml`) and this documentation are released under
[CC0-1.0](https://creativecommons.org/publicdomain/zero/1.0/): no rights reserved. Each listed package keeps its own
licence, shown in the [catalogue](/packages/).

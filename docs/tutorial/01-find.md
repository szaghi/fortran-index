---
title: 1. Find a package
---

# 1. Find a package

You need a Fortran library that writes JSON. This chapter registers the index and finds one.

You need FoBiS.py 3.14.0 or newer (older versions cannot read this index):

```bash
pip install --upgrade FoBiS.py
```

## Register the index

```console
$ fobis index add szaghi https://github.com/szaghi/fortran-index
szaghi: 170 package(s), git index
Added index szaghi = https://github.com/szaghi/fortran-index to ~/.config/fobis/config.ini
```

`szaghi` is the name you give the index on your machine. It is cloned into `~/.fobis/indexes/szaghi` and read from
there, so searching is instant and works offline.

```console
$ fobis index list
szaghi           git   user     2026-10-29T17:18:30+00:00  https://github.com/szaghi/fortran-index
```

## Search

By words in the names, descriptions and keywords:

```console
$ fobis search json
szaghi:json-fortran             https://github.com/jacobwilliams/json-fortran
    A Modern Fortran JSON API
szaghi:json-fortran-benchmarks  https://github.com/jacobwilliams/json-fortran-benchmarks
    Benchmarks for JSON Fortran parsers. Also comparison to Python.
szaghi:namelist2json            https://github.com/jacobwilliams/namelist2json
    Converting a Fortran namelist to JSON
```

Or by the Fortran module your code needs to `use`:

```console
$ fobis search --module m_cli2
szaghi:general-purpose-fortran  https://github.com/urbanjost/general-purpose-fortran
    GPF (General Purpose Fortran)
szaghi:M_CLI2                   https://github.com/urbanjost/M_CLI2
    Unix-style commandline parsing using a prototype command
```

## Look at one package

`fobis info` reads the package's source itself: its versions are the repository's tags, its modules those of the
newest version.

```console
$ fobis info json-fortran
json-fortran  (https://github.com/jacobwilliams/json-fortran)
  index     : szaghi
  summary   : A Modern Fortran JSON API
  license   : BSD
  build     : fpm
  versions  : 9.3.1, 9.3.0, 9.2.1, 9.2.0, 9.1.0, 9.0.5, 9.0.4, 9.0.3 (+45 older)
  modules   : json_file_module, json_kinds, json_module, json_parameters, json_string_utilities, json_value_module
```

json-fortran is an fpm package with 50-odd releases, and its library provides `json_module`. Next:
[use it in a project](./02-use).

---
title: Cookbook
---

# Cookbook

One recipe per task. The [tutorial](./tutorial/01-find) shows the main path with real outputs; the FoBiS cookbook has
everything else: [Packages and indexes](https://szaghi.github.io/FoBiS/cookbook/packages).

## Find who provides a module

```bash
fobis search --module m_cli2
fobis add --module m_cli2
```

`fobis add --module` adds the package when exactly one provides the module.

The [modules catalogue](/packages/modules) gives the same answer in the browser. A module provided by several
packages (flagged ⚠️) means one of them bundles the other's sources: pick one, they cannot be linked together.

## Pin a version

```bash
fobis add json-fortran
fobis add json-fortran --semver "~9.2"
fobis add json-fortran --tag 9.2.1
fobis add json-fortran --branch master
```

- no option: `semver=^NEWEST`, the newest release of the same major version;
- `--semver "~9.2"`: 9.2.x only;
- `--tag`: exactly this release;
- `--branch`: follow a branch (not reproducible).

`fobis fetch --update` moves within the range; the lock file (`.fobis_deps/fobos.lock`) records the commit and the
tree hash of what was fetched.

## Use a package that has no version tag

Some packages publish no tags. `fobis add` still adds them, unpinned, with a warning: the dependency follows the
default branch. Pin a commit to make the build reproducible:

```bash
fobis add M_io --rev <commit>
```

## Use several indexes

Indexes are searched in priority order: the project's own, then yours.

```ini
[indexes]
lab    = https://git.example.org/fortran/index
szaghi = https://github.com/szaghi/fortran-index
```

A name present in two indexes is never resolved silently: `fobis add json` fails and lists `lab:json` and
`szaghi:json`; name one of them.

## Follow this index from your own

Your index lists your packages and follows this one, so `fobis search` walks both:

```toml
schema  = 1
name    = "mylab"
follows = ["https://github.com/szaghi/fortran-index"]

[package.mylib]
source = "https://git.example.org/mylab/mylib"
```

## Install with another compiler, or with MPI

```bash
fobis pkg install json-fortran --compiler intel_nextgen
fobis pkg install json-fortran --fc /opt/gcc/16.2.0/bin/gfortran
fobis pkg install M_strings --mpi
fobis pkg install M_strings --cflags "-O3 -march=native"
```

Each combination gets its own toolchain key and prefix; `fobis pkg list` shows them all.

## Upgrade or remove installed packages

```bash
fobis pkg upgrade
fobis pkg upgrade M_strings
fobis pkg uninstall M_strings
```

`upgrade` stays within the range each package was installed with; `uninstall` removes exactly the files and links its
install wrote.

## Link an installed package from CMake or make

```cmake
find_package(PkgConfig REQUIRED)
pkg_check_modules(STRINGS REQUIRED IMPORTED_TARGET M_strings)
target_link_libraries(app PkgConfig::STRINGS)
```

```make
PCDIR  := $(shell fobis pkg path M_strings --pkgconfig)
FFLAGS += $(shell PKG_CONFIG_PATH=$(PCDIR) pkg-config --cflags M_strings)
LDLIBS += $(shell PKG_CONFIG_PATH=$(PCDIR) pkg-config --libs M_strings)
```

The pkg-config name is the library's file name without `lib` and the suffix; `ls $(fobis pkg path NAME --pkgconfig)`
lists the `.pc` files a package installed.

## Add your package

Clone (or fork) this repository next to your project, then:

```bash
fobis publish --index ../fortran-index/index.toml --source https://github.com/you/project
fobis index check ../fortran-index/index.toml
```

Add the source to `seeds.toml` too, and open a pull request. The [tutorial](./tutorial/04-publish) shows the whole
path. A package needs a public source and a `fobos` or an `fpm.toml`; tag your releases (`v1.2.0`).

## List a CMake or make project

A project without a `fobos` or an `fpm.toml` needs a recipe telling FoBiS how to build it. Put it in the index
(`recipes/NAME.toml`) and name it in the entry:

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

`backend = "make"` takes `make-args`; `backend = "recipe"` takes shell `steps` with `{fc}`, `{fflags}`, `{prefix}`
and `{jobs}`. `fobis add` copies the recipe into the project that uses it.

## Publish releases without git

A package can live on any web server, object store or shared directory: `fobis publish --archive` writes the tarball
of the latest tag and its entry in `fortran-releases.toml`.

```bash
fobis publish --archive /srv/www/fortran/mylib
```

Its URL (`https://example.org/fortran/mylib/`) is then a source like a git repository: list it in the index as
`source`, and `fetch` checks every archive against its sha256.

## Check the index before a pull request

```bash
fobis index check index.toml
fobis index check index.toml --online
```

The first checks the schema and the names (the check workflow blocks on it); the second that every source is readable
and tagged (reported weekly).

## Fork or mirror the index

The index is CC0-1.0: copy it, trim it, extend it. Your copy is an index like this one; publish it anywhere (a git
repository, a static `index.toml`, a shared directory) and register it with `fobis index add`.

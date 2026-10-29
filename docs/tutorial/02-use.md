---
title: 2. Use it in a project
---

# 2. Use it in a project

A small program prints a JSON object with json-fortran. The project is two files:

::: code-group

```fortran [src/hello.f90]
program hello
use json_module, only: json_core, json_value
implicit none
type(json_core) :: json
type(json_value), pointer :: root
call json%create_object(root, "")
call json%add(root, "greeting", "hello")
call json%add(root, "answer", 42)
call json%print(root)
call json%destroy(root)
end program hello
```

```ini [fobos]
[modes]
modes = gnu

[gnu]
compiler  = gnu
src       = ./src/
build_dir = ./build/
target    = src/hello.f90
```

:::

## Add the dependency

```console
$ fobis add json-fortran
Added json-fortran = https://github.com/jacobwilliams/json-fortran :: semver=^9.3.1
Run 'fobis fetch' to fetch it.
```

`fobis add` looked the name up in the index once, and wrote the source URL into the fobos, with a range starting at
the newest version:

```console
$ cat fobos
[modes]
modes = gnu

[gnu]
compiler  = gnu
src       = ./src/
build_dir = ./build/
target    = src/hello.f90

[dependencies]
# added by fobis add from index szaghi
json-fortran = https://github.com/jacobwilliams/json-fortran :: semver=^9.3.1
```

From now on the project depends on the source, not on the index: `fetch` and `build` never read an index.

## Fetch and build

```console
$ fobis fetch
Resolving semver '^9.3.1' for json-fortran...
Resolved json-fortran semver '^9.3.1' → 9.3.1
Cloning json-fortran from https://github.com/jacobwilliams/json-fortran
Checking out 9.3.1 for json-fortran
Saved deps config to .fobis_deps/.deps_config.ini
Saved lock file to .fobis_deps/fobos.lock
```

```console
$ fobis build --quiet && ./build/hello

Building src/hello.f90
Compiling .fobis_deps/json-fortran/src/json_kinds.F90 serially
Compiling .fobis_deps/json-fortran/src/json_parameters.F90 serially
Compiling .fobis_deps/json-fortran/src/json_string_utilities.F90 serially
Compiling .fobis_deps/json-fortran/src/json_value_module.F90 serially
Compiling .fobis_deps/json-fortran/src/json_file_module.F90 serially
Compiling .fobis_deps/json-fortran/src/json_module.F90 serially
Compiling src/hello.f90 serially
Linking build/hello
/usr/bin/ld: warning: build/obj/json_value_module.o: requires executable stack (because the .note.GNU-stack section is executable)

Target src/hello.f90 has been successfully built
{
  "greeting": "hello",
  "answer": 42
}
```

The fetched json-fortran sources are compiled with yours, by FoBiS, in dependency order. `fobis fetch --update` moves
to the newest release the range allows. Next: [install a package for your compiler](./03-install).

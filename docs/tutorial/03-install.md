---
title: 3. Install it for your compiler
---

# 3. Install it for your compiler

Sometimes you want a library installed once, usable by any project and any build system. A Fortran library is only
usable with the compiler that wrote its module files, so `fobis pkg install` builds it from source with yours.

## Install

```console
$ fobis pkg install M_strings --bin-dir ~/bin
Building M_strings v2.0.1 with gfortran (gnu-16.0.1-b9d8222d), fpm
Installed M_strings v2.0.1 for gnu-16.0.1-b9d8222d in ~/.fobis/pkgs/gnu-16.0.1-b9d8222d/M_strings/2.0.1
  modules : m_cli2, m_io, m_strings, m_strings__oop
  linked  : ~/bin/b64
  linked  : ~/bin/shake_strings
  use it  : export PKG_CONFIG_PATH=~/.fobis/pkgs/gnu-16.0.1-b9d8222d/M_strings/2.0.1/lib/pkgconfig
```

M_strings is an fpm package: FoBiS ran fpm with your compiler, installed the library, its module files and a
pkg-config file, and linked its two applications. The `gnu-16.0.1-b9d8222d` part is the toolchain key: compiler
family and version plus a digest of the compiler's path and flags. Another compiler, or other flags, installs
alongside.

## List and locate

```console
$ fobis pkg list
M_strings            v2.0.1       gnu-16.0.1-b9d8222d          fpm    https://github.com/urbanjost/M_strings
```

```console
$ fobis pkg path M_strings --pkgconfig
~/.fobis/pkgs/gnu-16.0.1-b9d8222d/M_strings/2.0.1/lib/pkgconfig
```

## Link it

Any build system that reads pkg-config files can use it. A plain compile:

```fortran [demo.f90]
program demo
use M_strings, only : upper, split
implicit none
character(len=:), allocatable :: words(:)
integer :: i
call split("modern fortran packages", words)
print "(3(A,1X))", (upper(words(i)), i = 1, size(words))
end program demo
```

```console
$ export PKG_CONFIG_PATH=$(fobis pkg path M_strings --pkgconfig) && gfortran demo.f90 $(pkg-config --cflags --libs M_strings) -o demo && ./demo
MODERN   FORTRAN  PACKAGES
```

From CMake:

```cmake
find_package(PkgConfig REQUIRED)
pkg_check_modules(STRINGS REQUIRED IMPORTED_TARGET M_strings)
target_link_libraries(demo PkgConfig::STRINGS)
```

Next: [publish your own package](./04-publish).

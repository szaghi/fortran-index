---
title: 4. Publish your own package
---

# 4. Publish your own package

Ada has a small fpm library, `vectors`, tagged `v0.1.0` and pushed to `https://github.com/ada/vectors`:

::: code-group

```toml [fpm.toml]
name = "vectors"
version = "0.1.0"
license = "MIT"
description = "Small fixed-size vector algebra"
```

```fortran [src/vectors.f90]
module vectors
implicit none
private
public :: dot, norm
contains
pure real function dot(a, b)
real, intent(in) :: a(:), b(:)
dot = sum(a*b)
end function dot
pure real function norm(a)
real, intent(in) :: a(:)
norm = sqrt(dot(a, a))
end function norm
end module vectors
```

:::

To list it, she clones (or forks) the index next to her project and lets FoBiS write the entry from the working copy:

```console
$ fobis publish --index ~/fortran-index/index.toml --source https://github.com/ada/vectors
Added vectors in ~/fortran-index/index.toml (1 module(s))
```

```console
$ git diff --no-color --unified=0 index.toml
diff --git a/index.toml b/index.toml
index 6ab8d65..650391d 100644
--- a/index.toml
+++ b/index.toml
@@ -975,0 +976,6 @@ provides = ["vecfor", "vecfor_r16p", "vecfor_r4p", "vecfor_r8p", "vecfor_rpp"]
+[package.vectors]
+source = "https://github.com/ada/vectors"
+description = "Small fixed-size vector algebra"
+license = "MIT"
+provides = ["vectors"]
+
```

The description and licence come from `fpm.toml`, the module list from `src/`. She checks the index:

```console
$ fobis index check index.toml
index.toml: valid index 'szaghi', 171 package(s)
```

then adds the source to `seeds.toml` too (so the index can be regenerated) and opens a pull request. Once merged,
anyone who registered the index finds `vectors` with `fobis search`.

Her later releases need nothing in the index: she tags `v0.2.0`, and `fobis add vectors` or `fobis fetch --update`
find it in her repository.

The [cookbook](../cookbook) has the variations: a CMake project, releases without git, your own index.

## 2022.03.09

- Nested object support! If you've always wanted to add more than one separator to your environment variable names, `vne` can handle it.
  - Integrated [`deepmerge`](https://github.com/TehShrike/deepmerge) and its [dependency](https://github.com/TehShrike/is-mergeable-object) to enable this (didn't wish to have additional dependencies to install).
- Added default and named exports.
- Added additional tests.
- Streamline/updated README.

## 2020.04.05

- `vne` is written in TypeScript and has tests.
- `vne` learned to fail gracefully. Developers see a nicely formatted message in their console about `vne` not being able to locate their environment file.
- `vne` must be called as a function. So, `console.log(vne());` versus `console.log(vne);` previously.
- `vne` supports a middle dot (`·`) for namespacing in one's environment file.

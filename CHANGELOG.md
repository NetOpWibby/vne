## 2020.04.05

- `vne` is written in TypeScript and has tests.
- `vne` learned to fail gracefully. Developers see a nicely formatted message in their console about `vne` not being able to locate their environment file.
- `vne` must be called as a function. So, `console.log(vne());` versus `console.log(vne);` previously.
- `vne` supports a middle dot (`·`) for namespacing in one's environment file.




///  I M P O R T

import { parseFile as envFile } from "env-smart";
import rootFile from "app-root-path";

///  U T I L

import { deepmerge, messageDeveloper } from "./helper";

interface LooseObject {
  [key: string]: any
}

const numberedStringRegex = /(\w+\d+)/g;
const separatorRegex = /-|\.|·/g;



///  E X P O R T

export default vne;

export function vne(suppliedEnv?: string) {
  const defaultObject: LooseObject = {};
  let nestedObject: LooseObject = {};
  let _env: LooseObject = {};

  if (suppliedEnv) {
    /// You can supply an absolute path to your environment file.
    _env = envFile(suppliedEnv);
  } else {
    /// By default, the file named ".env" relative to your project will be used.
    _env = envFile(rootFile.resolve("/.env"));
  }

  if (!_env) {
    /// Fail gracefully and inform developer.
    messageDeveloper("No environment file detected or supplied.");
    return {};
  }

  Object.keys(_env).map((variable: LooseObject|string) => {
    /// Numbers are removed from variable name.
    const cleanVariable = variable.replace(/\d+/g, "");
    const stringifiedVariable = String(variable);

    switch(true) {
      case (variable.match(numberedStringRegex) && variable.match(numberedStringRegex).length > 0):
        if (!defaultObject[cleanVariable]) {
          /// If array does not exist, it will get created.
          defaultObject[cleanVariable] = [];
        }

        defaultObject[cleanVariable].push(_env[stringifiedVariable]);
        break;

      case (variable.match(separatorRegex) && variable.match(separatorRegex).length > 0):
        /// Recursive object handling made simple.
        nestedObject = deepmerge(
          nestedObject,
          variable.split(separatorRegex).reduceRight((value: any, key: string) => ({ [key]: value }), _env[stringifiedVariable])
        );
        break;

      default:
        defaultObject[stringifiedVariable] = _env[stringifiedVariable];
        break;
    }
  });

  return { ...defaultObject, ...nestedObject };
};



/// DEBUG
// console.log(vne("path/to/local/.env/to/debug/this/module"));




//  I M P O R T S

import { parseFile as envFile } from "env-smart";
import print from "@webb/console";
import rootFile from "app-root-path";

//  U T I L S

interface LooseObject {
  [key: string]: any
}

const numberedStringRegex = /(\w+\d+)/g;
const separatorRegex = /-|\.|·/g;



//  E X P O R T

export default (suppliedEnv?: string) => {
  const defaultObject: LooseObject = {};
  const nestedObject: LooseObject = {};
  let _env: LooseObject = {};

  if (suppliedEnv) {
    /// You can supply an absolute path to an environment file.
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

    switch(true) {
      case (
        variable.match(numberedStringRegex) &&
        variable.match(numberedStringRegex).length > 0
      ):
        if (!defaultObject[cleanVariable]) {
          /// If array does not exist, it will get created.
          defaultObject[cleanVariable] = [];
        }

        defaultObject[cleanVariable].push(_env[String(variable)]);
        break;

      case (
        variable.match(separatorRegex) &&
        variable.match(separatorRegex).length > 0
      ):
        nestedObject[variable.split(separatorRegex)[0]] = nestedObject[variable.split(separatorRegex)[0]] || {};
        nestedObject[variable.split(separatorRegex)[0]][variable.split(separatorRegex)[1]] = _env[String(variable)];
        break;

      default:
        defaultObject[String(variable)] = _env[String(variable)];
        break;
    }
  });

  return { ...defaultObject, ...nestedObject };
};



//  H E L P E R

function messageDeveloper(suppliedMessage: string) {
  console.log(
    print.magentaLine(print.black(" [vne] ")) +
    print.invert(` ${suppliedMessage} `) + "\n"
  );
}

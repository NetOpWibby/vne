"use strict";



//  P A C K A G E

const { parseFile: efile } = require("env-smart");

//  U T I L S

const _env = efile(require("app-root-path").resolve("/.env"));
const defaultObject = {};
const nestedObject = {};
const numberedStringRegex = /(\w+\d+)/g;
const separatorRegex = /-|\./g;



//  P R O G R A M

_env.forEach(variable => {
  const cleanVariable = variable.replace(/\d+/g, ""); // remove numbers from variable name

  switch(true) {
    case (
      variable.match(numberedStringRegex) &&
      variable.match(numberedStringRegex).length > 0
    ):
      if (!defaultObject[cleanVariable])
        defaultObject[cleanVariable] = []; // if array does not exist, create it

      defaultObject[cleanVariable].push(_env[variable]);
      break;

    case (
      variable.match(separatorRegex) &&
      variable.match(separatorRegex).length > 0
    ):
      nestedObject[variable.split(separatorRegex)[0]] = nestedObject[variable.split(separatorRegex)[0]] || {};
      nestedObject[variable.split(separatorRegex)[0]][variable.split(separatorRegex)[1]] = _env[variable];
      break;

    default:
      defaultObject[variable] = _env[variable];
      break;
  }
});



//  E X P O R T

module.exports = exports = Object.assign(defaultObject, nestedObject);

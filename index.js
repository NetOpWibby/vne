"use strict";



//  P A C K A G E

const efile = require("node-env-file");

//  V A R I A B L E

const _env = efile(require("app-root-path").resolve("/.env"));



//  P R O G R A M

const defaultObject = {};
const nestedObject = {};

const numberedStringRegex = /(\w+\d+)/g;
const separatorRegex = /-|\./g;

for (const variable in _env) {
  const cleanVariable = variable.replace(/\d+/g, ""); // remove numbers from variable name

  switch(true) {
    case (
      variable.match(numberedStringRegex) &&
      variable.match(numberedStringRegex).length > 0
    ):
      if (!defaultObject[cleanVariable]) defaultObject[cleanVariable] = []; // if array does not exist, create it
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
}



//  E X P O R T

module.exports = exports = Object.assign(defaultObject, nestedObject);

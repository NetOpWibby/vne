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
  if (variable.match(numberedStringRegex)) {
    const cleanVariable = variable.replace(/\d+/g, ""); // remove numbers from variable name

    if (!defaultObject[cleanVariable]) defaultObject[cleanVariable] = []; // if array does not exist, create it
    defaultObject[cleanVariable].push(_env[variable]);
  }

  else if (variable.match(separatorRegex)) {
    nestedObject[variable.split(separatorRegex)[0]] = nestedObject[variable.split(separatorRegex)[0]] || {};
    nestedObject[variable.split(separatorRegex)[0]][variable.split(separatorRegex)[1]] = _env[variable];
  }

  else {
    defaultObject[variable] = _env[variable];
  }
}



//  E X P O R T

module.exports = exports = Object.assign(defaultObject, nestedObject);




///  I M P O R T

import print from "@webb/console";

///  U T I L

interface Options {
  arrayMerge?(target: any[], source: any[], options?: Options): any[];
  clone?: boolean;
  isMergeableObject?(value: object): boolean;
}



///  E X P O R T

export function deepmerge(target: any, source: any, options: Options = {}): object {
  options.arrayMerge = defaultArrayMerge;
  options.clone = true;
  options.isMergeableObject = isMergeableObject;

  const sourceIsArray = Array.isArray(source);
  const targetIsArray = Array.isArray(target)
  const sourceAndTargetTypesMatch = sourceIsArray === targetIsArray;

  if (!sourceAndTargetTypesMatch) {
    return clone(source, options);
  } else if (sourceIsArray) {
    return options.arrayMerge(target, source, options);
  } else {
    return mergeObject(target, source, options);
  }
}

export function messageDeveloper(message: string) {
  process.stdout.write(
    print.magentaLine(print.black(" [vne] ")) +
    print.invert(` ${message} `) + "\n"
  );
}



///  H E L P E R

function clone(value: any, options: any) {
  return (options.clone !== false && options.isMergeableObject(value)) ?
    deepmerge(Array.isArray(value) ? [] : {}, value, options) :
    value;
}

function defaultArrayMerge(target: [], source: any, options: Options) {
  return target.concat(source).map((element: any) => {
    return clone(element, options);
  });
}

function isMergeableObject(value: any): boolean {
  function isNonNullObject(value: any): boolean {
    return !!value && typeof value === "object";
  }

  function isSpecial(value: any): boolean {
    const stringValue = Object.prototype.toString.call(value);
    return stringValue === "[object RegExp]" || stringValue === "[object Date]";
  }

  return isNonNullObject(value) && !isSpecial(value);
}

function mergeObject(target: any, source: any, options: any): object {
  const destination: { [key: string]: any } = {};

  if (options.isMergeableObject(target)) {
    Object.keys(target).forEach((key: string) => {
      destination[key] = clone(target[key], options);
    });
  }

  Object.keys(source).forEach((key: string) => {
    if (propertyIsUnsafe(target, key))
      return;

    if (propertyIsOnObject(target, key) && options.isMergeableObject(source[key]))
      destination[key] = deepmerge(target[key], source[key], options);
    else
      destination[key] = clone(source[key], options);
  });

  return destination;
}

function propertyIsOnObject(object: any, property: any): boolean {
  try {
    return property in object;
  } catch(_) {
    return false;
  }
}

function propertyIsUnsafe(target: any, key: any): boolean {
  return propertyIsOnObject(target, key) &&
    !(
      Object.hasOwnProperty.call(target, key) &&
      Object.propertyIsEnumerable.call(target, key)
    );
}



/// via https://github.com/TehShrike/deepmerge
/// via https://github.com/TehShrike/is-mergeable-object




///  N A T I V E

import assert from "assert";
import { join } from "path";

///  I M P O R T

import Test from "@webb/test";

///  U T I L

import defaultExport, { vne } from "../dist";



///  T E S T

const test = Test("vne");

const expectedResponseComplex = {
  tokens: [
    "jumb1e-0f-num8er5-and-l3tt3r5",
    "l3tt3r5-and-jumb1e-0f-num8er5"
  ],
  portDatabase: "55555",
  service: {
    acme: {
      sandbox: {
        api: "jumb1e-0f-l3tt3r5-and-num8er5"
      },
      production: {
        api: "jumb1e-0f-num8er5-and-l3tt3r5-and-w0rd5"
      }
    }
  },
  server: {
    dev: {
      api: "http://localhost:3000",
      app: "http://localhost:3001",
      marketing: "http://localhost:3002"
    },
    prod: {
      api: "https://api.domain.tld",
      app: "https://app.domain.tld",
      marketing: "https://domain.tld"
    }
  }
};

const expectedResponseSimple = {
  tokens: [
    "jumb1e-0f-num8er5-and-l3tt3r5",
    "l3tt3r5-and-jumb1e-0f-num8er5"
  ],
  portDatabase: "55555",
  serviceApi: "jumb1e-0f-l3tt3r5-and-num8er5",
  dev: {
    api: "http://localhost:3000",
    app: "http://localhost:3001",
    marketing: "http://localhost:3002"
  },
  prod: {
    api: "https://api.domain.tld",
    app: "https://app.domain.tld",
    marketing: "https://domain.tld"
  }
};

test("Returns empty Object if no environment file is found", () => {
  assert.deepStrictEqual(defaultExport(), {});
});

test("Returns empty Object if absolute path to environment file fails", () => {
  assert.deepStrictEqual(
    defaultExport(join(process.cwd(), "test/.env10")), {}
  );
});

test("Processes environment files using dashes as separators", () => {
  assert.deepStrictEqual(
    defaultExport(join(process.cwd(), "test/.env1")), expectedResponseSimple
  );
});

test("Processes environment files using dots as separators", () => {
  assert.deepStrictEqual(
    defaultExport(join(process.cwd(), "test/.env2")), expectedResponseSimple
  );
});

test("Processes environment files using middle dots as separators", () => {
  assert.deepStrictEqual(
    defaultExport(join(process.cwd(), "test/.env3")), expectedResponseSimple
  );
});

test("Processes environment files with several separators resulting in many nested objects", () => {
  assert.deepStrictEqual(
    defaultExport(join(process.cwd(), "test/.env4")), expectedResponseComplex
  );
});

//

test("Returns empty Object if no environment file is found, using named export", () => {
  assert.deepStrictEqual(vne(), {});
});

test("Returns empty Object if absolute path to environment file fails, using named export", () => {
  assert.deepStrictEqual(
    vne(join(process.cwd(), "test/.env10")), {}
  );
});

test("Processes environment files using dashes as separators, using named export", () => {
  assert.deepStrictEqual(
    vne(join(process.cwd(), "test/.env1")), expectedResponseSimple
  );
});

test("Processes environment files using dots as separators, using named export", () => {
  assert.deepStrictEqual(
    vne(join(process.cwd(), "test/.env2")), expectedResponseSimple
  );
});

test("Processes environment files using middle dots as separators, using named export", () => {
  assert.deepStrictEqual(
    vne(join(process.cwd(), "test/.env3")), expectedResponseSimple
  );
});

test("Processes environment files with several separators resulting in many nested objects, using named export", () => {
  assert.deepStrictEqual(
    vne(join(process.cwd(), "test/.env4")), expectedResponseComplex
  );
});

test.run();

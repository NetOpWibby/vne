


//  N A T I V E

import assert from "assert";
import { join } from "path";

//  I M P O R T

import Test from "@webb/test";

//  U T I L

import vne from "../dist";



//  T E S T S

const test = Test("vne");

const expectedResponse = {
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
  assert.deepStrictEqual(vne(), {});
});

test("Returns empty Object if absolute path to environment file fails", () => {
  assert.deepStrictEqual(
    vne(join(process.cwd(), "test/.env4")), {}
  );
});

test("Processes environment files using dashes as separators", () => {
  assert.deepStrictEqual(
    vne(join(process.cwd(), "test/.env1")), expectedResponse
  );
});

test("Processes environment files using dots as separators", () => {
  assert.deepStrictEqual(
    vne(join(process.cwd(), "test/.env2")), expectedResponse
  );
});

test("Processes environment files using middle dots as separators", () => {
  assert.deepStrictEqual(
    vne(join(process.cwd(), "test/.env3")), expectedResponse
  );
});

test.run();

# vne

> A clever .env (made clever-er with [env-smart](https://github.com/jessety/env-smart))



## Install

```sh
npm i vne
```



## Usage

```ts
import { vne } from "vne"; // use the named export...
import env from "vne";     // or, the default and name it whatever you want

// Your .env file, made more useful.
console.log(vne()); // or, env();
```



## API

### vne(path?)
#### path

Type: `string` (optional)

`vne` has two assumptions about your project: 1) your environment file has a filename of `.env` and 2) this file in the root of your project. If one of those assumptions are incorrect, you can specify an **absolute** `path` to your environment file and `vne` will use that.



## Example

Take this sample `.env` file:

```ini
tokens1="jumb1e-0f-num8er5-and-l3tt3r5"
tokens2="l3tt3r5-and-jumb1e-0f-num8er5"

portDatabase=55555
serviceApi="jumb1e-0f-l3tt3r5-and-num8er5"

dev-api="http://localhost:3000"
prod-api="https://api.domain.tld"

dev-app="http://localhost:3001"
prod-app="https://app.domain.tld"

dev-marketing="http://localhost:3002"
prod-marketing="https://domain.tld"
```

`vne` takes the `.env` file and produces an object like this:

```json
{
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
}
```

Variables with names differentiated by numbers are intelligently placed into an array for easy iteration. A use case would be a handful of tokens you want to have admin access to your API.

Other variables in your `.env` file with a `-`, `.`, or `·` get placed into a nested object for easy querying. That way, you will be able to do something like this:

```ts
const { dev, prod } = vne();

try {
  await request({
    url: process.env.NODE_ENV === "development" ?
      dev.api :
      prod.api
  });
} catch(_) {
  // handle error
}
```

The above example checks to see if your app is running in a `development` environment (of course, this assumes that you are setting your environment when starting your app).

Easy-peasy!



## Tests

```sh
# Run all tests, sequentially
$ npm test

# Test dependencies for latest versions
$ npm run test:dependencies

# Lint "src" directory
$ npm run test:lint

# Test this module
$ npm run test:lint-assert
```



## Related

- [`@webb/order-object`](https://www.npmjs.com/package/@webb/order-object)
- [`@webb/stringify-object`](https://www.npmjs.com/package/@webb/stringify-object)

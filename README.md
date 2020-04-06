# vne

> A clever .env (made clever-er with [env-smart](https://github.com/jessety/env-smart))



## Install

```sh
$ npm i vne
```



## Usage

```js
import env from "vne";

// Your .env file, made more useful.
// See example below.
console.log(env());
```



## API

### env(path?)
#### path

Type: `string` (optional)

`vne` has two assumptions about your project: 1) your environment file has a filename of `.env` and 2) this file in the root of your project. If one of those assumptions are incorrect, you can specify an **absolute** `path` to your environment file and `vne` will use that.



## Example

Take this sample `.env` file:

```env
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

Other variables in your `.env` file with a `-`, `.`, or `·` gets placed into a nested object for easy querying. That way, you will be able to do something like this (check the `url` parameter):

```js
return new Promise((resolve, reject) => {
  request({
    body: {},
    json: true,
    method: "POST",
    url: process.env.NODE_ENV === "development" ? // BOOM
      env.dev.api :
      env.prod.api
  }).then(body => {
    if (!body)
      return reject(body);

    resolve(body);
  }).catch(error => {
    resolve(error);
  });
});
```

That one-liner checks to see if your app is running in a `development` environment or not (of course, this assumes that you are setting your environment when starting your app). Check out the `scripts` section of this [`package.json` file](https://code.webb.page/Starters/express-boilerplate/files/master/package.json) for reference.

Anyhoo, if your app is running in `development` mode the parameter on the left side of the `:` will be called. If not (it's running in `production` mode), the parameter on the right side is called.

Easy-peasy!



## Tests

```sh
# Run all tests, sequentially
$ npm test

# Test dependencies for latest versions
$ npm run test:dependencies

# Lint "src" directory
$ npm run test:typescript

# Test this module
$ npm run test:assert
```



## Related

- [`@webb/order-object`](https://www.npmjs.com/package/@webb/order-object)
- [`@webb/stringify-object`](https://www.npmjs.com/package/@webb/stringify-object)

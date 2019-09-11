# vne

[![WebbHub](https://img.shields.io/badge/%F0%9F%95%B8-code.webb.page/vne-07d0eb.svg?style=flat-square)](https://code.webb.page/vne)

> A clever .env

`vne` now supports the typed variable syntax of [env-smart](https://github.com/jessety/env-smart)!



### Installation

```bash
$ npm i vne
```



### Usage

```javascript
import env from "vne"; // ES6
// const env = require("vne"); // ES5

console.log(env); // your .env file as an Object
```



### Example

Take this sample `.env` file:

```env
tokens1="jumble-of-numbers-and-letters"
tokens2="letters-and-jumble-of-numbers"

portDatabase=55555
serviceApi="jumble-of-letters-and-numbers"

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
    "jumble-of-numbers-and-letters",
    "letters-and-jumble-of-numbers"
  ],
  portDatabase: "55555",
  serviceApi: "jumble-of-letters-and-numbers",
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

Other variables in your `.env` file with a `-` or `.` gets placed into a nested object for easy querying. That way, you will be able to do something like this (check the `url` parameter):

```javascript
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

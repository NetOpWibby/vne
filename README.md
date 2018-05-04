# vne

[![N](https://img.shields.io/badge/%F0%9F%91%8D%F0%9F%8F%BE-NetOperatorWibby/vne-07d0eb.svg?style=flat-square)](https://git.inc.sh/NetOperatorWibby/vne)

> A clever `.env`



### Installation

```bash
$ npm i vne -S
```



### Usage

```javascript
import env from "vne";

console.log(env); // your .env file in object format
```



### Example

Take this sample `.env` file:

```env
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

Any variable in your `.env` file with a `-` or `.` gets placed into a nested object for easy querying. That way, you will be able to do something like this (check the `url` parameter):

```javascript
return new Promise((resolve, reject) => {
  request({
    method: "POST",
    url: process.env.NODE_ENV === "development" ? env.dev.api : env.prod.api, // BOOM
    body: {},
    json: true
  }).then(body => {
    if (!body) return reject(body);
    resolve(body);
  }).catch(error => {
    resolve(error);
  });
});
```

That one-liner checks to see if your app is running in a `development` environment or not (of course, this assumes that you are setting your environment when starting your app). Check out the `scripts` section of this [`package.json` file](https://git.inc.sh/NetOperatorWibby/express-boilerplate/src/branch/master/package.json) for reference.

Anyhoo, if your app is running in `development` mode the parameter on the left side of the `:` will be called. If not (it's running in `production` mode), the parameter on the right side is called.

Easy-peasy!

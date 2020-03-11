# petch
Alternative javascript fetch api with adding pre-setup options for every request.

## Installation
This is library available through [npm registry](https://npmjs.com/petch).

```
npm install --save petch
```

## Setup
Lets setup your options and headers for fetch request.

```js
import * as Petch from 'petch'

const petch = new Petch({
  origin: 'https://example.com/api',
  options: {
    mode: 'cors'
  },
  headers: {
    'Accept': 'application/json'
  }
})
```

## Access current setting
After setup, we can be accessing current setting `origin`, `options` and `headers` from `setting` property.

```js
console.log('current origin: ', petch.setting.origin)
console.log('current options object: ', petch.setting.options)
console.log('current headers object: ', petch.setting.headers)
```

## Re-setup current setting
The current setting can be changed or add a new property from `setup()`.

```js
petch.setup({
  headers: {
    'Authorization': 'auth_key'
  }
})
```

The `Petch()` accept one setting parameter with optionaly settings.

| Name | Type | Description |
|--|--|--|
| origin | {String} | Where a fetch request will be send, the origin is prefix for all send request. |
| options | {Object} | The root options of fetch api like **mode**, **cache**, etc.|
| headers | {Object} | Headers options. |

## Send request method
### get()
Send request with method **GET**.

```js
petch.get('users')
  .then(res => {
    console.log(res.ok)
  })
```

### postData()
Send request with method **POST**. Automaticaly add headers **Content-Type** with value `application/x-www-form-urlencoded` and transform body object into form data.

```js
petch.postData('login', {
  body: {
    username: 'username',
    password: 'password'
  }
})
  .then(res => {
    console.log(res.ok)
  })
```

### uploadData()
Send request with method **POST**. Automaticaly add headers **Content-Type** with value `multipart/form-data` and transform body object into form data.

```js
const fileField = document.querySelector('input[type="file"]');

petch.uploadData('user/profile', {
  body: {
    photo: fileField.files[0]
  }
})
  .then(res => {
    console.log(res.ok)
  })
```

### postJSON()
Send request with method **POST**. Automaticaly add headers **Content-Type** with value `application/json` and transform body object into json data.

```js
petch.postJSON('user/profile', {
  body: {
    first_name: 'FirstName',
    last_name: 'LastName'
  }
})
  .then(res => {
    console.log(res.ok)
  })
```

## Parameters
All request method can accept two parameter and return a fetch promise.

| Name | Type | Description |
|--|--|--|
| url | {String} | The path of request url. |
| setting | {Object} | Contain fetch setting. |

## PUT & DELETE
Same with **GET** and **POST** you can use **PUT** and **DELETE** method with similliar parameter.
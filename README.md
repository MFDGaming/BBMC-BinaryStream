# BinaryStream
BlueBirdMC's BinaryStream

## How to use?
Here is some example code
```js
const BinaryStream = require("bbmc-binarystream");

let stream = new BinaryStream();
stream.writeIntLE(12);
console.log(stream.readIntLE());
```

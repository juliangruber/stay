
# stay

Persistent scuttlebutt instances for browser and node

`stay` provides a wrapper around

```js
// stream FROM disk.
fs.createReadStream(file).pipe(model.createWriteStream())

// stream TO disk.
model.on('sync', function () {
  model.createReadStream().pipe(fs.createWriteStream(file))
})
```

that works well with many instances, works in the browser using localStorage
and propperly handles empty records
(see [dominictarr/kv/pull/1](https://github.com/dominictarr/kv/pull/1))

[![browser support](http://ci.testling.com/juliangruber/stay.png)](http://ci.testling.com/juliangruber/stay)

## usage

```js
var stay = require('stay')('/some/path')

// just some scuttlebutt things...
var Model = require('scuttlebutt/model')
var Doc = require('crdt').Doc
var modelA = new Model()
var modelB = new Model()
var doc = new Doc()

// now persist!
stay({
  'modelA' : modelA,
  'modelB' : modelB,
  'doc' : doc
})
```

`stay` also emits a `sync` event when all the instances are synced:

```js
stay({
  'model' : model
}).on('sync', function () {
  // all synced now
})
```

...and has a short mode

```js
stay('model', model)
```

## license

(MIT)

Copyright (c) 2012 &lt;julian@juliangruber.com&gt;

Permission is hereby granted, free of charge, to any person obtaining a copy of
this software and associated documentation files (the "Software"), to deal in
the Software without restriction, including without limitation the rights to
use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
the Software, and to permit persons to whom the Software is furnished to do so,
subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

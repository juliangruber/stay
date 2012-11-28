var _kv = require('kv')
var EventEmitter = require('events').EventEmitter
var inherits = require('util').inherits

module.exports = function (path) {
  if (!path) throw new Error('path required')

  return function stay (butts) {
    var ee = new EventEmitter()
    var kv = _kv(path)

    var names = Object.keys(butts)
    var toSync = names.length

    names.forEach(function (name) {
      var butt = butts[name]
      
      kv.has(name, function (err) {
        if (err) {
          onSync()
        } else {
          butt.on('sync', onSync)
          kv.get(name).pipe(butt.createWriteStream())
        }

        function onSync() {
          butt.createReadStream().pipe(kv.put(name, { flags : 'a' }))
          if (!--toSync) process.nextTick(function () {
            ee.emit('sync')
          })
        }
      })
    })

    return ee
  }
}

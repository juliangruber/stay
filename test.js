var test = require('tape')
var stay = require('./')
var Model = require('scuttlebutt/model')

var path = '/tmp/store' + Math.random().toString(16).slice(2)

test('storage clean', function (t) {
  t.plan(1)

  var A = new Model()
  var B = new Model()

  A.set('foo', 'bar')

  stay(path)({
    'model' : A
  }).on('sync', function () {
    stay(path)({
      'model' : B
    }).on('sync', function () {
      t.equals(B.get('foo'), 'bar')
    })
  })
})

test('storage dirty', function (t) {
  t.plan(1)

  var A = new Model()

  stay(path)({
    'model' : A
  })

  A.on('sync', function () {
    t.equal(A.get('foo'), 'bar')
  })
})

test('short', function (t) {
  t.plan(1)

  var A = new Model()

  stay(path)('model', A)

  A.on('sync', function () {
    t.equal(A.get('foo'), 'bar')
  })
})

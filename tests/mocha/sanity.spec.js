const {describe, it, afterEach} = global
const request = require('request')
const fs = require('fs')
const assert = require('assert')

function runServer () {
  var spawn = require('child_process').spawn
  spawn('node', ['index.js'], {
    detached: true
  })
}

afterEach(function (done) {
  this.timeout(4000)
  request('http://localhost:9090/killme', () => {
    setTimeout(done, 2000)
  })
})

describe('killable-static-server', () => {
  it('should server static files from dist', function (done) {
    this.timeout(4000)
    runServer()
    setTimeout(() => {
      const content = fs.readFileSync('dist/index.html').toString()
      request('http://localhost:9090', (e, r, body) => {
        assert.equal(body, content)
        done()
      })
    }, 2000)
  })

  it('should kill the server', function (done) {
    this.timeout(6000)
    runServer()
    setTimeout(() => {
      request('http://localhost:9090/killme', (e, r, body) => {
        assert.equal(body, 'killing')
        setTimeout(() => {
          request('http://localhost:9090', (e, r, body) => {
            assert(e.message.indexOf('ECONNREFUSED') >= 0, 'should get ECONNREFUSED error')
            done()
          })
        }, 2000)
      })
    }, 2000)
  })
})

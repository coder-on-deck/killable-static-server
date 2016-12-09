#!/usr/bin/env node
const history = require('connect-history-api-fallback')
let argv = require('minimist')(process.argv.slice(2))
const connectStatic = require('connect-static')
argv = Object.assign({port: 9090, dir: 'dist', killUrl: '/killme'}, argv)
process.title = 'killable-static-server'
const connect = require('connect')
const http = require('http')
const app = connect()
app.use((req, res, next) => {
  if (argv.verbose) {
    console.log('serving', req.url)
  }
  if (req.url.indexOf(argv.killUrl) >= 0) {
    res.end('killing')
    process.exit(0)
  } else {
    next()
  }
})

app.use(history())

connectStatic({dir: argv.dir}, function (err, middleware) {
  if (err) throw err
  app.use('/', middleware)
})

if (argv.verbose) {
  console.log('running server at: ' + argv.port)
  console.log('kill url is:' + argv.killUrl)
}
http.createServer(app).listen(argv.port)

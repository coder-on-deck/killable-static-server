#!/usr/bin/env node
const fallback = require('express-history-api-fallback')
const argv = require('minimist')(process.argv.slice(2))
const express = require('express')
const app = express()
const killUrl = argv.killUrl || '/killme'
process.title = 'killable-static-server'

// Define the port to run on
app.set('port', argv.port || 9090)
const root = argv.root || process.cwd()
app.use((req, res, next) => {
  if (req.url === killUrl) {
    res.send('killing')
    process.exit(0)
  } else {
    next()
  }
})
app.use(express.static(root))
app.use(fallback('index.html', { root: root }))
// Listen for requests
var server = app.listen(app.get('port'), function () {
  var port = server.address().port
  console.log(`killable server is up on ${port}`)
  console.log(`kill me using ${killUrl}`)
})

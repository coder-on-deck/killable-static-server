# killable-static-server

> A static server that is very easy to kill. Great for tests. supports html5  

[![Standard - JavaScript Style Guide](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](http://standardjs.com/)
[![Build Status](https://travis-ci.org/coder-on-deck/killable-static-server.svg?branch=master)](https://travis-ci.org/coder-on-deck/killable-static-server)

# Installation 

```
npm install -g killable-static-server
```

# Running

```
killable-static-server
```

# Killing

```
curl http://localhost:9090/killme
```

OR 

```
killall killable-static-server
```

# Easily use with protractor

Just add this to your protractor configuration file

```
beforeLaunch: ()=>{
   require('killable-static-server')
 }
```

This will run and kill your server on each run

# Options

 - **verbose** - to see verbose prints. default: false
 - **port** - port to use. default: 9090
 - **dir** - static dir to serve. default: dist
 - **killUrl** - url that will kill the process. default: `/killme`

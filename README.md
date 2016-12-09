# killable-static-server

> A static server that is very easy to kill. Great for tests. supports html5  

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

# Options

 - **verbose** - to see verbose prints. default: false
 - **port** - port to use. default: 9090
 - **dir** - static dir to serve. default: dist
 - **killUrl** - url that will kill the process. default: `/killme`
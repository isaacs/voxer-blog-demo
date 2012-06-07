var http = require("http")

var routes = require("routes")
var router = new routes.Router()


router.addRoute("/newpost", require("./routes/post-new.js"))
router.addRoute("/post/:id?", require("./routes/post.js"))
router.addRoute("/", require("./routes/list.js"))
router.addRoute("/favicon.ico", require("./routes/favicon.js"))

var ErrorPage = require('error-page')

var Templar = require('templar')
, ejs = require('ejs')
, templarOptions = { engine: ejs, folder: './templates' }

Templar.loadFolder('./templates')

http.createServer(function (req, res) {

  res.error = ErrorPage(req, res, {})
  res.template = Templar(req, res, templarOptions)

  var route = router.match(req.url)
  if (!route) return res.error(404)

  Object.keys(route).forEach(function (k) {
    req[k] = route[k]
  })

  route.fn(req, res)

}).listen(process.env.PORT || 1337)

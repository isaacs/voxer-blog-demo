module.exports = favicon

var fs = require("fs")
var path = require("path")
var file = path.resolve(__dirname, "../favicon.ico")
var data = fs.readFileSync(file)
var len = data.length

// todo: more clever etag.  hash, or whatever.
var etag = '"' + Date.now() + '"'

function favicon (req, res) {
  if (req.headers['if-none-match'] === etag) {
    res.statusCode = 304
    return res.end()
  }

  res.setHeader('content-length', len)
  res.setHeader('mime-type', 'image/x-icon')
  res.setHeader('etag', etag)
  res.end(data)
}


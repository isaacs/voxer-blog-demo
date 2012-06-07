// single post handler
module.exports = post

var qs = require('querystring')

var getPost = require('../models/post.js')
var putPost = require('../models/post-put.js')

function post (req, res) {
  switch (req.method) {
    case 'GET':
    case 'HEAD':
      return showPost(req, res)
    case 'POST':
    case 'PUT':
      return makePost(req, res)
    default: return res.error(405)
  }
}

function showPost (req, res) {
  getPost(req.params.id, function (er, data) {
    if (er) return res.error(er)
    if (!data) return res.error(404)

    res.template('post.ejs', { post: data, title: data.title })
  })
}

var StringDecoder = require('string_decoder').StringDecoder
function makePost (req, res) {
  // TODO: Validate login
  var d = new StringDecoder()
  var s = ""
  req.on("data", function (c) {
    s += d.write(c)
  })

  req.on('end', function () {
    makePost_(req, res, s)
  })
}

function makePost_ (req, res, data) {
  data = qs.parse(data)

  if (!data.title || !data.body) {
    return res.error(400)
  }

  // have urls like:  /post/today-i-ate-soup
  data.date = Date.now()
  data.id = makeId(data.title)

  var clean = { id: data.id
              , body: data.body
              , title: data.title
              , date: data.date }
  putPost(clean, function (er, data) {
    if (er) return res.error(er)

    res.setHeader('content-type', 'text/html')
    res.end('<html><b>Cool story.  Server said: '
           +JSON.stringify(data))
  })
}

// TODO: replace this, please
function makeId (title) {
  return title.replace(/[^\w]+/g, '-')
              .toLowerCase()
              .replace(/^-+|-+$/g, '')
              .replace(/^$/, 'cool-story-bro-' + Date.now())
}

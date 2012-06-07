module.exports = allPosts

var path = require("path")
var posts = path.resolve(__dirname, "posts.json")
var fs = require("fs")

var cache = null

fs.watch(posts, function () {
  allPosts(true, function () {})
})

var marked = require('marked')

function allPosts (force, cb) {
  if (typeof cb !== "function") cb = force, force = false
  if (!force && cache) return cb(null, cache)

  fs.readFile(posts, "utf8", function (er, data) {
    if (er) return cb(er)
    try {
      data = JSON.parse(data)
      Object.keys(data).forEach(function (id) {
        data[id].html = marked(data[id].body)
      })
    } catch (er) {
      return cb(er)
    }
    return cb(null, cache = data)
  });
}

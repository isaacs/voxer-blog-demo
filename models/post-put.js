module.exports = postPut

var allPosts = require("./all-posts.js")

var fs = require("fs")
var path = require("path")
var file = path.resolve(__dirname, "posts.json")

function postPut (post, cb) {
  allPosts(function (er, data) {
    if (er) return cb(er)
    data[post.id] = post
    fs.writeFile(file, JSON.stringify(data), "utf8", cb)
  })
}

module.exports = post

var allPosts = require("./all-posts.js")

var marked = require('marked')

function post (id, cb) {
  allPosts(function (er, data) {
    if (!data) return cb(er, data)
    cb(er, data[id])
  })
}

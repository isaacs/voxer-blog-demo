// list handler

module.exports = list

var allPosts = require("../models/all-posts.js")

function list (req, res) {
  allPosts(function (er, data) {
    if (er) return res.error(er);
    // post =
    // { date: ...
    // , title: ...
    // , id: ...
    // , body: ... }

    data = Object.keys(data).map(function (id) {
      return data[id]
    }).sort(function (a, b) {
      return a.date > b.date ? -1 : 1
    })

    res.template('list.ejs', {posts: data, title: 'Cool Stories'})
  })
}

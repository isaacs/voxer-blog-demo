module.exports = newPost

function newPost (req, res) {
  if (req.method !== "GET" && req.method !== "HEAD") {
    return res.error(405)
  }

  res.template('post-form.ejs', { title: 'Awesomesauce' })
}

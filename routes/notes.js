const dbcon = require('../utils/database');

var express = require('express');
var router = express.Router();

router.get('/new', function(req, res, next) {
  if (!req.session.isPopulated) {
    res.redirect('/login');
  }
  res.render('new_paste', { users: req.session.username });
});

router.post('/new', function(req, res, next) {
  if (!req.session.isPopulated) {
    res.redirect('/login');
  }
  let title = req.body.paste_title;
  let content = req.body.paste_content;
  let author = req.session.username;
  let visible = req.body.paste_visibility;

  let sql = `INSERT INTO tbl_paste(title, content, visibility, author_id)
    VALUES (?, ?, ?, 
      (SELECT id FROM tbl_user WHERE username = ?)
    )`;
  dbcon.query(sql, [title, content, visible, author], 
    function(err, rows, fields){
      if (err) return next(err);
      let dataId = rows.insertId;
      res.redirect(`/view/${dataId}`);
    }
  )
})

router.get('/view/:id', function(req, res, next) {
  let pasteId = req.params.id;
  let sql = `SELECT p.title, p.content, u.username AS author, p.visibility
    FROM tbl_paste AS p
    LEFT JOIN tbl_user AS u ON p.author_id = u.id
    WHERE p.id = ?`;
  dbcon.query(sql, pasteId, 
    function(err, rows, fields){
      if (err) return next(err);
      if (rows.length != 1) return res.sendStatus(404);
      let paste = rows[0];
      if (paste.author != req.session.username && paste.visibility != 1) paste.content = "This is private paste. Only the owner can read.";
      res.render('view_paste', { users: req.session.username, paste: paste });
    }
  )
});

module.exports = router;

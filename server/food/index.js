module.exports = function(app) {

  app.post('/api/1.0/food/test', function(req, res) {
    console.log(JSON.stringify(req.body, null, 2))
    res.send({
      bye: 'now'
    });
  });

};
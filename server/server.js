const express = require('express');
const fs = require('fs');
const cart = require('./cartRouter');
const app = express();

app.use(express.json());
app.use('/', express.static('../public'));
app.use('/api/cart', cart);

app.get('/api/catalog', (req, res) => {
  fs.readFile('./db/catalog.json', 'utf-8', (err, data) => {
    if (err) {
      res.sendStatus(404, JSON.stringify({result: 0, text: err}));
    } else {
      res.send(data);
    }
  });
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});


// app.get()
// app.post()
// app.put()
// app.delete()

const express = require('express');
const app = express();

const PORT = process.env.PORT || 8080;
const cors = require('cors');
const {CLIENT_ORIGIN} = require('./config');

app.use(
    cors({
        origin: CLIENT_ORIGIN
    })
);

app.get('/api/*', (req, res) => {
  res.json({ok: true});
});

app.post('/api/:id', (req,res) => {
  res.json({ok:true})
    .then()
    .catch(err);
});
app.put('/api/:id', (req.,res) => {

});

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));

module.exports = app;
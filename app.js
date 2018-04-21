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
    .then(() => {
        res.new(SlamCrownUser)
        .status(200);
        })
    .catch(err);
});
app.put('/api/:id', (req,res) => {
        try {
            SlamCrownUser.findOneAndUpdate(
              {EmailAddress: req.body.EmailAddress},
              req.body,
              {new: true},
              res.status(201),
              (err, SlamCrownUser) => {
                if (err) return res.status(500).send(err);
                res.send(SlamCrownUser);
              })
        } catch (e) {
            res.status(500).json({ message: 'Internal server error, account cannot be updated' });
        }
    })
});

app.delete('/api/', jwtAuth, (req, res) => {
    console.log(req);
    try {
        SlamCrownUser.deleteOne({EmailAddress: req.body.EmailAddress}).then(users => {
            res.status(202).json({ message: "Your slam crown account was deleted"})
        })
    } catch (e) {
        res.status(500).json({ message: 'Internal server error, account cannot be deleted' });
    }
});

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));

module.exports = app;
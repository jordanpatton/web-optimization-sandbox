const path = require('path');
const express = require('express');

const userFixtures = require('./fixtures/users.json');

const PORT = process.env.PORT || 3000;
const app = express();

// =======================================================================================
// express
// =======================================================================================
// middleware
app.use('/dist', express.static(path.join(__dirname, 'dist')));

// default routes
app.get('/', (_req, res, _next) => res.send('OK'));
app.get('/api', (_req, res, _next) => res.json({}));

// users routes
app.get('/api/users', (req, res, _next) =>
    req.query.userId
    ? res.json({users: userFixtures.filter(val => String(val.id) === String(req.query.userId))})
    : res.json({users: userFixtures.slice(0, 19)})
);

// 404
app.get('*', (_req, res, _next) => res.status(404).send('Not Found'));

app.listen(PORT, () => {
    console.log(`express listening on port ${PORT}...`);
});

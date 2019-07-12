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
app.get('/api/users', (_req, res, _next) => res.json({ users: [
    ...userFixtures,
    ...userFixtures.map(v => ({ ...v, id: v.id + 1000 })),
    ...userFixtures.map(v => ({ ...v, id: v.id + 2000 })),
    ...userFixtures.map(v => ({ ...v, id: v.id + 3000 })),
    ...userFixtures.map(v => ({ ...v, id: v.id + 4000 })),
    ...userFixtures.map(v => ({ ...v, id: v.id + 5000 })),
    ...userFixtures.map(v => ({ ...v, id: v.id + 6000 })),
    ...userFixtures.map(v => ({ ...v, id: v.id + 7000 })),
    ...userFixtures.map(v => ({ ...v, id: v.id + 8000 })),
    ...userFixtures.map(v => ({ ...v, id: v.id + 9000 })),
] }));

// 404
app.get('*', (_req, res, _next) => res.status(404).send('Not Found'));

app.listen(PORT, () => {
    console.log(`express listening on port ${PORT}...`);
});

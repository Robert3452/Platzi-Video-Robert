import express from 'express';
import supertest from 'supertest';

function testServer(route: any) {
    const app = express();
    app.use(express.json());
    app.use('/api/movies',route);
    return supertest(app);
}

export default testServer;
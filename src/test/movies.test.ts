import assert from 'assert'; //verificar la comparacion en los tests
import proxyquire from 'proxyquire';//permite elegir en lugar de traer el paquete real nos trae un mock
import { moviesMock, MoviesServiceMock, getMoviesMock } from '../mocks/movies';//importamos los mocks
import movieRoutes from '../routes/movies.routes'
import testServer from './testServer';

describe('routes - movies', function () {
    const route = proxyquire('../routes/movies.routes', {
        '../services/movies.services': getMoviesMock
    });
    const request = testServer(route.default);
    describe('GET /movies', function () {
        it('should respond with status 200', function (done) {
            request.get('/api/movies').expect(200, done);
        });

        it('should respond with the list of movies', function (done) {
            request.get('/api/movies').end((err, res) => {
                assert.deepEqual(res.body, {
                    data: moviesMock,
                    message: 'movies listed'
                });

                done();
            });
        });
    });
});
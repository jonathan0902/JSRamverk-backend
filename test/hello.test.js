process.env.NODE_ENV = 'test';

const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../app.js');

chai.should();

chai.use(chaiHttp);

describe('About me', () => {
    describe('GET /', () => {
        it('200 HAPPY PATH', (done) => {
            chai.request(server)
                .get("/")
                .end((err, res) => {
                    if (err) {
                        done(err);
                    }

                    res.should.have.status(200);
                    done();
                });
        });
    });
});

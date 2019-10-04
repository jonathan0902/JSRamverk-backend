process.env.NODE_ENV = 'test';

const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../app.js');
let data = "";

chai.should();

chai.use(chaiHttp);

describe('Create Account', () => {
    describe('Post /register', () => {
        it('200 HAPPY PATH', (done) => {
            chai.request(server)
                .post("/register")
                .send({
                    email: "test@test.se",
                    username: "test",
                    password: "test",
                    birthday: "2018-02-14",
                })
                .end((err, res) => {
                    res.should.have.status(200);

                    done();
                });
        });
    });
});

describe('Login Account', () => {
    describe('Post /Login', () => {
        it('200 HAPPY PATH', (done) => {
            chai.request(server)
                .post("/login")
                .send({
                    email: "test@test.se",
                    password: "test",
                })
                .end((err, res) => {
                    res.should.have.status(200);
                    data = res.body.token;
                    done();
                });
        });
    });
});

describe('Login Account', () => {
    describe('Post /Login', () => {
        it('200 HAPPY PATH', (done) => {
            chai.request(server)
                .post("/login")
                .send({
                    email: "tsdadsat.se",
                    password: "test",
                })
                .end((err, res) => {
                    res.should.have.status(400);
                    done();
                });
        });
    });
});

describe('Report Add', () => {
    describe('Add /Report', () => {
        it('200 HAPPY PATH', (done) => {
            chai.request(server)
                .post("/reports/add")
                .send({
                    tx: ''
                })
                .set('x-access-token', data)
                .end((err, res) => {
                    res.should.have.status(200);
                    done();
                });
        });
    });
});

describe('Report Update', () => {
    describe('Update /Report', () => {
        it('200 HAPPY PATH', (done) => {
            chai.request(server)
                .post("/reports/update")
                .send({
                    id: 1,
                    tx: 'Hello',
                })
                .set('x-access-token', data)
                .end((err, res) => {
                    res.should.have.status(200);
                    done();
                });
        });
    });
});

describe('Reports Get', () => {
    describe('GET /', () => {
        it('200 HAPPY PATH', (done) => {
            chai.request(server)
                .get("/reports")
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

describe('Reports Get', () => {
    describe('GET /', () => {
        it('200 HAPPY PATH', (done) => {
            chai.request(server)
                .get("/reports/auth")
                .set('x-access-token', data)
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

describe('Reports Get', () => {
    describe('GET /', () => {
        it('200 HAPPY PATH', (done) => {
            chai.request(server)
                .get("/reports/week//1")
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

const chai = require('chai'),
    expect = chai.expect,
    path = require('path'),
    app = require(path.resolve('server')),
    request = require('request'),
    // foodCancel = require(path.resolve('src/js/foodCancel')),
    // orderModule = require(path.resolve('src/js/module')).orderModule,
    chaiHttp = require('chai-http');

chai.use(chaiHttp);

xdescribe('testing true not equal false', () => {
    it('should return not equal to false', () => {
        expect(true).not.equal(false);
    })
})

xdescribe('food cancellation module test using request', () => {
    // before((done) => {
    //     app.listen(8080);
    //     done();
    // });
    it('should return status code 200', () => {
        let url = 'http://localhost:8080/api/foodCancel?digits="1234"',
            expectedValue = 200;
        request.get(url, (err, res, body) => {
            expect(res.statusCode).to.equal(expectedValue);
        })
    })
    it('should return status code 404', (done) => {
        let url = 'http://localhost:8080/api/foodCancel?digits="124"',
            expectedValue = 404;
        request.get(url, (err, res, body) => {
            expect(res.statusCode).to.equal(expectedValue);
            done();
        })
    })
    it('should return the orderid', (done) => {
        let url = 'http://localhost:8080/api/foodCancel?digits="1234"',
            expectedValue = '1234';
        request.get(url, (err, res, body) => {
            expect(body).to.equal(expectedValue);
            done();
        })
    })
    after((done) => {
        app.listen().close();
        done();
    })
})

xdescribe('food cancellation module test using chai-http', () => {

    it('should return status code 200', (done) => {
        let url = '/api/foodCancel?digits="1234"',
            expectedValue = 200;
        chai.request(app)
            .get(url)
            .end((err, res) => {
                expect(res).to.have.status(expectedValue);
                done();
            })
    })
    it('should return status code 404', (done) => {
        let url = '/api/foodCancel?digits="123"',
            expectedValue = 404;
        chai.request(app)
            .get(url)
            .end((err, res) => {
                expect(res).to.have.status(expectedValue);
                done();
            })
    })
    it('should return the orderid', (done) => {
        let url = '/api/foodCancel?digits="1234"',
            expectedValue = '1234';
        chai.request(app)
            .get(url)
            .end((err, res) => {
                expect(res.text).to.equal(expectedValue);
                done();
            })
    })
    it('should return the orderid', (done) => {
        let url = '/api/foodCancel?digits="123"',
            expectedValue = 'Not Found';
        chai.request(app)
            .get(url)
            .end((err, res) => {
                expect(res.text).to.equal(expectedValue);
                done();
            })
    })
})
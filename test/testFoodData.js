const chai = require('chai'),
    expect = chai.expect,
    path = require('path'),
    app = require(path.resolve('server')),
    // foodCancel = require(path.resolve('src/js/foodCancel')),
    // orderModule = require(path.resolve('src/js/module')).orderModule,
    chaiHttp = require('chai-http');

chai.use(chaiHttp);

describe('food data module test', () => {
    it('should return status code 200', (done) => {
        let url = '/api/foodData?digits="1"',
            expectedValue = 200;
        chai.request(app)
            .get(url)
            .end((err, res) => {
                expect(res).to.have.status(expectedValue);
                done();
            })
    })
    it('should return status code 404', (done) => {
        let url = '/api/foodData',
            expectedValue = 404;
        chai.request(app)
            .get(url)
            .end((err, res) => {
                expect(res).to.have.status(expectedValue);
                done();
            })
    })
    it('should return status code 404', (done) => {
        let url = '/api/foodData?digits="111"',
            expectedValue = 404;
        chai.request(app)
            .get(url)
            .end((err, res) => {
                expect(res).to.have.status(expectedValue);
                done();
            })
    })
})
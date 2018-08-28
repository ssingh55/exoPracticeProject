const chai = require('chai'),
    expect = chai.expect,
    path = require('path'),
    app = require(path.resolve('server')),
    chaiHttp = require('chai-http');

chai.use(chaiHttp);

xdescribe('verify pincode module test', () => {
    it('should return status code 200', (done) => {
        let url = '/api/verifyPin?digits="560084"',
            expectedValue = 200;
        chai.request(app)
            .get(url)
            .end((err, res) => {
                expect(res).to.have.status(expectedValue);
                done();
            })
    })
    it('should return status code 404', (done) => {
        let url = '/api/verifyPin?digits="56084"',
            expectedValue = 404;
        chai.request(app)
            .get(url)
            .end((err, res) => {
                expect(res).to.have.status(expectedValue);
                done();
            })
    })
    it('should return the pincode', (done) => {
        let url = '/api/verifyPin?digits="560084"',
            expectedValue = '560084';
        chai.request(app)
            .get(url)
            .end((err, res) => {
                console.log(res.text)
                expect(res.text).contain(expectedValue);
                done();
            })
    })
})
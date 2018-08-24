const chai = require('chai'),
    expect = chai.expect,
    path = require('path'),
    app = require(path.resolve('server')),
    // foodCancel = require(path.resolve('src/js/foodCancel')),
    // orderModule = require(path.resolve('src/js/module')).orderModule,
    chaiHttp = require('chai-http');

chai.use(chaiHttp);

xdescribe('food type module test', () => {
    it('should return status code 200', (done) => {
        let url = '/api/foodType',
            expectedValue = 200;
        chai.request(app)
            .get(url)
            .end((err, res) => {
                expect(res).to.have.status(expectedValue);
                done();
            })
    })
    xit('should return status code 404', (done) => {
        let url = '/api/foodType?foodName=1',
            expectedValue = 404;
        chai.request(app)
            .get(url)
            .end((err, res) => {
                expect(res).to.have.status(expectedValue);
                done();
            })
    })
    it('should return error msg', (done) => {
        let url = '/api/foodType?foodName=1',
            expectedValue = 'Error in connection';
        chai.request(app)
            .get(url)
            .end((err, res) => {
                expect(res.text).contain(expectedValue);
                done();
            })
    })
    it('should return speech msg', (done) => {
        let url = '/api/foodType',
            expectedValue = 'Press 0 for vegburger';
        chai.request(app)
            .get(url)
            .end((err, res) => {
                console.log(res.text)
                expect(res.text).contain(expectedValue);
                done();
            })
    })
})
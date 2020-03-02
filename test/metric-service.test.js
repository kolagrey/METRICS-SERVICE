//During the test the env variable is set to test
process.env.NODE_ENV = 'test';

const server = require('../index');
const { collection } = require('../src/db');

//Require the dev-dependencies
const chai = require('chai');
const chaiHttp = require('chai-http');
const should = chai.should();

chai.use(chaiHttp);
//Main test block
describe('Metric Service', () => {

    /*
    * Test the /POST route
    */
    describe('/POST metric', () => {
        // Test variables
        const key = 'active_visitors';
        const value = {
            one: 10,
            two: 30
        };

        it(`it should POST a metric with key - ${key} with value of ${value.one}`, (done) => {
            // test payload
            const payload = {
                value: value.one
            };
            chai.request(server)
                .post(`/metric/${key}`)
                .send(payload)
                .end((error, res) => {
                    if (error) {
                        done(error);
                    }
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    done();
                });
        });


        it(`it should POST a metric with key - ${key} with value of ${value.two}`, (done) => {
            // Test payload
            let payload = {
                value: value.two
            };
            chai.request(server)
                .post(`/metric/${key}`)
                .send(payload)
                .end((error, res) => {
                    if (error) {
                        done(error);
                    }
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    done();
                });
        });

    });


    /*
    * Test the /GET route - returns an object with a key titled "value" of type number
    * { value: Number } 
    */
    describe('/GET sum of metrics entries for a given key', () => {
        // Test variables
        const key = 'active_visitors';
        const expectedResult = 40;
        it(`it should GET sum of all entry with the last hour for given key - ${key} and return 40`, (done) => {
            chai.request(server)
                .get(`/metric/${key}/sum`)
                .end((error, res) => {
                    if (error) {
                        done(error);
                    }
                    res.should.have.status(200);
                    res.body.value.should.be.a('number');
                    res.body.value.should.be.eql(expectedResult)
                    done();
                });
        });

    });

});
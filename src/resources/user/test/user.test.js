//During the test the env variable is set to test
process.env.NODE_ENV = "test"

const { expect } = require("chai")
//Require the dev-dependencies
let chai = require("chai")
let chaiHttp = require("chai-http")
let server = require("../../../app")
let should = chai.should()

chai.use(chaiHttp)

describe("GET request on /user/ route", () => {
  /*
   * Test the GET /user route
   */
  describe("/GET /user", () => {
    it("it should be a user object", (done) => {
      chai
        .request(server)
        .get("/user")
        .end((err, res) => {
          res.should.have.status(200)
          res.body.should.have.own.property("email")
          res.body.should.have.own.property("password")
          res.body.should.have.own.property("links")
          done()
        })
    })
  })
  /*
   * Test the POST /user route
   */
  describe("/POST /user", () => {
    //   let u1 = null;
    it("it should add the a new user object to database", (done) => {
      chai
        .request(server)
        .post("/user")
        .end((err, res) => {
          res.should.have.status(200)
          res.body.should.have.own.property("email")
          res.body.should.have.own.property("password")
          res.body.should.have.own.property("links")
          done()
        })
    })
  })
})

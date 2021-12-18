//During the test the env variable is set to test
process.env.NODE_ENV = "test"

const { expect } = require("chai")
//Require the dev-dependencies
let chai = require("chai")
let chaiHttp = require("chai-http")
let server = require("../app")
let should = chai.should()

chai.use(chaiHttp)

describe("GET request on index route", () => {
  /*
   * Test the GET / route
   */
  describe("/GET /", () => {
    it("it should print hello world", (done) => {
      chai
        .request(server)
        .get("/")
        .end((err, res) => {
          res.should.have.status(200)
          res.body.should.be.eql({ message: "hello" })
          done()
        })
    })
  })
})

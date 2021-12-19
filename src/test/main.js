//During the test the env variable is set to test
process.env.NODE_ENV = "test"

const { expect } = require("chai")
//Require the dev-dependencies
let chai = require("chai")
let chaiHttp = require("chai-http")
let server = require("../app")
const { User } = require("../resources/user/user.model")
let should = chai.should()

chai.use(chaiHttp)

describe("Database setup", () => {
  describe("Empty the database", () => {
    it("it should delete all the user data in database", (done) => {
      User.deleteMany({}, async (err, data) => {
        data.should.have.own.property("deletedCount")
        done()
      })
    })
  })
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

  /*
   * Test the GET /users route with empty database
   */
  describe("/GET /users", () => {
    it("it should be an empty array", (done) => {
      chai
        .request(server)
        .get("/users")
        .end((err, res) => {
          res.should.have.status(200)
          res.body.should.be.a("array")
          res.body.length.should.be.eql(0)
          done()
        })
    })
  })
  /*
   * Test the POST /users route
   */
  describe("/POST /users", () => {
    const u1 = { email: "five@gmail.com", password: "oneHasP@assw0rd" }
    it("it should add the a new user object to database", (done) => {
      chai
        .request(server)
        .post("/users")
        .send(u1)
        .end((err, res) => {
          if (err) done(err)
          res.should.have.status(201)
          res.body.should.have.own.property("email")
          res.body.should.have.own.property("password")
          res.body.should.have.own.property("links")
          done()
        })
    })
  })
  /*
   * Test the GET /users route
   */
  describe("/GET /users", () => {
    it("it should be an array with a single user object", (done) => {
      chai
        .request(server)
        .get("/users")
        .end((err, res) => {
          res.should.have.status(200)
          res.body.should.be.a("array")
          res.body[0].should.have.own.property("email")
          res.body[0].should.have.own.property("password")
          res.body[0].should.have.own.property("links")
          done()
        })
    })
  })
})

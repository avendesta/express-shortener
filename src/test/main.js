//During the test the env variable is set to test
process.env.NODE_ENV = "test"

const { expect } = require("chai")
//Require the dev-dependencies
let chai = require("chai")
let chaiHttp = require("chai-http")
let server = require("../app")
const { User } = require("../resources/user/user.model")
const { Link } = require("../resources/link/link.model")
let should = chai.should()

chai.use(chaiHttp)

describe("users", () => {
  /*
   * Clear the users database
   */
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
   * Test the GET admin/users route with empty database
   */
  describe("/GET admin/users", () => {
    const token =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZG1pbiI6dHJ1ZSwiZW1haWwiOiJtaWx5QGpvaG5zLmNvbSIsImlhdCI6MTYzOTk4MTM0NH0.m3GvyPpu5U7dvrvE21VendQbgLdHYLs4S9Nqsv_OrG8"
    it("it should be an empty array", (done) => {
      chai
        .request(server)
        .get("/admin/users")
        .set({ Authorization: `Bearer ${token}` })
        .end((err, res) => {
          res.should.have.status(200)
          res.body.should.be.a("array")
          res.body.length.should.be.eql(0)
          done()
        })
    })
  })
  /*
   * Test the POST admin/users route
   */
  describe("/POST /admin/users", () => {
    const u1 = { email: "five@gmail.com", password: "oneHasP@assw0rd" }
    const token =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZG1pbiI6dHJ1ZSwiZW1haWwiOiJtaWx5QGpvaG5zLmNvbSIsImlhdCI6MTYzOTk4MTM0NH0.m3GvyPpu5U7dvrvE21VendQbgLdHYLs4S9Nqsv_OrG8"
    it("it should add the a new user object to database", (done) => {
      chai
        .request(server)
        .post("/admin/users")
        .set({ Authorization: `Bearer ${token}` })
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
   * Test the GET admin/users route
   */
  describe("/GET /admin/users", () => {
    const token =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZG1pbiI6dHJ1ZSwiZW1haWwiOiJtaWx5QGpvaG5zLmNvbSIsImlhdCI6MTYzOTk4MTM0NH0.m3GvyPpu5U7dvrvE21VendQbgLdHYLs4S9Nqsv_OrG8"
    it("it should be an array with a single user object", (done) => {
      chai
        .request(server)
        .get("/admin/users")
        .set({ Authorization: `Bearer ${token}` })
        .end((err, res) => {
          res.should.have.status(200)
          res.body.should.be.a("array")
          res.body.length.should.be.eql(1)
          res.body[0].should.have.own.property("email")
          res.body[0].should.have.own.property("password")
          res.body[0].should.have.own.property("links")
          done()
        })
    })
  })
})

describe("links", () => {
  /*
   * Clear the links database
   */
  describe("Empty the database", () => {
    it("it should delete all the link data in database", (done) => {
      Link.deleteMany({}, async (err, data) => {
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
   * Test the GET /links route with empty database
   */
  describe("/GET /links", () => {
    const token =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImZpdmVAZ21haWwuY29tIiwicGFzc3dvcmQiOiJvbmVIYXNQQGFzc3cwcmQiLCJpYXQiOjE2Mzk5NzAzNDJ9.uDtc9_UkCphGxP3jwOk3x6yeLkWNy-lyIiAKULYuMSU"
    it("it should be an empty array", (done) => {
      chai
        .request(server)
        .get("/links")
        .set({ Authorization: `Bearer ${token}` })
        .end((err, res) => {
          res.should.have.status(200)
          res.body.should.be.a("array")
          res.body.length.should.be.eql(0)
          done()
        })
    })
  })
  /*
   * Test the POST /links route
   */
  describe("/POST /links", async () => {
    const l1 = {
      shortUrl: "ABCDEF",
      longUrl: "https://www.google.com/search?q=robots",
      email: "five@gmail.com",
      // createdBy: await User.findOne().exec(),
    }
    const token =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImZpdmVAZ21haWwuY29tIiwiaWF0IjoxNjM5OTY5MDUwfQ.a7W85YegMwJBJjH3JJ42emoRTZ61ENIvHriff3VSvFk"
    it("it should add the a new link object to database", (done) => {
      chai
        .request(server)
        .post("/links")
        .set({ Authorization: `Bearer ${token}` })
        .send(l1)
        .end((err, res) => {
          if (err) done(err)
          res.should.have.status(201)
          res.body.should.have.own.property("shortUrl")
          res.body.should.have.own.property("longUrl")
          res.body.should.have.own.property("createdBy")
          res.body.should.have.own.property("createdAt")
          done()
        })
    })
  })
  /*
   * Test the GET /links route
   */
  describe("/GET /links", () => {
    const token =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImZpdmVAZ21haWwuY29tIiwiaWF0IjoxNjM5OTY5MDUwfQ.a7W85YegMwJBJjH3JJ42emoRTZ61ENIvHriff3VSvFk"
    it("it should be an array with a single link object", (done) => {
      chai
        .request(server)
        .get("/links")
        .set({ Authorization: `Bearer ${token}` })
        .end((err, res) => {
          res.should.have.status(200)
          res.body.should.be.a("array")
          res.body.length.should.be.eql(1)
          res.body[0].should.have.own.property("shortUrl")
          res.body[0].should.have.own.property("longUrl")
          res.body[0].should.have.own.property("createdBy")
          res.body[0].should.have.own.property("createdAt")
          done()
        })
    })
  })
})

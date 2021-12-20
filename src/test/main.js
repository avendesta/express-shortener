//During the test the env variable is set to test
process.env.NODE_ENV = "test"

const { expect } = require("chai")
//Require the dev-dependencies
const chai = require("chai")
const chaiHttp = require("chai-http")
const server = require("../app")
const { User } = require("../resources/user/user.model")
const { Link } = require("../resources/link/link.model")
const config = require("./lib/config")

const should = chai.should()

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
    const token = config.token1
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
    const token = config.token1
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
    const token = config.token1
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
   * Test the GET /admin/links route with empty database
   */
  describe("/GET /admin/links", () => {
    const token = config.token2
    it("it should be an empty array", (done) => {
      chai
        .request(server)
        .get("/admin/links")
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
   * Test the POST /admin/links route
   */
  describe("/POST /admin/links", async () => {
    const l1 = {
      shortUrl: "ABCDEF",
      longUrl: "https://www.google.com/search?q=robots",
      email: "five@gmail.com",
      // createdBy: await User.findOne().exec(),
    }
    const token = config.token3
    it("it should add the a new link object to database", (done) => {
      chai
        .request(server)
        .post("/admin/links")
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
   * Test the GET /admin/links route
   */
  describe("/GET /admin/links", () => {
    const token = config.token3
    it("it should be an array with a single link object", (done) => {
      chai
        .request(server)
        .get("/admin/links")
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

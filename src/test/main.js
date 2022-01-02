const config = require("./lib/config")
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
   * Test the GET /users route with empty database
   */
  describe("/GET /users", () => {
    const token = config.tokens[0]
    it("it should be an empty array", (done) => {
      chai
        .request(server)
        .get("/users")
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
   * Test the POST /users route, creating an admin
   */
  describe("/POST /users", () => {
    const u1 = {
      email: "admin@admin.admin",
      password: "admin's strong password",
      admin: true,
    }
    const token = config.tokens[0]
    it("it should add a new admin user object to database", (done) => {
      chai
        .request(server)
        .post("/users")
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
   * Test the POST /users route, a normal user
   */
  describe("/POST /users", () => {
    const u1 = { email: "five@gmail.com", password: "oneHasP@assw0rd" }
    const token = config.tokens[0]
    it("it should add the a new user object to database", (done) => {
      chai
        .request(server)
        .post("/users")
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
   * Test the POST /users route, creating a second non-admin user
   */
  describe("/POST /users", () => {
    const u1 = { email: "two@gmail.com", password: "twoHasP@assw0rd" }
    const token = config.tokens[0]
    it("it should add the a second non-admin user object to database", (done) => {
      chai
        .request(server)
        .post("/users")
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
   * Test the POST /users route with invalid jwt token
   */
  describe("/POST /users with invalid token", () => {
    const u1 = { email: "five@gmail.com", password: "oneHasP@assw0rd" }
    const token = config.invalid_tokens[0]
    it("it should add the a new user object to database", (done) => {
      chai
        .request(server)
        .post("/users")
        .set({ Authorization: `Bearer ${token}` })
        .send(u1)
        .end((err, res) => {
          if (err) done(err)
          res.should.have.status(401)
          res.body.should.have.own.property("error")
          done()
        })
    })
  })
  /*
   * Test the GET /users route
   */
  describe("/GET /users", () => {
    const token = config.tokens[0]
    it("it should be an array with a single user object", (done) => {
      chai
        .request(server)
        .get("/users")
        .set({ Authorization: `Bearer ${token}` })
        .end((err, res) => {
          res.should.have.status(200)
          res.body.should.be.a("array")
          res.body.length.should.be.eql(3)
          res.body[0].should.have.own.property("email")
          res.body[0].should.have.own.property("password")
          res.body[0].should.have.own.property("links")
          res.body[1].should.have.own.property("email")
          res.body[1].should.have.own.property("password")
          res.body[1].should.have.own.property("links")
          res.body[2].should.have.own.property("email")
          res.body[2].should.have.own.property("password")
          res.body[2].should.have.own.property("links")
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
    const token = config.tokens[1]
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
    }
    const token = config.tokens[1]
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
   * Test the POST /links route, creating another link
   */
  describe("/POST /links", async () => {
    const l1 = {
      shortUrl: "A4K4KJ02L",
      longUrl:
        "https://stackoverflow.com/questions/37314598/in-express-js-why-does-code-after-res-json-still-execute",
    }
    const token = config.tokens[3]
    it("it should add a second link object to database", (done) => {
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
   * Test the GET /links route when user is not admin
   */
  describe("/GET /links", () => {
    const token = config.tokens[1]
    it("it should be an array with a single link objects", (done) => {
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
  /*
   * Test the GET /links route when user is admin
   */
  describe("/GET /links", () => {
    const token = config.tokens[0]
    it("it should be an array with two link objects", (done) => {
      chai
        .request(server)
        .get("/links")
        .set({ Authorization: `Bearer ${token}` })
        .end((err, res) => {
          res.should.have.status(200)
          res.body.should.be.a("array")
          res.body.length.should.be.eql(2)
          res.body[0].should.have.own.property("shortUrl")
          res.body[0].should.have.own.property("longUrl")
          res.body[0].should.have.own.property("createdBy")
          res.body[0].should.have.own.property("createdAt")
          done()
        })
    })
  })
})

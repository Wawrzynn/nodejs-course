const expect = require("chai").expect;
const sinon = require("sinon");
const User = require("../models/user");
const FeedController = require("../controllers/feed");
const mongoose = require("mongoose");

describe("Auth Controller - Login", function () {
  before(function (done) {
    mongoose
      .connect(
        "mongodb+srv://jedrzejkosakowski:Lewandowski10@nodejs.suz4vyq.mongodb.net/test-feed?retryWrites=true&w=majority"
      )
      .then((result) => {
        const user = new User({
          email: "test@test.com",
          name: "Test",
          posts: [],
          password: "tester",
          _id: "5c0f66b979af55031b34728a",
        });
        return user.save();
      })
      .then(() => {
        done();
      });
  });

  it("should add a created post to the posts of the creator", function () {
    const req = {
      body: {
        title: "Test Post",
        content: "A Test Post",
      },
      file: {
        path: "abc",
      },
      userId: "5c0f66b979af55031b34728a",
    };
    const res = {
      status: function () {
        return this;
      },
      json: function () {},
    };
    FeedController.createPost(req, res, () => {}).then((savedUser) => {
      expect(savedUser).to.have.property("posts");
      expect(savedUser.posts).to.have.length(1);
      done();
    });
  });

  after(function (done) {
    User.deleteMany({})
      .then(() => {
        return mongoose.disconnect();
      })
      .then(() => {
        done();
      });
  });
});

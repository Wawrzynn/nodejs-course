const User = require("../models/user");
const bcrypt = require("bcryptjs");
const validator = require("validator");
const jwt = require("jsonwebtoken");
const Post = require("../models/post");

module.exports = {
  createUser: async function ({ userInput }, req) {
    if (!validator.isEmail(userInput.email)) {
      const error = new Error("Email is invalid.");
      throw error;
    }
    if (
      validator.isEmpty(userInput.password) ||
      !validator.isLength(userInput.password, { min: 5 })
    ) {
      const error = new Error("Password too short!");
      throw error;
    }
    const exisitngUser = await User.findOne({ email: userInput.email });
    if (exisitngUser) {
      const error = new Error("User exists already!");
      throw error;
    }
    const hashedPw = await bcrypt.hash(userInput.password, 12);
    const user = new User({
      email: userInput.email,
      name: userInput.name,
      password: hashedPw,
    });
    const createdUser = await user.save();
    return { ...createdUser._doc, _id: createdUser._id.toString() };
  },
  login: async function ({ email, password }) {
    const user = await User.findOne({ email: email });
    if (!user) {
      const error = new Error("User not found.");
      throw error;
    }
    const isEqual = bcrypt.compare(password, user.password);
    if (!isEqual) {
      const error = new Error("Password is incorrect.");
      throw error;
    }
    const token = jwt.sign(
      {
        userId: user._id.toString(),
        email: user.email,
      },
      "somesupersecret",
      {
        expiresIn: "1h",
      }
    );
    return { token: token, userId: user._id.toString() };
  },
  createPost: async function ({ postInput }, req) {
    if (!req.isAuth) {
      const error = new Error("Not authenticated!");
      throw error;
    }
    const errors = [];
    if (
      validator.isEmpty(postInput.title) ||
      !validator.isLength(postInput.title, { min: 5 })
    ) {
      errors.push({ message: "Title is invalid." });
    }
    if (
      validator.isEmpty(postInput.content) ||
      !validator.isLength(postInput.content, { min: 5 })
    ) {
      errors.push({ message: "Content is invalid." });
    }
    if (errors.length > 0) {
      const error = new Error("Invalid input.");
      throw error;
    }
    const user = await User.findById(req.userId);
    if (!user) {
      const error = new Error("Invalid user.");
      throw error;
    }
    const post = new Post({
      title: postInput.title,
      content: postInput.content,
      imageUrl: postInput.imageUrl,
      creator: user,
    });
    const createdPost = await post.save();
    user.posts.push(createdPost);
    await user.save();
    return {
      ...createdPost._doc,
      _id: createdPost._id.toString(),
      createdAt: createdPost.createdAt.toISOString(),
      updatedAt: createdPost.updatedAt.toISOString(),
    };
  },
  posts: async function (args, req) {
    if (!req.isAuth) {
      const error = new Error("Not authenticated!");
      throw error;
    }
    const totalPosts = await Post.find().countDocuments();
    const posts = await Post.find().sort({ createdAt: -1 }).populate("creator");
    return {
      posts: posts.map((p) => {
        return {
          ...p._doc,
          _id: p._id.toString(),
          createdAt: p.createdAt.toISOString(),
          updatedAt: p.updatedAt.toISOString(),
        };
      }),
      totalPosts: totalPosts,
    };
  },
};

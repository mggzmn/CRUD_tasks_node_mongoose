const express = require("express");
const multer = require("multer");
const User = require("../models/user");
const auth = require("../middleware/auth");

const router = new express.Router();

router.post("/users", async (req, res) => {
  const user = new User(req.body);
  try {
    await user.save();
    const token = await user.generateAuthToken();
    res.status(201).send({ user, token });
  } catch (e) {
    res.sendStatus(400);
  }
});

router.post("/users/login", async (req, res) => {
  try {
    const user = await User.findByCredentials(
      req.body.email,
      req.body.password
    );
    const token = await user.generateAuthToken();
    res.send({ user, token });
  } catch (e) {
    res.sendStatus(400);
  }
});

router.get("/users/me", auth, async (req, res) => {
  res.send(req.user);
});

router.post("/users/logout", auth, async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter((token) => {
      return token.token !== req.token;
    });
    await req.user.save();
    res.send();
  } catch (e) {
    res.sendStatus(500);
  }
});
router.post("/users/logoutAll", auth, async (req, res) => {
  try {
    req.user.tokens = [];
    await req.user.save();
    res.send();
  } catch (e) {
    res.sendStatus(500);
  }
});

/* router.get("/users/:id", async (req, res) => {
  try {
    const _id = req.params.id;
    const user = await User.findById(_id);
    if (!user) {
      return res.sendStatus(404);
    }
    res.send(user);
  } catch (e) {
    res.sendStatus(500);
  }
}); */

router.patch("/users/me", auth, async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ["name", "email", "password", "age"];
  const isValidOperation = updates.every((update) => {
    return allowedUpdates.includes(update);
  });
  if (!isValidOperation) {
    return res.status(400).send({ error: "Invalid" });
  }
  try {
    updates.forEach((update) => {
      req.user[update] = req.body[update];
    });
    await req.user.save();
    res.send(req.user);
  } catch (e) {
    res.sendStatus(400);
  }
});

router.delete("/users/me", auth, async (req, res) => {
  try {
    //const user = await User.findByIdAndDelete(req.user._id);
    await req.user.remove();

    res.send(req.user);
  } catch (e) {
    res.sendStatus(500);
  }
});

const upload = multer({
  dest: "avatars",
  limits: {
    fileSize: 1000000,
  },
  fileFilter(req, file, cb) {
    /* \.(doc|docx)$ regular expression */
    /* endsWith(".pdf") */
    if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
      return cb(new Error("File must be an image"));
    }
    cb(undefined, true);
  },
});

router.post("/users/me/avatar", upload.single("avatar"), async (req, res) => {
  res.send();
});

module.exports = router;

const express = require("express");
const users = express.Router();
const cors = require("cors");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const User = require("../models/User_model");
users.use(cors());

process.env.SECRET_KEY = "secret";

// router.post("/upload", async (req, res) => {
//   const file = req.file;
//   const uploadParams = {
//     Bucket: "equip9-testing",
//     Key: file.originalname,
//     Body: file.buffer,
//   };

//   try {
//     await s3.send(new PutObjectCommand(uploadParams));
//     res.send({
//       msg: `Successfully uploaded ${file.originalname}`,
//     });
//   } catch (error) {
//     console.error("Error uploading file:", error);
//     res.status(500).send({
//       error: "Error uploading file",
//     });
//   }
// });

users.post("/register", (req, res) => {
  const today = new Date();
  const userData = {
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    email: req.body.email,
    password: req.body.password,
    image_key: req.body.key,
  };

  User.findOne({
    where: {
      email: req.body.email,
    },
  })
    //TODO bcrypt
    .then((user) => {
      if (!user) {
        bcrypt.hash(req.body.password, 10, (err, hash) => {
          userData.password = hash;
          User.create(userData)
            .then((user) => {
              res.json({ status: user.email + "Registered!" });
            })
            .catch((err) => {
              res.send("error: " + err);
            });
        });
      } else {
        res.json({ error: "User already exists" });
      }
    })
    .catch((err) => {
      res.send("error: " + err);
    });
});

users.post("/login", (req, res) => {
  User.findOne({
    where: {
      email: req.body.email,
    },
  })
    .then((user) => {
      if (user) {
        if (bcrypt.compareSync(req.body.password, user.password)) {
          let token = jwt.sign(user.dataValues, process.env.SECRET_KEY, {
            expiresIn: 1440,
          });
          res.send(token);
          // console.log("heyyy")
          // const obj = { jwt: token };
          // res.send(obj);
        }
      } else {
        res.status(400).json({ error: "User does not exist" });
      }
    })
    .catch((err) => {
      res.status(400).json({ error: err });
    });
});

users.get("/profile", (req, res) => {
  var decoded = jwt.verify(
    req.headers["authorization"],
    process.env.SECRET_KEY
  );
  console.log(decoded);
  User.findOne({
    where: {
      id: decoded.id,
    },
  })
    .then((user) => {
      if (user) {
        res.json(user);
      } else {
        res.send("User does not exist");
      }
    })
    .catch((err) => {
      res.send("error: " + err);
    });
});

// users.put("/update", (req, res) => {
//   console.log(req.headers["authorization"]);
//   var decoded = jwt.verify(
//     req.headers["authorization"],
//     process.env.SECRET_KEY
//   );

//   User.findOne({
//     where: {
//       id: decoded.id,
//     },
//   });

//   User.update(
//     {
//       first_name: req.body.first_name,
//       last_name: req.body.last_name,
//       email: req.body.email,
//       password: req.body.password,
//     },
//     {
//       where: {
//         id: decoded.id,
//       },
//     }
//   );
// });

module.exports = users;

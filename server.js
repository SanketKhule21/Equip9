var express = require("express");
var AWS = require("aws-sdk");
var cors = require("cors");
var multer = require("multer");
var multerS3 = require("multer-s3");
var bodyParser = require("body-parser");
var app = express();
var port = process.env.PORT || 5000;
var Users = require("./routes/Users");

const myBucket = "equip9-testing";

AWS.config.update({
  accessKeyId: "AKIA3KZVK3RM6V72UAHV",
  secretAccessKey: "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",
  region: "ap-south-1",
});

var s3 = new AWS.S3();

var upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: "equip9-testing",
    metadata: function (req, file, cb) {
      console.log(file);
      cb(null, { fieldName: file.fieldname });
    },
    key: function (req, file, cb) {
      cb(null, Date.now().toString());
    },
  }),
});

app.post("/upload", upload.single("photos"), function (req, res, next) {
  if (!req.file) {
    res.status(400).send("No file uploaded.");
    return;
  }
  req.body.key;
  res.send({
    data: req.file.key,
    msg: "Successfully Uploaded " + req.file.originalname + " file!",
  });
});

app.use(bodyParser.json());
app.use(cors());
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);

app.use("/users", Users);

// AWS Get Start
app.get("/album/:key", (req, res, next) => {
  const key = req.params.key;
  const imageURL = `https://s3.amazonaws.com/${myBucket}/${key}`;

  s3.listObjects({ Bucket: myBucket })
    .promise()
    .then((data) => {
      console.log(data);
      const baseURL = imageURL;
      let urlArr = data.Contents.map((e) => baseURL + e.Key);
      console.log(urlArr);
    })
    .catch((err) => console.log(err));
});

app.get("/album/:key", (req, res, next) => {
  const key = req.params.key;
  const imageURL = `https://s3.amazonaws.com/${myBucket}/${key}`;

  res.redirect(imageURL);
});
// AWS Get End

app.listen(port, function () {
  console.log("Server is running on port: " + port);
});

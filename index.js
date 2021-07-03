const express = require("express");
const swaggerUI = require("swagger-ui-express");
const fileUpload = require("express-fileupload");
const YAML = require("yamljs");
const swaggerJSDocs = YAML.load("./api.yaml");
const app = express();
app.use(express.json());
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerJSDocs));
app.use(fileUpload());

var users = [
  { id: 1, name: "Tom, Cruise" },
  { id: 2, name: "John Cena" },
];

app.get("/string", (req, res) => {
  console.log(req.headers);
  res.status(200).send("Users Route");
});

app.get("/user", (req, res) => {
  res.status(200).send({ id: 1, name: "Tom, Cruise" });
});

app.get("/users", (req, res) => {
  res.status(200).send(users);
});

app.get("/users/:id", (req, res) => {
  res.status(200).send(users.find((x) => x.id === parseInt(req.params.id)));
});

app.post("/create", (req, res) => {
  users = [req.body, ...users];
  res.send(users);
});

app.get("/usersQuery", (req, res) => {
  res.send(users.find((x) => x.id === parseInt(req.query.id)));
});

app.post("/upload", (req, res) => {
  const file = req.files.file;
  let uploadPath = __dirname + "/upload/" + "file" + Date.now() + ".jpg";
  file.mv(uploadPath, (err) => {
    if (err) {
      return res.send(Err);
    }
  });
  res.send(200);
});

app.listen(4000, () => console.log("Up & RUnning"));

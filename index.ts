let app = require("express")();
let HealthProvider = require("./HealthProvider").default;
let Review = require("./Review").default;
const bodyParser = require("body-parser");

app.use(bodyParser.json());

app.post("/providers", async (req, res) => {
  try {
    let createdHealthProvider = await new HealthProvider(req.body).save();
    res.json(createdHealthProvider);
  } catch (e) {
    return res.sendStatus(500);
  }
});

app.get("/providers", async (req, res) => {
  let healthCareProviders = await HealthProvider.get();
  res.json(healthCareProviders);
});

app.get("/providers/:id", async (req, res) => {
    let healthCareProviders = await HealthProvider.getById(req.params.id);
    res.json(healthCareProviders);
  });

  app.get("/providers/:state", async (req, res) => {
    let healthCareProviders = await HealthProvider.getByState(req.params.state);
    res.json(healthCareProviders);
  });

app.post("/reviews", async (req, res) => {
  try {
    let review = await new Review(req.body).save();
    return res.json(review);
  } catch (e) {
    return res.sendStatus(500);
  }
});

app.get("/reviews", async (req, res) => {
  let reviews = await Review.get();
  res.json(reviews);
});

app.get("/:file", async (req, res) => {
  let fileName = req.params.file;
  return res.sendFile(__dirname + "/" + fileName);
});

app.listen(process.env.PORT || 443, () => {
  console.log(`Running on port ${process.env.PORT || 443}`);
});

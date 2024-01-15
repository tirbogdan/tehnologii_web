import express from "express";
import Sequelize from "sequelize";

const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "my.db",
});

let FoodItem = sequelize.define(
  "foodItem",
  {
    name: Sequelize.STRING,
    category: {
      type: Sequelize.STRING,
      validate: {
        len: [3, 10],
      },
      allowNull: false,
    },
    calories: Sequelize.INTEGER,
  },
  {
    timestamps: false,
  }
);

const app = express();
// TODO
app.use(express.json());

app.get("/create", async (req, res) => {
  try {
    await sequelize.sync({ force: true });
    for (let i = 0; i < 10; i++) {
      let foodItem = new FoodItem({
        name: "name " + i,
        category: ["MEAT", "DAIRY", "VEGETABLE"][Math.floor(Math.random() * 3)],
        calories: 30 + i,
      });
      await foodItem.save();
    }
    res.status(201).json({ message: "created" });
  } catch (err) {
    console.warn(err.stack);
    res.status(500).json({ message: "server error" });
  }
});

app.get("/food-items", async (req, res) => {
  try {
    let foodItems = await FoodItem.findAll();
    res.status(200).json(foodItems);
  } catch (err) {
    console.warn(err.stack);
    res.status(500).json({ message: "server error" });
  }
});

app.post("/food-items", async (req, res) => {
  try {
    // TODO
    const payload = req.body;
    if (Object.keys(payload).length === 0 && payload.constructor === Object) {
      throw new Error("body is missing");
    }

    if (
      payload.name === undefined ||
      payload.category === undefined ||
      payload.calories === undefined
    ) {
      throw new Error("malformed request");
    }

    if (payload.calories < 0) {
      throw new Error("calories should be a positive number");
    }

    if (!["MEAT", "DAIRY", "VEGETABLE"].includes(payload.category)) {
      throw new Error("not a valid category");
    }

    let foodItem = new FoodItem({
      name: payload.name,
      category: payload.category,
      calories: payload.calories,
    });
    await foodItem.save();
    res.status(201).json({ message: "created" });
  } catch (err) {
    // TODO
    res.status(400).send({ message: err.message });
  }
});

export default app;

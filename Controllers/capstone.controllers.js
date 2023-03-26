const Capstone = require("../Models/capstone.models");

const postCapstone = (req, res) => {
  try {
    const capstone = req.body;

    let newCapstone = new Capstone(capstone);

    newCapstone.save((err, data) => {
      if (err) {
        return res
          .status(400)
          .send({ message: "Error while create capstone", Error: err });
      }
      res.status(201).send({
        message: "capstone has been created succesfully",
      });
    });
  } catch (error) {
    res.status(500).send({ message: "internal server error", error: "error" });
  }
};

const getCapstone = async (req, res) => {
  try {
    let capstone = await Capstone.find({});
    if (capstone) {
      return res.status(200).send(capstone);
    }
    return res
      .status(400)
      .send({ success: false, message: "Capstone doesnt exist." });
  } catch (error) {
    console.log("Error", error);
    res.status(500).send({ message: "Internal Server Error" });
  }
};

module.exports = { postCapstone, getCapstone };

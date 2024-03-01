const orderDB = require("../model/order");

const controller = {
  async addOrder(req, res) {
    try {
      const { mobile, burger, price, quantity, itemStack } = req.body;
      if (!mobile || !price || !quantity || !itemStack.length)
        return res
          .status(400)
          .json({ status: false, message: "Fill all the fields" });
      const isUserExists = await orderDB.findOne({ mobile });
      const getOrders = await orderDB.find({}).sort({ createdAt: -1 }).limit(1);
      let id = "";
      if (!getOrders?.length) {
        console.log("sam");
        id = "BURG-1";
      } else {
        let burgers = getOrders[0]?.burger[getOrders[0].burger?.length - 1];
        console.log(burgers);
        id = Number(burgers.id.split("-")[1]) + 1;
        id = "BURG-" + id;
      }
      if (isUserExists) {
        const addOrder = await orderDB.updateOne(
          { mobile },
          { $push: { burger: { ...burger, id } } }
        );
        res.status(200).json({ status: true, message: "burger added" });
      } else {
        const addOrder = await orderDB.create({
          mobile,
          burger : {...burger ,id},
          price,
          quantity,
          itemStack,
        });
        res.status(200).json({ status: true, message: "burger added" });
      }
    } catch (error) {
      console.log("Error in adding the data::", error);
      res.status(500).json({ status: false, error });
    }
  },
};

module.exports = controller;

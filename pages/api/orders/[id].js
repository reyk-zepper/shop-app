import mongodb from "@/utils/mongodb";
import Order from "@/models/Order";

export default async function handler(req, res) {
  const {
    method,
    query: { id },
  } = req;
  await mongodb.dbConnect();

  if (method === "GET") {
    try {
      const order = await Order.findById(id);
      res.status(200).json(order);
    } catch (error) {
      res.status(200).json(error);
    }
  }

  // if (method === "PUT") {
  //   try {
  //     const order = await Order.create(req.body);
  //     res.status(201).json(order);
  //   } catch (error) {
  //     res.status(500).json(error);
  //   }
  // }
}

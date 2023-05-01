// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import mongodb from "@/utils/mongodb";
import jsondb from "@/jsondb/products";
import Product from "@/models/Product";

export default async function handler(req, res) {
  await mongodb.dbConnect();
  await Product.deleteMany();
  await Product.insertMany(jsondb.products);
  const products = await Product.find({});
  await mongodb.dbDisconnect();
  res.send(products);
}

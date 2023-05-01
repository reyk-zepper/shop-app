import Link from "next/link";
import Image from "next/image";
import { ListGroup, Button, ListGroupItem } from "react-bootstrap";
import mongodb from "@/utils/mongodb";
import Product from "@/models/Product";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addProducts } from "@/redux/shoppingCartSlice";

export default function ProductPage({ product }) {
  const [amount, setAmount] = useState(1);
  const dispatch = useDispatch();

  const addToCart = () => {
    dispatch(addProducts({ ...product, amount }));
  };

  if (!product) {
    return (
      <div>
        <h2>product not found</h2>
      </div>
    );
  }
  return (
    <div>
      <div>
        <Link href="/">back</Link>
      </div>
      <div className="row row-cols-2 mt-2">
        <div>
          <Image
            className="rounded-3"
            alt={product.name}
            src={product.image}
            width={600}
            height={600}
            layout="responsive"
          />
        </div>

        <div>
          <h1>{product.name}</h1>

          <ListGroup variant="flush">
            <ListGroupItem>
              <h2 className="text-danger">{product.price.toFixed(2)}$</h2>
            </ListGroupItem>
            <ListGroupItem>{product.description}</ListGroupItem>
            <ListGroupItem>
              <input
                type="number"
                className="form-control w-50"
                value={amount}
                min="1"
                max="10"
                onChange={(e) => setAmount(e.target.value)}
              />
            </ListGroupItem>
            <ListGroupItem>
              <div className="row shadow">
                <Button variant="danger" onClick={addToCart}>
                  add to shopping cart
                </Button>
              </div>
            </ListGroupItem>
          </ListGroup>
        </div>
      </div>
    </div>
  );
}

export async function getServerSideProps(context) {
  const url = context.params.url;
  await mongodb.dbConnect();
  const product = await Product.findOne({ url }).lean();
  return {
    props: {
      product: JSON.parse(JSON.stringify(product)),
    },
  };
}

import Link from "next/link";
import Image from "next/image";
import { ListGroup, Button } from "react-bootstrap";
import mongodb from "@/utils/mongodb";
import Product from "@/models/Product";

export default function ProductPage({ product }) {
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
            <ListGroup.Item>
              <h2 className="text-danger">{product.price}$</h2>
            </ListGroup.Item>
            <ListGroup.Item>{product.description}</ListGroup.Item>
            <ListGroup.Item>
              <input
                type="number"
                className="form-control w-50"
                placeholder="1"
                min="1"
                max="10"
              />
            </ListGroup.Item>
            <ListGroup.Item>
              <div className="row shadow">
                <Button variant="danger">add to shopping cart</Button>
              </div>
            </ListGroup.Item>
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

import { useRouter } from "next/router";
import jsondb from "@/jsondb/products";
import Link from "next/link";
import Image from "next/image";
import { ListGroup, Button } from "react-bootstrap";

export default function ProductPage() {
  const router = useRouter();
  const { url } = router.query;
  const product = jsondb.products.find((product) => product.url === url);

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

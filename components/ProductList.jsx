import { Card, Button } from "react-bootstrap";
import Link from "next/link";

export default function ProductList({ products }) {
  return (
    <div>
      <div className="row row-cols-3">
        {products?.map((product) => (
          <div className="mt-3 col" key={product._id}>
            <Card>
              <Link href={`/products/${product.url}`} passHref>
                <Card.Img variant="top" src={product.image} />
              </Link>
              <Card.Body>
                <Card.Title>{product.name}</Card.Title>
                <Card.Text>{product.description}</Card.Text>
                <Card.Text>{product.price}$</Card.Text>
                <Link href={`/products/${product.url}`} passHref>
                  <Button variant="danger">add to shopping cart</Button>
                </Link>
              </Card.Body>
            </Card>
          </div>
        ))}
      </div>
      <br></br>
    </div>
  );
}

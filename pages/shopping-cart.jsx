import { Table, CloseButton, Button, Card } from "react-bootstrap";
import Image from "next/image";

export default function ShoppingCart() {
  return (
    <div>
      <h1>shopping cart</h1>
      <div className="row mt-4">
        <div className="col-9">
          <Table hover responsive>
            <thead>
              <tr>
                <th>Image</th>
                <th>Product</th>
                <th>Quantity</th>
                <th>Price</th>
                <th>
                  <CloseButton disabled />
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <Image
                    src="/images/products/3d-puzzle.jpg"
                    alt="3d puzzle"
                    width={50}
                    height={50}
                  />
                </td>
                <td>3d Puzzle</td>
                <td>1</td>
                <td>10.00</td>
                <td>
                  {" "}
                  <Button className="btn-small">x</Button>{" "}
                </td>
              </tr>
            </tbody>
          </Table>
        </div>
        <div className="col-3 p-2">
          <div className="shadow">
            <Card>
              <Card.Header as="h5">Order Summary</Card.Header>
              <Card.Body className="text-center">
                <Card.Title>10,00 $</Card.Title>
                <Button variant="primary">Checkout</Button>
              </Card.Body>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

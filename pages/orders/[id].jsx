import { Table, CloseButton, Button, Card, Spinner } from "react-bootstrap";
import Image from "next/image";
import { useRouter } from "next/router";

export default function Orders() {
  const router = useRouter();
  const { id } = router.query;

  return (
    <div>
      <h1>Order Status</h1>
      <div className="row mt-4">
        <div className="col-9">
          <Table hover responsive>
            <thead>
              <tr>
                <th>Order</th>
                <th>Customer</th>
                <th>Address</th>
                <th>Status</th>
                <th>
                  <CloseButton disabled />
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{id}</td>
                <td>Hape</td>
                <td>Berlin</td>
                <td>
                  <span>in Progress</span>
                  <Spinner animation="border" variant="success" size="sm" />
                </td>
              </tr>
            </tbody>
          </Table>
        </div>
        <div className="col-3 p2">
          <div className="shadow">
            <Card>
              <Card.Header as="h5">Order Summary</Card.Header>
              <Card.Body className="text-center">
                <Card.Title>10,00 $</Card.Title>
                <Button variant="success disabled">payed</Button>
              </Card.Body>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

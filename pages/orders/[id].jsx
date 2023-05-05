import { Table, CloseButton, Button, Card, Spinner } from "react-bootstrap";
import { useRouter } from "next/router";
import axios from "axios";

export default function Order({ order }) {
  const router = useRouter();
  const { id } = router.query;

  let status;
  switch (order.status) {
    case 0:
      status = "received";
      break;
    case 1:
      status = "in progress";
      break;
    case 2:
      status = "out for delivery";
      break;
    case 3:
      status = "delivered";
      break;
  }

  if (id !== order._id) {
    return (
      <div>
        <h2>Order {id} non-existent</h2>
        <Button variant="primary" onClick={() => router.push("/")}>
          to cart
        </Button>
      </div>
    );
  } else {
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
                  <td>{order.customer}</td>
                  <td>{order.address}</td>
                  <td>
                    <span>{status}</span>
                    {order.status < 3 ? (
                      <Spinner animation="border" variant="success" size="sm" />
                    ) : (
                      <span>✅</span>
                    )}
                  </td>
                </tr>
              </tbody>
            </Table>
            <Table hover responsive>
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Quantity</th>
                </tr>
              </thead>
              <tbody>
                {order.products.map((product) => (
                  <tr key={product._id}>
                    <td>{product.name}</td>
                    <td>{product.quantity}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
          <div className="col-3 p-2">
            <div className="shadow">
              <Card>
                <Card.Header as="h5">Order Summary</Card.Header>
                <Card.Body className="text-center">
                  <Card.Title>{order.count.toFixed(2)}$</Card.Title>
                  {order.payment === 0 ? (
                    <Button variant="danger disabled">open</Button>
                  ) : (
                    <Button variant="success disabled">payed</Button>
                  )}
                </Card.Body>
              </Card>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export async function getServerSideProps({ params }) {
  const response = await axios.get(
    `http://localhost:3000/api/orders/${params.id}`
  );
  console.log(response.data);
  return {
    props: { order: response.data },
  };
}

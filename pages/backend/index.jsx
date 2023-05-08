import { Table, Button, CloseButton } from "react-bootstrap";
import { useRouter } from "next/router";
import axios from "axios";
import Link from "next/link";

export default function Order({ orders }) {
  const router = useRouter();

  const status = ["received", "in progress", "out for delivery", "delivered"];

  const statusUpdate = async (id, status) => {
    try {
      if (status <= 2) {
        await axios.put(`http://localhost:3000/api/orders/` + id, {
          status: status + 1,
        });
        router.reload();
      }
    } catch (error) {
      console.log(error);
    }
  };
  const deleteOrder = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/api/orders/` + id);
      router.reload();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h1>Admin Backend</h1>
      <div className="row mt-4">
        <div className="col-12">
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
            {orders.map((order) => (
              <tbody key={order._id}>
                <tr>
                  <td>
                    <Link href={`/orders/${order._id}`} className="text-danger">
                      {order._id}
                    </Link>
                  </td>
                  <td>{order.customer}</td>
                  <td>{order.address}</td>
                  <td>
                    <Button
                      onClick={() => statusUpdate(order._id, order.status)}
                    >
                      {status[order.status]}
                    </Button>
                  </td>
                  <td>
                    <Button
                      variant="danger"
                      onClick={() => deleteOrder(order._id)}
                    >
                      X
                    </Button>
                  </td>
                </tr>
              </tbody>
            ))}
          </Table>
        </div>
      </div>
    </div>
  );
}

export async function getServerSideProps(context) {
  const myCookie = context.req?.cookies || "";
  if (myCookie.token !== process.env.TOKEN) {
    return {
      redirect: {
        destination: "/backend/login",
        permanent: false,
      },
    };
  }
  const response = await axios.get(`http://localhost:3000/api/orders`);
  console.log(response.data);
  return {
    props: { orders: response.data },
  };
}

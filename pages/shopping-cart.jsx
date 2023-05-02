import { Table, CloseButton, Button, Card } from "react-bootstrap";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";
import { deleteProduct } from "@/redux/shoppingCartSlice";

export default function ShoppingCart() {
  const dispatch = useDispatch();
  const shoppingCart = useSelector((state) => state.shoppingCart);

  const removeProduct = (product) => {
    dispatch(deleteProduct(product));
  };

  return (
    <div>
      {shoppingCart.quantity === 0 ? (
        <>
          <br />
          <p>it's empty!...c'mooon, grab some stuff!!!</p>
        </>
      ) : (
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
                  {shoppingCart.products.map((product) => (
                    <tr key={product._id}>
                      <td>
                        <Image
                          src={product.image}
                          alt={product.name}
                          width={50}
                          height={50}
                        />
                      </td>
                      <td>
                        <Link
                          href={`/products/${product.url}`}
                          className="text-danger"
                        >
                          {product.name}
                        </Link>
                      </td>
                      <td>{product.amount}</td>
                      <td>{(product.price * product.amount).toFixed(2)}</td>
                      <td>
                        <Button
                          className="btn-small"
                          onClick={() => removeProduct(product)}
                        >
                          x
                        </Button>
                      </td>
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
                    <Card.Title>{shoppingCart.total.toFixed(2)}</Card.Title>
                    <Button variant="primary">Checkout</Button>
                  </Card.Body>
                </Card>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

import { Table, CloseButton, Button, Card } from "react-bootstrap";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";
import { deleteProduct, clear } from "@/redux/shoppingCartSlice";
import { useEffect } from "react";
import { useState } from "react";
import {
  PayPalScriptProvider,
  PayPalButtons,
  usePayPalScriptReducer,
} from "@paypal/react-paypal-js";
import axios from "axios";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import { motion } from "framer-motion";

export default function ShoppingCart() {
  const dispatch = useDispatch();
  const shoppingCart = useSelector((state) => state.shoppingCart);
  const clientID =
    "AfxmOKcXoHQSB7PV3ViFcK4n989prr3ickmYqfJYJEXgQFSBSZunjXb6dWUYL42cmxH89YjynxLtI0FO";
  const [checkout, setCheckout] = useState(false);
  const router = useRouter();

  const removeProduct = (product) => {
    dispatch(deleteProduct(product));
    toast.error(product.name + " deleted", {
      position: "top-center",
      autoClose: 3000,
    });
  };

  const amount = shoppingCart.total.toFixed(2);
  const currency = "USD";
  const style = {
    layout: "vertical",
    // height: 30,
  };

  const createOrder = async (data) => {
    try {
      const response = await axios.post(
        "http://localhost:3000/api/orders",
        data
      );
      if (response.status === 201) {
        dispatch(clear());
        router.push(`/orders/${response.data._id}`);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const ButtonWrapper = ({ currency, showSpinner }) => {
    // usePayPalScriptReducer can be use only inside children of PayPalScriptProviders
    // This is the main reason to wrap the PayPalButtons in a new component
    const [{ options, isPending }, dispatch] = usePayPalScriptReducer();

    useEffect(() => {
      dispatch({
        type: "resetOptions",
        value: {
          ...options,
          currency: currency,
        },
      });
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currency, showSpinner]);

    return (
      <>
        {showSpinner && isPending && <div className="spinner" />}
        <PayPalButtons
          style={style}
          disabled={false}
          forceReRender={[amount, currency, style]}
          fundingSource={undefined}
          createOrder={(data, actions) => {
            return actions.order
              .create({
                purchase_units: [
                  {
                    amount: {
                      currency_code: currency,
                      value: amount,
                    },
                  },
                ],
              })
              .then((orderId) => {
                // Your code here after create the order
                return orderId;
              });
          }}
          onApprove={function (data, actions) {
            return actions.order.capture().then(function (details) {
              const customer = details.purchase_units[0].shipping;
              createOrder({
                customer: customer.name.full_name,
                address:
                  customer.address.address_line_1 +
                  ", " +
                  customer.address.admin_area_2,
                count: shoppingCart.total,
                status: 0,
                payment: 1,
                products: shoppingCart.products.map((product) => ({
                  name: product.name,
                  quantity: product.amount,
                })),
              });
            });
          }}
        />
      </>
    );
  };

  return (
    <motion.div
      initial={{ y: -300 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 120 }}
    >
      {shoppingCart.quantity === 0 ? (
        <>
          <br />
          <p>mmmh...looks empty!?</p>
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
                      <td>{(product.price * product.amount).toFixed(2)}$</td>
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
                    <Card.Title>{shoppingCart.total.toFixed(2)}$</Card.Title>
                    {checkout ? (
                      <PayPalScriptProvider
                        options={{
                          "client-id": clientID,
                          components: "buttons",
                          currency: "USD",
                        }}
                      >
                        <ButtonWrapper
                          currency={currency}
                          showSpinner={false}
                        />
                      </PayPalScriptProvider>
                    ) : (
                      <Button
                        variant="primary"
                        onClick={() => setCheckout(true)}
                      >
                        Checkout
                      </Button>
                    )}
                  </Card.Body>
                </Card>
              </div>
            </div>
          </div>
        </div>
      )}
    </motion.div>
  );
}

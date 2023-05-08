import { useState } from "react";
import { useRouter } from "next/router";
import { Form, Button } from "react-bootstrap";

export default function login() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [password, setPassword] = useState(null);
  const [error, setError] = useState(false);

  const login = async () => {
    alert(user + "" + password);
    router.push("/backend");
  };

  return (
    <div>
      <h1>LOGIN</h1>
      <div className="row mt-4">
        <Form>
          <Form.Group className="mb-3" controlId="user">
            <Form.Control
              type="text"
              placeholder="Username"
              onChange={(event) => setUser(event.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="password">
            <Form.Control
              type="password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>
          <Button variant="primary" onClick={login}>
            Login
          </Button>
        </Form>
      </div>
    </div>
  );
}

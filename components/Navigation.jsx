import Link from "next/link";
import Image from "next/image";
import { Badge } from "react-bootstrap";
import { useSelector } from "react-redux";

export default function Navigation() {
  const quantity = useSelector((state) => state.shoppingCart.quantity);

  return (
    <div className="shadow sticky-top p-2 mb-2 bg-secondary">
      <div className="d-flex justify-content-between align-items-center">
        <Link href="/">
          <Image
            alt="logo"
            src={"/pictures/logo.png"}
            width={120}
            height={120}
            priority={true}
          />
        </Link>

        <Link href="/shopping-cart">
          <Image
            alt="shopping-cart"
            src={"/pictures/warenkorb.png"}
            width={60}
            height={60}
          />
          <Badge pill bg="danger" text="light">
            {quantity}
          </Badge>
        </Link>
      </div>
    </div>
  );
}

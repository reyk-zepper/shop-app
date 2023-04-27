import Link from "next/link";
import Image from "next/image";
import { Badge } from "react-bootstrap";

export default function Navigation() {
  return (
    <div className="shadow sticky-top p-2 mb-2 bg-secondary">
      <div className="d-flex justify-content-between align-items-center">
        <Link href="/">
          <Image
            alt="logo"
            src={"/pictures/logo.png"}
            width={120}
            height={120}
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
            2
          </Badge>
        </Link>
      </div>
    </div>
  );
}

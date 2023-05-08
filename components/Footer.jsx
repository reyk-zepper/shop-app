import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <div className="d-flex justify-content-center align-items-center fixed-bottom text-dark bg-light">
      <Link href="/">
        <Image alt="logo" src={"/images/logo.png"} width={60} height={60} />
      </Link>
      <h6>| 📞 030 47 54 63 08 | ⏰ 24/7</h6>
    </div>
  );
}

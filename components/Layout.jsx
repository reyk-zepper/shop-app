import Head from "next/head";
import Navigation from "../components/Navigation";
import Footer from "../components/Footer";

export default function Layout({ children }) {
  return (
    <>
      <Head>
        <title>Shop-App - YOUR SHOP</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navigation />
      <div className="container">{children}</div>
      <Footer />
    </>
  );
}

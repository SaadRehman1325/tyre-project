import React, { useContext } from "react";
import ProductContextProvider from "../contexts/ProductContext";
import AuthContextProvider, { AuthContext } from "../contexts/UserContext";
import LoadingContextProvider from "../contexts/LoadingContext";
import "../assets/css/main.css";
import Navbar from "../components/Navbar";
import LoaderModal from "../components/LoaderModal";
import { useRouter } from "next/router";
import WhatsappIcon from "@/components/WhatsappIcon";
import Footer from "@/components/Footer";
import Head from "next/head";
import { Html } from "next/document";

function MyApp({ Component, pageProps }) {
  if (typeof document !== "undefined") {
    require("bootstrap/dist/css/bootstrap.min.css");
    require("bootstrap/dist/js/bootstrap.bundle.min");
  }

  const router = useRouter();

  return (
    <>
      {/* <Html lang="en"> */}
      <Head>
        <title>Tyre99</title>
        <meta name="description" content="Tyre App" key="desc" />
      </Head>
      <LoadingContextProvider>
        <AuthContextProvider>
          <ProductContextProvider>
            <div style={{ minHeight: "90.8vh" }}>
              <LoaderModal />
              <Navbar />
              <Component {...pageProps} />
              <WhatsappIcon />
            </div>
            <Footer />
          </ProductContextProvider>
        </AuthContextProvider>
      </LoadingContextProvider>
      {/* </Html> */}
    </>
  );
}

export default MyApp;

import "@styles/custom.css";
import { CartProvider } from "react-use-cart";
import { Elements } from "@stripe/react-stripe-js";
// import "bootstrap/dist/css/bootstrap.min.css";
//internal import
import getStripe from "@utils/stripe";
import { UserProvider } from "@context/UserContext";
import DefaultSeo from "@component/common/DefaultSeo";
import { SidebarProvider } from "@context/SidebarContext";
import CartServices from "@services/CartServices";
import { useEffect } from "react";

const stripePromise = getStripe();

import TimeAgo from "javascript-time-ago";

import en from "javascript-time-ago/locale/en.json";
// import ru from 'javascript-time-ago/locale/ru.json'

TimeAgo.addDefaultLocale(en);
TimeAgo.addLocale(en);

function MyApp({ Component, pageProps }) {
  useEffect(async () => {
    // const cartKey = await CartServices.getCartKey();
  }, []);

  return (
    <>
      <UserProvider>
        <SidebarProvider>
          <Elements stripe={stripePromise}>
            <CartProvider>
              <DefaultSeo />
              <Component {...pageProps} />
            </CartProvider>
          </Elements>
        </SidebarProvider>
      </UserProvider>
    </>
  );
}

export default MyApp;

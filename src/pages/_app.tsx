import { AppProps } from "next/app";
import "@/styles/globals.css";
import { UserProvider } from "@/context/userContext";
import { CartProvider } from "@/context/cartContext";
import Wrapper from "@/components/layout/wrapper";
import { useRouter } from "next/router";
import { UtilityProvider } from "@/context/loaderContext";
import MainSite from "@/components/layout/main-site";
const _app = ({ Component, pageProps }: AppProps) => {
  const router = useRouter();
  return (
    <UtilityProvider>
      <UserProvider>
        <CartProvider>
          {router.pathname.includes("admin") ? (
            <Wrapper component={<Component {...pageProps} />} />
          ) : (
            <MainSite>
              <Component {...pageProps} />
            </MainSite>
          )}
        </CartProvider>
      </UserProvider>
    </UtilityProvider>
  );
};
export default _app;

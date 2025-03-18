import { AppProps } from "next/app";
import "@/styles/globals.css";
import { UserProvider } from "@/context/userContext";
import { CartProvider } from "@/context/cartContext";
import Wrapper from "@/components/layout/wrapper";
import { useRouter } from "next/router";
import { UtilityProvider } from "@/context/loaderContext";
import MainSite from "@/components/layout/main-site";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ApolloProvider } from "@apollo/client";
import client from "@/graphql/client";
const _app = ({ Component, pageProps }: AppProps) => {
  const queryClient = new QueryClient();
  const router = useRouter();
  return (
    <ApolloProvider client={client}>
      <UtilityProvider>
        <UserProvider>
          <CartProvider>
            <QueryClientProvider client={queryClient}>
              {router.pathname.includes("admin") ? (
                <Wrapper component={<Component {...pageProps} />} />
              ) : (
                <MainSite>
                  <Component {...pageProps} />
                </MainSite>
              )}
            </QueryClientProvider>
          </CartProvider>
        </UserProvider>
      </UtilityProvider>
    </ApolloProvider>
  );
};
export default _app;

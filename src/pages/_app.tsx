import SidebarLayout from "@/components/layouts/SidebarLayout";
import "@/styles/globals.css";
import type { NextPage } from "next";
import { SessionProvider } from "next-auth/react";
import type { AppProps } from "next/app";
import type { ReactElement, ReactNode } from "react";
import { SWRConfig } from "swr";


export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

if (typeof window === 'undefined') {
  (async () => {
    const { server } = await import('../mocks/node');
    server.listen();
  })();
} else {
  (async () => {
    const { worker } = await import('../mocks/browser');
    worker.start();
  })();
}

export default function MyApp({
  Component,
  pageProps: { session, ...pageProps },
}: AppPropsWithLayout) {
  // Use the layout defined at the page level, if available
  const getLayout = Component.getLayout ?? ((page) => page);
 

  return (
    <SWRConfig
      value={{
        revalidateOnFocus: false,
        onError:(error, key) => {

        }
      }}
    >
      <SessionProvider session={session}>
        {getLayout(
          <>
            {Component.getLayout ? (
              <Component {...pageProps} />
            ) : (
              <SidebarLayout>
                <Component {...pageProps} />
              </SidebarLayout>
            )}
          </>
        )}
      </SessionProvider>
    </SWRConfig>
  );
}

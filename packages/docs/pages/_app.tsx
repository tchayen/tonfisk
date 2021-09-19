import "../styles/globals.css";
import "../styles/theme.css";

import type { AppProps } from "next/app";
import { Head } from "next/document";
import { TonfiskProvider } from "tonfisk";

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <>
      {/* <Head>
        <title>tonfisk 🐟</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head> */}
      <TonfiskProvider>
        <Component {...pageProps} />
      </TonfiskProvider>
    </>
  );
}
export default MyApp;

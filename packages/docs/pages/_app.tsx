import "../styles/globals.css";
import "../styles/theme.css";

import { Provider } from "ds";
import type { AppProps } from "next/app";
import { Head } from "next/document";

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <>
      {/* <Head>
        <title>tonfisk 🐟</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head> */}
      <Provider>
        <Component {...pageProps} />
      </Provider>
    </>
  );
}
export default MyApp;

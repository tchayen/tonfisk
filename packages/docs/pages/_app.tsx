import "../styles/globals.css";
import "../styles/theme.css";

import type { AppProps } from "next/app";
import Head from "next/head";
import { TonfiskProvider } from "tonfisk";

const title = "tonfisk 🐟";
const description =
  "A React design system with full accessible component library.";
const url = "https://tonfisk.fish";
const imageUrl = "";

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta property="og:url" content={url} />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={title} />
        <meta name="twitter:card" content="summary" />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={imageUrl} />
      </Head>
      <TonfiskProvider>
        <Component {...pageProps} />
      </TonfiskProvider>
    </>
  );
}
export default MyApp;

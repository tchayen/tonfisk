import "../styles/globals.css";
import "../styles/theme.css";

import type { AppProps } from "next/app";
import Head from "next/head";
import { TonfiskProvider } from "tonfisk";

import { author, description, title, url } from "../const";

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta property="og:url" content={url} />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={title} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:creator" content={author} />
        <meta property="og:description" content={description} />
        <link
          rel="icon"
          href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🐟</text></svg>"
        />
      </Head>
      <TonfiskProvider>
        <Component {...pageProps} />
      </TonfiskProvider>
    </>
  );
}
export default MyApp;

import "../styles/globals.css";
import "../styles/theme.css";

import type { AppProps } from "next/app";
import Head from "next/head";
import { TonfiskProvider } from "tonfisk";

const title = "tonfisk 🐟";
const description =
  "A React design system with a fully accessible component library.";
const url = "https://tonfisk.fish";
const imageUrl = "";

const Favicon = ({ children }: { children: string }) => (
  <link
    rel="icon"
    href={`data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>${children}</text></svg>`}
  />
);

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
        <Favicon>🐟</Favicon>
      </Head>
      <TonfiskProvider>
        <Component {...pageProps} />
      </TonfiskProvider>
    </>
  );
}
export default MyApp;

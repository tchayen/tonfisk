import "../public/theme.css";
import "../styles/globals.css";

import { Provider } from "ds";
import type { AppProps } from "next/app";
import { ReactElement } from "react";

function MyApp({ Component, pageProps }: AppProps): ReactElement {
  return (
    <Provider>
      <Component {...pageProps} />
    </Provider>
  );
}
export default MyApp;

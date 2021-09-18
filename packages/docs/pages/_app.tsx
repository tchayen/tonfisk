import "../styles/globals.css";
import "../styles/theme.css";

import { Provider } from "ds";
import type { AppProps } from "next/app";

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <Provider>
      <Component {...pageProps} />
    </Provider>
  );
}
export default MyApp;

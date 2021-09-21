import Head from "next/head";

import { getSocialImageUrl } from "../const";

export function SocialCardsHeader({ slug }: { slug: string }): JSX.Element {
  return (
    <Head>
      <meta name="twitter:image" content={getSocialImageUrl(slug)} />
      <meta property="og:image" content={getSocialImageUrl(slug)} />
    </Head>
  );
}

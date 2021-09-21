import Head from "next/head";
import { commonStyles } from "tonfisk";

import { Header1 } from "../components/Header";
import { Layout } from "../components/Layout";
import { imageUrl } from "../const";
import { getNavigation } from "../utils/mdx";
type Navigation = ReturnType<typeof getNavigation>;

export default function Missing({
  navigation,
}: {
  navigation: Navigation;
}): JSX.Element {
  return (
    <>
      <Head>
        <meta name="twitter:image" content={imageUrl} />
        <meta property="og:image" content={imageUrl} />
      </Head>
      <Layout navigation={navigation}>
        <Header1>404</Header1>
        <p className={commonStyles.secondaryTextColor}>
          This page does not exist.
        </p>
      </Layout>
    </>
  );
}

export const getStaticProps = async (): Promise<{
  props: { navigation: Navigation };
}> => {
  return {
    props: {
      navigation: getNavigation(),
    },
  };
};

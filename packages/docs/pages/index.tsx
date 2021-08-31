import Head from "next/head";
import Link from "next/link";

import { Layout } from "../components/Layout";
import { getNavigation } from "../utils/mdx";

export default function Home({
  navigation,
}: {
  navigation: ReturnType<typeof getNavigation>;
}) {
  return <Layout navigation={navigation}>123</Layout>;
}

export function getStaticProps() {
  return {
    props: {
      navigation: getNavigation(),
    },
  };
}

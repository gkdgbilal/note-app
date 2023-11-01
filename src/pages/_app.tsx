import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { appWithTranslation } from "next-i18next";
import { i18n } from "@/i18n/i18n";
import { useEffect } from "react";
import Head from "next/head";
import Layout from "@/components/layouts/Layout";

function App({ Component, pageProps }: AppProps) {
  useEffect(() => {
    i18n.changeLanguage("tr");
  }, []);

  return (
    <>
      {/* !TODO: Remove this line after adding dark mode support */}
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </>
  );
}

export default appWithTranslation(App);

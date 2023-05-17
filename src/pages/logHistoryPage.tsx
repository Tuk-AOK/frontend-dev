import React from "react";
import Layout from "../components/layout";
import LogHistory from "../components/content/logHistory/logHistory";

export default function LogHistoryPage() {
  return (
    <Layout headerInfo={"crepe"}>
        <LogHistory/>
    </Layout>
  );
}
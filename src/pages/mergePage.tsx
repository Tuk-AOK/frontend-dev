import React from "react";
import Layout from "../components/layout";
import Merge from "../components/content/merge/merge";

export default function LogHistoryPage() {
  return (
    <Layout headerInfo={"merge"}>
      <Merge/>
    </Layout>
  );
}
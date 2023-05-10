import React from "react";
import Layout from "../components/layout";
import Project from "../components/content/project/project";

export default function ProjectPage(){
    return (
        <Layout headerInfo={"projectInfo"}>
            <Project></Project>
        </Layout>
    );
}
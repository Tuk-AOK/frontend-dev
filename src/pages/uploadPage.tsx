import React from "react";
import Layout from "../components/layout";
import { Upload } from "../components/content/upload/upload";

export default function UploadPage(){
    return (
        <Layout headerInfo={"uploadInfo"}>
            <Upload></Upload>            
        </Layout>
    );
}
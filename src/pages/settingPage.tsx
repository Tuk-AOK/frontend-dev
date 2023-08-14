import Layout from "../components/layout";
import Setting from "../components/content/setting/setting"

export default function SettingPage(){
  return(
    <Layout headerInfo={"settings"}>
      <Setting/>
    </Layout>
  );
}
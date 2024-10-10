import Layout from "../common/Layout";
import Content from "../common/Content";
import MailForm from "../common/MailForm";

export default function Contact(){

    return(
       <Layout title={'CONTACT'}>
            <Content delay={1}>
                <MailForm/>
            </Content>

        </Layout>
    );
}
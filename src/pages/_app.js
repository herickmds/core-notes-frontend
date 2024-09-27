import '../styles/globals.css'; 
import Layout from '@/components/Layout';
import { UserProvider } from '@/contexts/userContext';
import App from 'next/app';

function MeuAplicativo({ Component, pageProps }) {
  return (
    <UserProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </UserProvider>
  );
}
 
MeuAplicativo.getInitialProps = async (appContext) => {
  const appProps = await App.getInitialProps(appContext);
  return { ...appProps };
};

export default MeuAplicativo;

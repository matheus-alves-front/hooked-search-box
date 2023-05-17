import "bootstrap/dist/css/bootstrap.css";
import "styles/global.css";

const MyApp = ({ Component, pageProps }) => {
  return (
    <>
      <Component {...pageProps} />
    </>
  );
};

export default MyApp;

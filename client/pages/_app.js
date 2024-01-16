import "bootstrap/dist/css/bootstrap.css";

// Next wraps all pages with this custom component as opposed to its own default component
const App = ({ Component, pageProps }) => {
  return <Component {...pageProps} />;
};

export default App;

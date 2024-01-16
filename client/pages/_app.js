import "bootstrap/dist/css/bootstrap.css";
import buildClient from "../api/build-client";

// Next wraps all pages with this custom component as opposed to its own default component
const AppComponent = ({ Component, pageProps }) => {
  return <Component {...pageProps} />;
};

// NEXT.js will call this function while rendering the app on the server
// context for app component is a bit different from other components
AppComponent.getInitialProps = async (appContext) => {
  const client = buildClient(appContext.ctx);
  const { data } = await client.get("/api/users/currentuser");
  return data;
};

export default AppComponent;

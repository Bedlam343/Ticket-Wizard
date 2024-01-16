import buildClient from "../api/build-client";

const LandingPage = ({ currentUser }) => {
  return currentUser ? (
    <h1>You are signed in</h1>
  ) : (
    <h1>You are not signed it</h1>
  );
};

// NEXT.js will call this function while rendering the app on the server
LandingPage.getInitialProps = async (context) => {
  console.log("LANDING PAGE");
  const client = buildClient(context);
  const { data } = await client.get("/api/users/currentuser");
  return data;
};

export default LandingPage;

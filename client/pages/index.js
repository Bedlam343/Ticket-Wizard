import axios from "axios";

const LandingPage = ({ currentUser }) => {
  console.log(currentUser);
  return <h1>Landing Page</h1>;
};

// NEXT.js will call this function while rendering the app on the server
LandingPage.getInitialProps = async () => {
  // check if we are on the server or the browser (window object only exists inside browser)
  if (typeof window === "undefined") {
    // making request to a service in a different namespace
    const { data } = await axios.get(
      "http://ingress-nginx-controller.ingress-nginx.svc.cluster.local/api/users/currentuser",
      {
        headers: {
          Host: "ticketing.dev",
        },
      }
    );
    return data;
  } else {
    const { data } = await axios.get("/api/users/currentuser");
    return data;
  }
};

// ingress-nginx-controller

export default LandingPage;

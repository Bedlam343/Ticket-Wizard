import axios from "axios";

const buildClient = ({ req }) => {
  if (typeof window === "undefined") {
    // create pre-configured version of axios
    return axios.create({
      baseURL:
        "http://ingress-nginx-controller.ingress-nginx.svc.cluster.local",
      headers: req.headers,
    });
  } else {
    // on the browser
    return axios.create({
      baseURL: "/",
    });
  }
};

export default buildClient;

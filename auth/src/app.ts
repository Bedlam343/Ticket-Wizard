import express from "express";
import "express-async-errors"; // This is a package that will automatically handle async errors without the need for next() or try/catch blocks
import { json } from "body-parser";
import cookieSession from "cookie-session";

import { currentUserRouter } from "./routes/current-user";
import { signinRouter } from "./routes/signin";
import { signoutRouter } from "./routes/signout";
import { signupRouter } from "./routes/signup";
import { errorHandler } from "./middlewares/error-handler";
import { NotFoundError } from "./errors/not-found-error";

const app = express();
app.set("trust proxy", true); // trust traffic from nginx proxy
app.use(json());
app.use(
  cookieSession({
    signed: false, // don't encrypt the cookie
    secure: process.env.NODE_ENV !== "test", // if true, only send the cookie over HTTPS
  })
);

app.use(currentUserRouter);
app.use(signinRouter);
app.use(signoutRouter);
app.use(signupRouter);

app.all("*", async (req, res, next) => {
  throw new NotFoundError();
});

app.use(errorHandler);

export { app };

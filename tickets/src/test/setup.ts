import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import request from "supertest";
import { app } from "../app";
import jwt from "jsonwebtoken";

declare global {
  var signin: () => string[];
}

let mongo: any;

// hook function (executed before all tests started to be executed)
beforeAll(async () => {
  process.env.JWT_KEY = "asdfasdf";

  mongo = await MongoMemoryServer.create();
  const mongoUri = mongo.getUri();

  await mongoose.connect(mongoUri, {});
});

// runs before each test
beforeEach(async () => {
  // delete all collections
  const collections = await mongoose.connection.db.collections();

  for (let collection of collections) {
    await collection.deleteMany({});
  }
});

afterAll(async () => {
  if (mongo) {
    await mongo.stop();
  }
  await mongoose.connection.close();
});

// fake authentication
global.signin = () => {
  // Build JWT payload --> { id, email }
  const payload = {
    id: new mongoose.Types.ObjectId().toHexString(),
    email: "test@test.com",
  };

  // Create JWT
  const token = jwt.sign(payload, process.env.JWT_KEY!);

  // Build session object -> { jwt: MY_JWT }
  const session = { jwt: token };

  // Turn session into JSON
  const sessionJSON = JSON.stringify(session);

  // encode JSON as base64
  const base64 = Buffer.from(sessionJSON).toString("base64");

  // return string that's the cookie with encoded data
  return [`session=${base64}`];
};

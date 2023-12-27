import mongoose from "mongoose";
import { Password } from "../services/password";

// interface describing properties required to create a new User
interface UserAttrs {
  email: string;
  password: string;
}

// interface describing properties that a User Model has
interface UserModel extends mongoose.Model<UserDoc> {
  build(attrs: UserAttrs): UserDoc;
}

// interface describing properties that a User Document has
interface UserDoc extends mongoose.Document {
  email: string;
  password: string;
}

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String, // This is a JS String constructor
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    // help mongoose turn user document into JSON
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.password; // remove password from JSON
        delete ret.__v; // remove version key from JSON
      },
    },
  }
);

// middleware function in mongoose (executed before saving a document)
userSchema.pre("save", async function (done) {
  // creating a new user or modifying the password
  if (this.isModified("password")) {
    const hashed = await Password.toHash(this.get("password"));
    this.set("password", hashed);
  }

  done(); // done is a callback function
});

// custom function built into the model (type checking for TS)
userSchema.statics.build = (attrs: UserAttrs) => {
  return new User(attrs);
};

// create model from schema
// <UserDoc, UserModel> are like type arguments to the model function
const User = mongoose.model<UserDoc, UserModel>("User", userSchema);

export { User };

import mongoose from "mongoose";

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

const userSchema = new mongoose.Schema({
  email: {
    type: String, // This is a JS String constructor
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

// custom function built into the model (type checking for TS)
userSchema.statics.build = (attrs: UserAttrs) => {
  return new User(attrs);
};

// create model from schema
// <UserDoc, UserModel> are like type arguments to the model function
const User = mongoose.model<UserDoc, UserModel>("User", userSchema);

export { User };

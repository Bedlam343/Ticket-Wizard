export abstract class CustomError extends Error {
  abstract statusCode: number;

  constructor(message: string) {
    // equivalent more or less to calling new Error(message)
    super(message);

    Object.setPrototypeOf(this, CustomError.prototype);
  }

  abstract serializeErrors(): { message: string; field?: string }[];
}

export class BaseError extends Error {
  constructor(message, error) {
    super();
    this.error = error;
    this.message = message;
  }
}

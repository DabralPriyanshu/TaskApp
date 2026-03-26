import { BaseError } from "./BaseError.js";
import {StatusCodes} from "http-status-codes"

export class NotFoundError extends BaseError {
  constructor(message, error) {
    super(message, error);
    this.statusCode = StatusCodes.NOT_FOUND;
  }
}

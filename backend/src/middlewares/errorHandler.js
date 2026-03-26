import { BaseError } from "../errors/BaseError.js";
import { StatusCodes } from "http-status-codes";

export const globalErrorHandler = (err, req, res, next) => {
  console.log("Printing error in controller", err);
  if (err instanceof BaseError) {
    return res.status(err.statusCode).json({
      data: {},
      success: false,
      message: err.message,
      error: err.error,
    });
  } else {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      data: {},
      success: false,
      message: "Internal server error",
      error: "Error while processing your request please try again!",
    });
  }
};

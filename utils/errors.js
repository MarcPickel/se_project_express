const BAD_REQUEST_ERROR_CODE = 400;

const UNAUTHORIZED_ERROR_CODE = 401;

const UNAUTHORIZED_ERROR_MESSAGE = "Authorization required";

const FORBIDDEN_ERROR_CODE = 403;

const NOT_FOUND_ERROR_CODE = 404;

const CONFLICT_ERROR = 409;

const DEFAULT_ERROR_CODE = 500;

const DEFAULT_ERROR_MESSAGE = "An error has occurred on the server.";

const orFailHandler = () => {
  const error = new Error("Item ID not found");
  error.statusCode = 404;
  throw error;
};

module.exports = {
  BAD_REQUEST_ERROR_CODE,
  UNAUTHORIZED_ERROR_CODE,
  UNAUTHORIZED_ERROR_MESSAGE,
  FORBIDDEN_ERROR_CODE,
  NOT_FOUND_ERROR_CODE,
  CONFLICT_ERROR,
  DEFAULT_ERROR_CODE,
  DEFAULT_ERROR_MESSAGE,
  orFailHandler,
};

class ErrorResponse {
  constructor(code, message) {
    this.success = false;
    this.code = code;
    this.message = message;
  }
}

module.exports = ErrorResponse;

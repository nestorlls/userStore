export class CustomeError extends Error {
  private constructor(
    public readonly statusCode: number,
    public readonly message: string
  ) {
    super(message);
  }

  static badRequest(message: string) {
    return new CustomeError(400, message);
  }

  static unAuthorized(message: string) {
    return new CustomeError(401, message);
  }

  static forbidden(message: string) {
    return new CustomeError(403, message);
  }

  static notFound(message: string) {
    return new CustomeError(404, message);
  }

  static conflict(message: string) {
    return new CustomeError(409, message);
  }

  static internalServerError(message: string) {
    return new CustomeError(500, message);
  }
}

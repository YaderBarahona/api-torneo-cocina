class AppError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
  }
}

class NotFoundError extends AppError {
  constructor(message = "Recurso no encontrado") {
    super(message, 404);
  }
}

class BadRequestError extends AppError {
  constructor(message = "Solicitud incorrecta") {
    super(message, 400);
  }
}

class ConflictError extends AppError {
  constructor(message = "Conflicto con la solicitud") {
    super(message, 409);
  }
}

class UnauthorizedError extends AppError {
  constructor(message = "Acceso no autorizado") {
    super(message, 401);
  }
}

export { AppError, NotFoundError, BadRequestError, ConflictError, UnauthorizedError };

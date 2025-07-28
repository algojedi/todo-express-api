import { NOT_FOUND_MESSAGE, BAD_REQUEST_MESSAGE, UNAUTHORIZED_MESSAGE, FORBIDDEN_MESSAGE, INTERNAL_SERVER_ERROR_MESSAGE, VALIDATION_ERROR_MESSAGE } from "../constants";
import { BaseError } from "./BaseError";

export class NotFoundError extends BaseError {
	constructor(message: string = NOT_FOUND_MESSAGE) {
		super(message, 404);
	}
}

export class BadRequestError extends BaseError {
	constructor(message: string = BAD_REQUEST_MESSAGE) {
		super(message, 400);
	}
}

export class UnauthorizedError extends BaseError {
	constructor(message: string = UNAUTHORIZED_MESSAGE) {
		super(message, 401);
	}
}

export class ForbiddenError extends BaseError {
	constructor(message: string = FORBIDDEN_MESSAGE) {
		super(message, 403);
	}
}

export class InternalServerError extends BaseError {
	constructor(message: string = INTERNAL_SERVER_ERROR_MESSAGE) {
		super(message, 500);
	}
}

export class ValidationError extends BaseError {
	constructor(message: string = VALIDATION_ERROR_MESSAGE) {
		super(message, 422);
	}
}

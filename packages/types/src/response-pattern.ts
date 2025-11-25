// Define a TypeScript type for the response pattern
export type ResponsePatternType<T = any> = {
  status:
    | "success"
    | "notFound"
    | "error"
    | "unauthorized"
    | "forbidden"
    | "validationError"
    | "badRequest";
  header: string;
  message: string;
  data: T;
};

// ResponsePatternType utility functions
export const ResponsePattern = {
  success: <T = any>(
    header = "Success",
    data: T,
    message = ""
  ): ResponsePatternType<T> => {
    if (data === null) {
      throw new Error("ResponsePattern.success data must not be null"); // Ensure data is not null
    }
    return {
      status: "success",
      header,
      message,
      data,
    };
  },

  notFound: <T = any>(
    header = "Resource not found",
    data: any = null,
    message = ""
  ): ResponsePatternType<T> => ({
    status: "notFound",
    header,
    message,
    data,
  }),

  badRequest: <T = any>(
    header = "Bad Request",
    data: any = null,
    message = ""
  ): ResponsePatternType<T> => ({
    status: "badRequest",
    header,
    message,
    data,
  }),

  error: <T = any>(
    header = "An error occurred",
    data: any = null,
    message = ""
  ): ResponsePatternType<T> => ({
    status: "error",
    header,
    message,
    data,
  }),

  unauthorized: <T = any>(
    header = "Unauthorized access",
    data: any = null,
    message = ""
  ): ResponsePatternType<T> => ({
    status: "unauthorized",
    header,
    message,
    data,
  }),

  forbidden: <T = any>(
    header = "Forbidden",
    data: any = null,
    message = ""
  ): ResponsePatternType<T> => ({
    status: "forbidden",
    header,
    message,
    data,
  }),

  validationError: <T = any>(
    header = "Validation failed",
    data: any = null,
    message = ""
  ): ResponsePatternType<T> => ({
    status: "validationError",
    header,
    message,
    data,
  }),

  // Type guard functions for easy checking
  isSuccess: <T>(response: ResponsePatternType<T>): boolean =>
    response.status === "success",
  isError: <T>(response: ResponsePatternType<T>): boolean =>
    response.status === "error",
  isNotFound: <T>(response: ResponsePatternType<T>): boolean =>
    response.status === "notFound",
  isUnauthorized: <T>(response: ResponsePatternType<T>): boolean =>
    response.status === "unauthorized",
  isForbidden: <T>(response: ResponsePatternType<T>): boolean =>
    response.status === "forbidden",
  isValidationError: <T>(response: ResponsePatternType<T>): boolean =>
    response.status === "validationError",
  isBadRequest: <T>(response: ResponsePatternType<T>): boolean =>
    response.status === "badRequest",

  // Helper to get data safely
  getData: <T>(response: ResponsePatternType<T>): T | null => {
    return ResponsePattern.isSuccess(response) ? response.data : null;
  },

  // Helper to get error header
  getErrorHeader: <T>(response: ResponsePatternType<T>): string => {
    return !ResponsePattern.isSuccess(response) ? response.header : "";
  },

  // Helper to get error message
  getErrorMessage: <T>(response: ResponsePatternType<T>): string => {
    return !ResponsePattern.isSuccess(response) ? response.message : "";
  },
};

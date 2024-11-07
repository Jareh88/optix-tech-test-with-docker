interface ResponseError extends Error {
  response?: {
    status: number;
    data: {
      message: string;
    };
  };
  request?: Request;
}

export const handleApiError = (error: unknown) => {
  if (isResponseError(error)) {
    if (error.response) {
      console.error(
        `HEY DEV: Error ${error.response.status}: ${error.response.data.message}`
      );
    } else if (error.request) {
      console.error("HEY DEV: No response received from the server.");
    } else {
      console.error("HEY DEV: An unknown error occurred: ", error.message);
    }
  } else {
    console.error("HEY DEV: An unexpected error occurred: ", error);
  }
};

const isResponseError = (error: unknown): error is ResponseError => {
  if (typeof error !== "object" || error === null) {
    return false;
  }

  if ("message" in error && typeof (error as Error).message === "string") {
    return true;
  }

  return false;
};

/**
 * @jest-environment node
 */

import { handleApiError } from "./errors";

global.console.error = jest.fn();

describe("handleApiError", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test("logs response error message when error has response property", () => {
    const responseError = {
      message: "Something went wrong",
      response: {
        status: 404,
        data: {
          message: "Not Found",
        },
      },
    };

    handleApiError(responseError);

    expect(console.error).toHaveBeenCalledWith("HEY DEV: Error 404: Not Found");
  });

  test("logs no response received when error has request property", () => {
    const requestError = {
      message: "Request failed",
      request: new Request("https://testtestetsturl.com"),
    };

    handleApiError(requestError);

    expect(console.error).toHaveBeenCalledWith(
      "HEY DEV: No response received from the server."
    );
  });

  test("logs unknown error message when error does not have response or request", () => {
    const unknownError = {
      message: "An unknown error occurred",
    };

    handleApiError(unknownError);

    expect(console.error).toHaveBeenCalledWith(
      "HEY DEV: An unknown error occurred: ",
      "An unknown error occurred"
    );
  });

  test("logs unexpected error message for non-ResponseError object", () => {
    const randomError = { foo: "bar" };

    handleApiError(randomError);

    expect(console.error).toHaveBeenCalledWith(
      "HEY DEV: An unexpected error occurred: ",
      randomError
    );
  });

  test("logs unexpected error message for non-object or null error", () => {
    handleApiError(null);

    expect(console.error).toHaveBeenCalledWith(
      "HEY DEV: An unexpected error occurred: ",
      null
    );

    handleApiError("some string error");

    expect(console.error).toHaveBeenCalledWith(
      "HEY DEV: An unexpected error occurred: ",
      "some string error"
    );
  });
});

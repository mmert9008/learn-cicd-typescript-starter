import { describe, expect, test } from "vitest";
import { getAPIKey } from "../api/auth.js";
import { IncomingHttpHeaders } from "http";

describe("getAPIKey", () => {
  test("returns null when no authorization header is present", () => {
    const headers: IncomingHttpHeaders = {};
    expect(getAPIKey(headers)).toBeNull();
  });

  test("returns null when authorization header is missing 'ApiKey' prefix", () => {
    const headers: IncomingHttpHeaders = {
      authorization: "Bearer my-token-123",
    };
    expect(getAPIKey(headers)).toBeNull();
  });

  test("returns null when authorization header is malformed (missing key)", () => {
    const headers: IncomingHttpHeaders = {
      authorization: "ApiKey",
    };
    expect(getAPIKey(headers)).toBeNull();
  });

  test("returns the API key from a properly formatted authorization header", () => {
    const headers: IncomingHttpHeaders = {
      authorization: "ApiKey valid_api_key_456",
    };
    expect(getAPIKey(headers)).toBe("valid_api_key_456");
  });
});

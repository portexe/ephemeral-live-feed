const genericErrorMessage = "Server error. Please try again soon.";
const unauthorizedError = "Unauthorized. Redirecting to login.";
const loginUrl = "/users/sign_in";

export async function authenticatedFetch({
  url,
  method = "GET",
  body = undefined,
  headers = {},
}) {
  try {
    return fetch(url, {
      method,
      body,
      headers: {
        ...headers,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    }).then(async (res) => {
      if (res.status === 401 || res.status === 403) {
        window.location.href = loginUrl;
        throw Error(unauthorizedError);
      } else if (!res.ok) {
        throw new Error(genericErrorMessage);
      }

      const jsonResult = await res.json();

      if (jsonResult.error) {
        throw new Error(genericErrorMessage);
      }

      return jsonResult;
    });
  } catch (error) {
    throw Error(genericErrorMessage);
  }
}

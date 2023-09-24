export function getErrorText(errorCode: string | unknown) {
  if (errorCode === "insufficient_credits") return "Not enough credits. Subscribe for more!";
  return "Something went wrong :(";
}

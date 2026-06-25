export function getCurrentTime(): string {
  const date = new Date();
  const currentDateAndTime = date.toUTCString();
  return currentDateAndTime;
}

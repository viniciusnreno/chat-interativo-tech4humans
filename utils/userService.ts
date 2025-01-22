const USER_KEY = "userName";

export function setUserName(name: string): void {
  window.localStorage.setItem(USER_KEY, name);
}

export function getUserName(): string | null {
  return window.localStorage.getItem(USER_KEY);
}

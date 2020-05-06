/*
This is just a generic exception we can throw and easily detect later in our app,
 in logs or other systems.
*/
export class NotCacheableException<T> extends Error {
  public constructor(message: string) {
    super(message)
  }
}
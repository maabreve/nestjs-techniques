export interface IHttpException {
  timestamp: string;
  status: number;
  path: string;
  method: string;
  message: string;
}

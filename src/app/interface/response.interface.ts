export interface ResponseInterface <T> {
  status: number;
  status_code: string;
  status_message: string;
  status_number: string;
  data: T;
  birthdate : string
}

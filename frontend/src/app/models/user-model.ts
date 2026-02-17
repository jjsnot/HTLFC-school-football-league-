

export interface User {
  id: number;
  email: string;
  is_banned :Boolean
  avalible_balance :number;
  frozen_balance :number;
  code?: number;
  code_requests:number;
  last_code_request?:  Date
}
export interface AllUsers {
  id: number;
  email: String;
  is_banned :Boolean
  avalible_balance :number;
  frozen_balance :number;
}


export interface UserDetails {
    _id: string;
    email: string;
    username: string;
    exp: number;
    iat: number;
}

export interface TokenResponse {
    token: string;
  }

  export interface TokenPayload {
    email?: string;
    password: string;
    username: string;
}

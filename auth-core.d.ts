import "@auth/core/types";
import "@auth/core/jwt"

declare module "@auth/core/types" {
  interface Session {
    accessToken?: string;
  }
}

declare module "@auth/core/jwt" {
  interface JWT {
    accessToken?: string;
  }
}
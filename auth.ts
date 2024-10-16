import NextAuth from "next-auth"
import { skipCSRFCheck } from "@auth/core";
 
export const { handlers, signIn, signOut, auth } = NextAuth({
  callbacks: {
    jwt({ account, token }) {
      if (account?.access_token) {
        return {
          ...token,
          accessToken: account.access_token
        }
      }
      return token;
    },
    async session({session, token}) {
      session.accessToken = token.accessToken
      return session;
    }
  },
  providers: [{
    authorization: {
      url: "https://auth.tesla.cn/oauth2/v3/authorize/",
      params: {
        scope: "openid user_data vehicle_device_data vehicle_cmds offline_access",
      },
    },
    token: "https://auth.tesla.cn/oauth2/v3/token/",
    userinfo: "https://auth.tesla.cn/oauth2/v3/userinfo",
    checks: ["none"],
    client: {
      token_endpoint_auth_method: "client_secret_post",
    },
    clientId: process.env.AUTH_TESLA_ID,
    clientSecret: process.env.AUTH_TESLA_SECRET,
    issuer: "https://auth.tesla.cn/oauth2/v3/nts",
    name: "Tesla",
    type: "oidc",
    id: "tesla-auth",
  }],
  secret: process.env.AUTH_SECRET,
  skipCSRFCheck: skipCSRFCheck,
  trustHost: true,
})
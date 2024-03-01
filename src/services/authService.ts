import { STATIC_ROUTES } from "@/router";
import { OAuthTokenResponse } from "@/types";
import axios from "axios";

export const generateOauthConsentPageUrl = () => {
  const scopes = [
    "https://www.googleapis.com/auth/userinfo.email",
    "https://www.googleapis.com/auth/userinfo.profile",
    "openid",
    "https://www.googleapis.com/auth/calendar",
  ];

  const params = {
    client_id: process.env.VUE_APP_OAUTH_CLIENT_ID,
    redirect_uri: process.env.VUE_APP_OAUTH_REDIRECT_URL,
    scope: scopes.join(" "),
    access_type: "offline",
    state: "",
    include_granted_scopes: "true",
    response_type: "code",
    prompt: "consent",
  };
  const searchParams = new URLSearchParams(params);

  return `${process.env.VUE_APP_OAUTH_AUTHORIZATION_PAGE_URL}?${searchParams}`;
};

export const getOAuthTokens = async (code: string) => {
  const params = {
    code: code,
    client_id: process.env.VUE_APP_OAUTH_CLIENT_ID,
    client_secret: process.env.VUE_APP_OAUTH_CLIENT_SECRET,
    redirect_uri: `http://localhost:8080${STATIC_ROUTES.oauth}`,
    grant_type: "authorization_code",
  };
  const searchParams = new URLSearchParams(params);

  const url = `${process.env.VUE_APP_OAUTH_TOKEN_ENDPOINT}?${searchParams}`;

  return axios.post<OAuthTokenResponse>(url);
};

export const getNewAccessToken = async (refreshToken: string) => {
  const params = {
    refresh_token: refreshToken,
    client_id: process.env.VUE_APP_OAUTH_CLIENT_ID,
    client_secret: process.env.VUE_APP_OAUTH_CLIENT_SECRET,
    grant_type: "refresh_token",
  };
  const searchParams = new URLSearchParams(params);

  const url = `${process.env.VUE_APP_OAUTH_TOKEN_ENDPOINT}?${searchParams}`;

  return axios.post<OAuthTokenResponse>(url);
};

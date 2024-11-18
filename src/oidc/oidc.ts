import { createReactOidc } from "oidc-spa/react";

export const { OidcProvider, useOidc, getOidc } = createReactOidc({
  issuerUri: "https://granicus.us-east-1.aws.auth.ac/auth/realms/poc",
  clientId: "ehq",
  publicUrl: process.env.BASE_URL,
});

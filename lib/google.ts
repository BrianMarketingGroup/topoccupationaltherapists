import { google } from "googleapis";

/**
 * Build a Google service-account auth client from the base64 env credential.
 * Returns null when the credential is absent (so callers can no-op locally).
 */
export function getGoogleAuth(scopes: string[]) {
  const raw = process.env.GOOGLE_SERVICE_ACCOUNT_JSON;
  if (!raw) return null;
  const credentials = JSON.parse(Buffer.from(raw, "base64").toString("utf-8"));
  return new google.auth.GoogleAuth({ credentials, scopes });
}

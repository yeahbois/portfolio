import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

const GOOGLE_TOKEN_URL = "https://oauth2.googleapis.com/token";
const DRIVE_API = "https://www.googleapis.com/drive/v3/files";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  if (!id) {
    return NextResponse.json({ error: "Missing file ID" }, { status: 400 });
  }

  try {
    const accessToken = await getAccessToken();

    const driveRes = await fetch(
      `${DRIVE_API}/${id}?fields=id,name,mimeType`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    if (!driveRes.ok) {
      return NextResponse.json({
        error: "File not accessible. Make sure it is shared to the service account.",
      }, { status: 403 });
    }

    const data = await driveRes.json();

    const cdn = `https://lh3.googleusercontent.com/d/${id}`;

    return NextResponse.json({
      name: data.name,
      mimeType: data.mimeType,
      cdn,
    });

  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

async function getAccessToken() {
  const now = Math.floor(Date.now() / 1000);

  const payload = {
    iss: process.env.GOOGLE_CLIENT_EMAIL,
    scope: "https://www.googleapis.com/auth/drive.readonly",
    aud: GOOGLE_TOKEN_URL,
    exp: now + 3600,
    iat: now,
  };

  const privateKey = (process.env.GOOGLE_PRIVATE_KEY || "").replace(/\\n/g, "\n");

  const token = jwt.sign(payload, privateKey, {
    algorithm: "RS256",
  });

  const res = await fetch(GOOGLE_TOKEN_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
      assertion: token,
    }),
  });

  const data = await res.json();
  if (data.error) {
    throw new Error(data.error_description || data.error);
  }
  return data.access_token;
}

import jwt from "jsonwebtoken";

const GOOGLE_TOKEN_URL = "https://oauth2.googleapis.com/token";
const DRIVE_API = "https://www.googleapis.com/drive/v3/files";

export default async function handler(req, res) {
  const { id } = req.query;

  if (!id) {
    return res.status(400).json({ error: "Missing file ID" });
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
      return res.status(403).json({
        error: "File not accessible. Make sure it is shared to the service account.",
      });
    }

    const data = await driveRes.json();

    const cdn = `https://lh3.googleusercontent.com/d/${id}`;

    return res.status(200).json({
      name: data.name,
      mimeType: data.mimeType,
      cdn,
    });

  } catch (err) {
    return res.status(500).json({ error: err.message });
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

  const privateKey = process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, "\n");

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
  return data.access_token;
}

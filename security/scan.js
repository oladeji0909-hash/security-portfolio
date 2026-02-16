import https from "node:https";
import http from "node:http";
import { URL } from "node:url";

const kKnownHeaders = [
  "content-security-policy",
  "strict-transport-security",
  "x-frame-options",
  "x-content-type-options",
  "referrer-policy",
  "permissions-policy",
];

function highlightHeader(name, value) {
  if (!value) {
    return { name, status: "missing" };
  }
  const normalized = value.toLowerCase();
  if (name === "strict-transport-security" && normalized.includes("max-age=31536000")) {
    return { name, status: "good", detail: value };
  }
  return { name, status: "present", detail: value };
}

function checkUrl(target) {
  const client = target.protocol === "https:" ? https : http;
  const headers = {
    "User-Agent": "Security-Health-Check/1.0",
    Accept: "*/*",
  };

  return new Promise((resolve, reject) => {
    const req = client.request(target, { headers }, (res) => {
      const { statusCode, headers: responseHeaders } = res;
      const analyzedHeaders = kKnownHeaders.map((name) =>
        highlightHeader(name, responseHeaders[name])
      );

      const server = responseHeaders["server"];
      const contentType = responseHeaders["content-type"];

      let body = "";
      res.on("data", (chunk) => {
        body += chunk.toString();
      });
      res.on("end", () => {
        const openDirectory =
          contentType?.includes("text/html") && body.includes("<title>Index of");

        resolve({
          url: target.href,
          statusCode,
          server,
          contentType,
          openDirectory,
          headers: analyzedHeaders,
          rawHeaders: responseHeaders,
          snippet: body.slice(0, 1024),
        });
      });
    });

    req.on("error", reject);
    req.end();
  });
}

async function runScan() {
  const [targetArg] = process.argv.slice(2);
  if (!targetArg) {
    console.error("Usage: node scan.js <https://example.com>");
    process.exit(1);
  }

  const target = new URL(targetArg);
  try {
    const result = await checkUrl(target);
    console.log("Scan result:", {
      url: result.url,
      statusCode: result.statusCode,
      server: result.server,
      contentType: result.contentType,
      openDirectory: result.openDirectory,
      headers: result.headers,
    });
  } catch (error) {
    console.error("Scan failed:", error.message);
    process.exit(1);
  }
}

runScan();

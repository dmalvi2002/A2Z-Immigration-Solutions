import { NextResponse } from "next/server";
import { createHmac } from "node:crypto";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const url = process.env.GOOGLE_SCRIPT_URL;
  const token = process.env.GOOGLE_SCRIPT_TOKEN;
  if (!url || !token) {
    return NextResponse.json({ error: "Enquiries are temporarily unavailable. Please email info@a2zimmigrations.co.uk." }, { status: 503 });
  }

  try {
    const origin = request.headers.get("origin");
    // Next.js may normalize the internal request URL behind a proxy or in dev.
    // Browser Origin must match the incoming host, or the request URL itself.
    if (origin && origin !== new URL(request.url).origin
      && new URL(origin).host !== request.headers.get("host")) {
      return NextResponse.json({ error: "Invalid submission origin." }, { status: 403 });
    }
    if (Number(request.headers.get("content-length") || 0) > 16000) {
      return NextResponse.json({ error: "Your enquiry is too long." }, { status: 413 });
    }
    const raw = await request.text();
    if (raw.length > 16000) {
      return NextResponse.json({ error: "Your enquiry is too long." }, { status: 413 });
    }
    let data;
    try { data = JSON.parse(raw); } catch {
      return NextResponse.json({ error: "Invalid enquiry." }, { status: 400 });
    }
    if (!data || typeof data !== "object" || Array.isArray(data)) {
      return NextResponse.json({ error: "Invalid enquiry." }, { status: 400 });
    }
    if (typeof data.requestId !== "string" || !/^[a-f0-9-]{36}$/i.test(data.requestId)) {
      return NextResponse.json({ error: "Invalid enquiry reference." }, { status: 400 });
    }
    const limits: Record<string, number> = { name: 200, email: 254, number: 50, subject: 300, message: 8000, source: 100 };
    const enquiry: Record<string, string | boolean> = {};
    for (const [field, limit] of Object.entries(limits)) {
      if (data[field] != null && typeof data[field] !== "string") {
        return NextResponse.json({ error: "Invalid enquiry fields." }, { status: 400 });
      }
      const value = (data[field] || "").trim();
      if (value.length > limit) {
        return NextResponse.json({ error: "One of your enquiry fields is too long." }, { status: 400 });
      }
      enquiry[field] = value;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(enquiry.email)) || /[\r\n]/.test(String(enquiry.email))) {
      return NextResponse.json({ error: "Please enter a valid email address." }, { status: 400 });
    }
    if (!enquiry.source || (enquiry.source !== "Free resource download" && (!enquiry.name || !enquiry.message))) {
      return NextResponse.json({ error: "Please complete the required fields." }, { status: 400 });
    }
    if (["Contact page", "Offers page"].includes(String(enquiry.source)) && data.consent !== true) {
      return NextResponse.json({ error: "Please tick the consent checkbox." }, { status: 400 });
    }
    enquiry.consent = data.consent === true;
    // Only a keyed hash reaches Google; IP addresses are never stored in the sheet.
    // Hosting must overwrite these forwarding headers with the actual client IP.
    const ip = request.headers.get("x-forwarded-for")?.split(",")[0].trim()
      || request.headers.get("x-real-ip") || "unknown";
    const rateKey = createHmac("sha256", token).update(ip).digest("hex");
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "text/plain;charset=utf-8" },
      body: JSON.stringify({ ...enquiry, requestId: data.requestId, rateKey, token }),
      cache: "no-store",
      signal: AbortSignal.timeout(25000),
    });
    if (!response.ok) throw new Error("Enquiry service unavailable");
    const result = await response.json();
    if (result.error === "Rate limit exceeded") {
      return NextResponse.json({ error: "Too many enquiries. Please wait 10 minutes before trying again." }, { status: 429 });
    }
    if (result.result !== "success") throw new Error("Enquiry service rejected submission");
    return NextResponse.json({ result: "success" });
  } catch {
    return NextResponse.json({ error: "Unable to send your enquiry. Please try again or email info@a2zimmigrations.co.uk." }, { status: 502 });
  }
}

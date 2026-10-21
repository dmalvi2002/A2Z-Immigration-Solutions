type Enquiry = {
  name?: string;
  email: string;
  number?: string;
  subject?: string;
  message?: string;
  source: string;
  consent?: boolean;
};

// Reuse the ID when a request times out or the visitor retries the same enquiry.
const recentRequests = new Map<string, { id: string; expires: number }>();

export async function submitEnquiry(enquiry: Enquiry) {
  const payload = { ...enquiry };
  const key = JSON.stringify(payload);
  const now = Date.now();
  for (const [key, value] of recentRequests) {
    if (value.expires <= now) recentRequests.delete(key);
  }
  let request = recentRequests.get(key);
  if (!request) {
    request = { id: crypto.randomUUID(), expires: now + 10 * 60 * 1000 };
    recentRequests.set(key, request);
  }
  const response = await fetch("/api/enquiries", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ...payload, requestId: request.id }),
  });
  const result = await response.json();
  if (!response.ok || result.result !== "success") {
    throw new Error(result.error || "Unable to send your enquiry. Please try again.");
  }
  return result;
}

export function submitEnquiryForm(form: HTMLFormElement, source: string) {
  const data = new FormData(form);
  return submitEnquiry({
    name: String(data.get("name") || data.get("user_name") || ""),
    email: String(data.get("email") || data.get("user_email") || ""),
    number: String(data.get("number") || ""),
    subject: String(data.get("subject") || ""),
    message: String(data.get("message") || ""),
    source,
    consent: data.has("consent"),
  });
}

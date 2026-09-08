const API_BASE_URL = (
  process.env.NEXT_PUBLIC_API_URL ||
  process.env.API_URL ||
  ""
)
  .trim()
  .replace(/\/$/, "");

const API_SERVER_SECRET =
  process.env.API_SERVER_SECRET || process.env.NEXT_PUBLIC_SERVER_SECRET || "";

const ENDPOINTS = {
  PUBLIC_EVENT: "EventManagement/public-event",
};

function buildUrl(endpoint, params = {}) {
  if (!API_BASE_URL) return null;

  const url = new URL(`${API_BASE_URL}/${endpoint.replace(/^\//, "")}`);

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== "") {
      url.searchParams.append(key, String(value));
    }
  });

  return url;
}

async function get(endpoint, params = {}) {
  const url = buildUrl(endpoint, params);
  if (!url) return [];

  const headers = {
    Accept: "application/json",
    ...(API_SERVER_SECRET ? { "X-Server-Secret": API_SERVER_SECRET } : {}),
  };

  try {
    const response = await fetch(url.toString(), {
      headers,
      next: { revalidate: 120 },
    });

    if (!response.ok) return [];

    const payload = await response.json();
    const items = payload?.data?.data ?? payload?.data;

    return Array.isArray(items) ? items : [];
  } catch {
    return [];
  }
}

export function fetchVirtualBanners(limit = 3) {
  return get(ENDPOINTS.PUBLIC_EVENT, {
    limit,
    "filters[event_types]": "virtual",
    "filters[tag]": "home_banner",
  });
}

export function fetchVirtualEvents(limit = 24) {
  return get(ENDPOINTS.PUBLIC_EVENT, {
    limit,
    "filters[event_types]": "virtual",
  });
}

/* ShafLivs privacy-conscious storefront analytics.
   Add this script to the storefront HTML after reviewing the privacy notice.
   Raw IP addresses are never collected or stored by this tracker. */
(() => {
  const endpoint = "https://acxhrvrnemkpgzrozlqd.supabase.co/functions/v1/bi-track";
  const apiKey = "sb_publishable_PMrmFM8XhEJ8qx0CcmpfWA_U2V3RdFq";
  const key = "shaflivs_bi_session";
  let sessionId = sessionStorage.getItem(key);
  if (!sessionId) {
    sessionId = crypto.randomUUID();
    sessionStorage.setItem(key, sessionId);
  }
  const params = new URLSearchParams(location.search);
  const payload = {
    session_id: sessionId,
    event_type: "page_view",
    page_path: location.pathname.slice(0, 240) || "/",
    referrer: document.referrer || null,
    utm_source: params.get("utm_source"),
    utm_medium: params.get("utm_medium"),
    utm_campaign: params.get("utm_campaign")
  };
  fetch(endpoint, {
    method: "POST",
    headers: { "Content-Type": "application/json", "apikey": apiKey },
    body: JSON.stringify(payload),
    keepalive: true
  }).catch(() => {});
})();

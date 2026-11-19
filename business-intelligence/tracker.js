/* ShafLivs privacy-conscious storefront analytics.
   Shows an explicit opt-in notice before recording analytics.
   Raw IP addresses are never collected or stored by this tracker. */
(() => {
  const endpoint = "https://acxhrvrnemkpgzrozlqd.supabase.co/functions/v1/bi-track";
  const apiKey = "sb_publishable_PMrmFM8XhEJ8qx0CcmpfWA_U2V3RdFq";
  const consentKey = "shaflivs_analytics_consent";
  const sessionKey = "shaflivs_bi_session";
  const allowedEvents = new Set(["page_view", "product_view", "add_to_cart", "checkout_start"]);

  function send(eventType, productId) {
    if (localStorage.getItem(consentKey) !== "accepted" || !allowedEvents.has(eventType)) return;
    let sessionId = sessionStorage.getItem(sessionKey);
    if (!sessionId) {
      sessionId = crypto.randomUUID();
      sessionStorage.setItem(sessionKey, sessionId);
    }
    const params = new URLSearchParams(location.search);
    const payload = {
      session_id: sessionId,
      event_type: eventType,
      page_path: location.pathname.slice(0, 240) || "/",
      product_id: productId || null,
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
  }

  window.ShafLivsBI = { track: send };

  function showConsent() {
    if (localStorage.getItem(consentKey)) {
      if (localStorage.getItem(consentKey) === "accepted") send("page_view");
      return;
    }
    if (!document.body || document.getElementById("shaflivs-analytics-consent")) return;
    const banner = document.createElement("aside");
    banner.id = "shaflivs-analytics-consent";
    banner.setAttribute("role", "dialog");
    banner.setAttribute("aria-label", "Analytics privacy choice");
    banner.innerHTML = `
      <style>
        #shaflivs-analytics-consent{position:fixed;z-index:2147483000;left:16px;right:16px;bottom:16px;max-width:760px;margin:auto;background:#101a2b;color:#f4f7fb;border:1px solid #39516c;border-radius:14px;padding:16px;box-shadow:0 12px 40px #0007;font:14px/1.45 system-ui,sans-serif}
        #shaflivs-analytics-consent p{margin:0 0 12px;color:#d3deec}
        #shaflivs-analytics-consent .actions{display:flex;gap:8px;flex-wrap:wrap}
        #shaflivs-analytics-consent button{border:0;border-radius:9px;padding:9px 13px;font-weight:700;cursor:pointer}
        #shaflivs-analytics-consent .accept{background:#8ce3c5;color:#10251d}
        #shaflivs-analytics-consent .decline{background:#263a54;color:#fff}
      </style>
      <p><strong>Help us improve ShafLivs.</strong> With your permission, we collect anonymous page-visit and approximate city/region analytics. We do not store your raw IP address or use this for precise tracking.</p>
      <div class="actions"><button type="button" class="accept" data-choice="accepted">Allow analytics</button><button type="button" class="decline" data-choice="declined">No thanks</button></div>`;
    banner.addEventListener("click", event => {
      const button = event.target.closest("button[data-choice]");
      if (!button) return;
      localStorage.setItem(consentKey, button.dataset.choice);
      banner.remove();
      if (button.dataset.choice === "accepted") send("page_view");
    });
    document.body.appendChild(banner);
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", showConsent, { once: true });
  else showConsent();
})();

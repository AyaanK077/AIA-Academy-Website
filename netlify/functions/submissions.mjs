// -----------------------------------------------------------------------------
// Netlify Function: submissions
//
// Returns all form submissions for this site, grouped by form, so the editor
// can review them inside the site at /submissions (read-only).
//
// Security:
//   - Only logged-in editors can call this. Netlify populates
//     `context.clientContext.user` when the request carries a valid Netlify
//     Identity token (the same login used by /admin). No login → 401.
//   - The Netlify API token lives ONLY here on the server, in an environment
//     variable. It is never sent to the browser.
//
// Required environment variables (set in Netlify → Site configuration →
// Environment variables):
//   NETLIFY_API_TOKEN  – a Netlify personal access token
//   SITE_ID            – this site's API ID (Site configuration → General →
//                        Site information → "Site ID")
// -----------------------------------------------------------------------------

const API = 'https://api.netlify.com/api/v1';

export const handler = async (event, context) => {
  // 1) Require a logged-in editor (Netlify Identity).
  const user = context.clientContext && context.clientContext.user;
  if (!user) {
    return json(401, { error: 'Please log in with your editor account to view submissions.' });
  }

  // 2) Read server-side config.
  const token = process.env.NETLIFY_API_TOKEN;
  const siteId = process.env.SITE_ID || process.env.NETLIFY_SITE_ID;
  if (!token || !siteId) {
    return json(500, {
      error:
        'Server not configured. An admin must set NETLIFY_API_TOKEN and SITE_ID ' +
        'in the Netlify environment variables (see README), then redeploy.',
    });
  }

  const headers = { Authorization: `Bearer ${token}` };

  try {
    // 3) List the forms for this site.
    const formsRes = await fetch(`${API}/sites/${siteId}/forms`, { headers });
    if (!formsRes.ok) {
      return json(formsRes.status, {
        error: 'Could not load forms from Netlify.',
        detail: await safeText(formsRes),
      });
    }
    const forms = await formsRes.json();

    // 4) Fetch submissions for each form (newest first).
    const result = [];
    for (const form of forms) {
      const subsRes = await fetch(`${API}/forms/${form.id}/submissions?per_page=100`, { headers });
      const subs = subsRes.ok ? await subsRes.json() : [];
      subs.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
      result.push({
        id: form.id,
        name: form.name,
        count: form.submission_count,
        submissions: subs.map((s) => ({
          id: s.id,
          created_at: s.created_at,
          data: s.data || {},
        })),
      });
    }

    // Stable, friendly order for the four known forms; others after.
    const order = ['register', 'expertQa', 'questionOfMonth', 'alumniUpdate'];
    result.sort((a, b) => {
      const ia = order.indexOf(a.name);
      const ib = order.indexOf(b.name);
      return (ia === -1 ? 99 : ia) - (ib === -1 ? 99 : ib);
    });

    return json(200, { forms: result });
  } catch (err) {
    return json(502, { error: 'Unexpected error talking to Netlify.', detail: String(err) });
  }
};

function json(statusCode, body) {
  return {
    statusCode,
    headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' },
    body: JSON.stringify(body),
  };
}

async function safeText(res) {
  try {
    return await res.text();
  } catch {
    return '';
  }
}

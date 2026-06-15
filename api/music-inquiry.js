const RECIPIENT_EMAIL = 'jindrichuvdum@jindrichuvdum.cz';

function escapeHtml(value = '') {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
}

function normalize(value = '') {
  return String(value).trim();
}

function isValidEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function json(response, status, body) {
  response.status(status).json(body);
}

module.exports = async function handler(request, response) {
  if (request.method !== 'POST') {
    response.setHeader('Allow', 'POST');
    return json(response, 405, { error: 'Method not allowed' });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const fromEmail = process.env.CONTACT_FROM_EMAIL;

  if (!apiKey || !fromEmail) {
    return json(response, 500, { error: 'Missing email configuration' });
  }

  const body = request.body || {};

  if (normalize(body.firma)) {
    return json(response, 200, { ok: true });
  }

  const name = normalize(body.jmeno);
  const email = normalize(body.email);
  const peopleCount = normalize(body['pocet-osob']);
  const message = normalize(body.zprava);

  if (!name || !isValidEmail(email) || !message) {
    return json(response, 400, { error: 'Invalid form data' });
  }

  const subject = `Poptavka hudebniho prostoru od ${name}`;
  const text = [
    'Nova poptavka hudebniho prostoru',
    '',
    `Jmeno: ${name}`,
    `E-mail: ${email}`,
    `Pocet osob: ${peopleCount || 'neuvedeno'}`,
    '',
    'Zprava:',
    message
  ].join('\n');

  const html = `
    <h2>Nova poptavka hudebniho prostoru</h2>
    <p><strong>Jmeno:</strong> ${escapeHtml(name)}</p>
    <p><strong>E-mail:</strong> ${escapeHtml(email)}</p>
    <p><strong>Pocet osob:</strong> ${escapeHtml(peopleCount || 'neuvedeno')}</p>
    <p><strong>Zprava:</strong></p>
    <p>${escapeHtml(message).replaceAll('\n', '<br>')}</p>
  `;

  const resendResponse = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      from: fromEmail,
      to: RECIPIENT_EMAIL,
      reply_to: email,
      subject,
      text,
      html
    })
  });

  if (!resendResponse.ok) {
    return json(response, 502, { error: 'Email provider failed' });
  }

  return json(response, 200, { ok: true });
};

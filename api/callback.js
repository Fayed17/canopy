// Step 2 of the editor's GitHub login: swap GitHub's code for a token and hand it to /admin.
module.exports = async (req, res) => {
  const code = new URL(req.url, 'http://x').searchParams.get('code');
  let status = 'error', content = { message: 'Login failed' };
  try {
    const r = await fetch('https://github.com/login/oauth/access_token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({
        client_id: process.env.GITHUB_CLIENT_ID,
        client_secret: process.env.GITHUB_CLIENT_SECRET,
        code,
      }),
    });
    const data = await r.json();
    if (data.access_token) { status = 'success'; content = { token: data.access_token, provider: 'github' }; }
    else content = { message: data.error_description || 'No token returned' };
  } catch (e) { content = { message: e.message }; }
  const msg = JSON.stringify(`authorization:github:${status}:${JSON.stringify(content)}`);
  res.setHeader('Content-Type', 'text/html');
  res.end(`<!doctype html><script>
  (function () {
    function receive(e) {
      window.opener.postMessage(${msg}, e.origin);
      window.removeEventListener('message', receive, false);
    }
    window.addEventListener('message', receive, false);
    window.opener.postMessage('authorizing:github', '*');
  })();
  </script>`);
};

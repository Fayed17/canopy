// Step 1 of the editor's GitHub login: send the user to GitHub.
// Needs Vercel env vars GITHUB_CLIENT_ID and GITHUB_CLIENT_SECRET (see README).
module.exports = (req, res) => {
  const host = req.headers['x-forwarded-host'] || req.headers.host;
  const params = new URLSearchParams({
    client_id: process.env.GITHUB_CLIENT_ID,
    redirect_uri: `https://${host}/api/callback`,
    scope: 'repo,user',
    state: Math.random().toString(36).slice(2),
  });
  res.writeHead(302, { Location: `https://github.com/login/oauth/authorize?${params}` });
  res.end();
};

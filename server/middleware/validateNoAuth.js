export default async function validateNoAuth(req, res, next) {
  return req.isAuthenticated()
    ? res.status(403).json({ error: "Already authenticated." })
    : next();
}

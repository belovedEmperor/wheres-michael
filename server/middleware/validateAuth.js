export default async function validateAuth(req, res, next) {
  return req.isAuthenticated() ? next() : res.sendStatus(401);
}

export default function validateIsAuthorizedUser(req, res, next) {
  return req.user.id === Number(req.body.userId) ? next() : res.sendStatus(401);
}

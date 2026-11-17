export default async function validateNoAuth(req, res, next) {
  return req.isAuthenticated()
    ? res.status(403).json({
        errors: [
          {
            type: "auth",
            title: "Not authenticated",
            status: 403,
            msg: "Already authenticated.",
          },
        ],
      })
    : next();
}

const jwt = require("jsonwebtoken");
const auth = (req, res, next) => {
  try {
    const token = req.headers.authorization;
    if (token) {
      jwt.verify(token, process.env.TOKEN, (err, data) => {
        if (err) {
          return res.status(404).json({ message: "Invalid Token" });
        } else {
          req.user = data;
          next();
        }
      });
    } else {
      return res.status(404).json({ message: "Invalid Authentication" });
    }
  } catch (error) {
    res.status("500").json({ message: error.message });
  }
};
module.exports = auth;

const jwt = require("jsonwebtoken");


const auth = (req, res, next) => {
  const token = req.header("x-auth-token");
  if (!token) return res.status(401).send("Access denied. Token not provided");

  try {
    const decode = jwt.verify(token, process.env.JWT_PRIVATE_KEY);
    req.user = decode;
    next();
  } catch (ex) {
    res.status(400).send("Invalid token");
  }
};

function authorize(...roles) {
  return (req, res, next) => {
    
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ msg: 'Role not authorized' });
    }
    next();
  };
}


module.exports = {auth, authorize}
import jwt from "jsonwebtoken";

const generateToken = (user) => {
    const payload = { sub: user._id };
  
    return new Promise((resolve, reject) => {
      jwt.sign(
        payload,
        process.env.JWT_SECRET,
        { expiresIn: "1h" },
        (err, token) => {
          if (err) {
            reject(err);
            return;
          }
          resolve(token);
        }
      );
    });
  };
  
  export default {generateToken}
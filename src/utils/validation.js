const validator = require("validator");

const validateSignUpData = (req) => {
  const { firstName, lastName, email, password, photoUrl } = req.body;

  if (!firstName || !lastName) {
    throw new Error("Please Enter First and Last Name");
  } else if (!validator.isEmail(email)) {
    throw new Error("Please Enter Valid Email");
  } else if (!validator.isStrongPassword(password)) {
    throw new Error("Please Enter Strong Password");
  }
};

const validateProfileEditData = (req) => {
  const allowedEditFields = ["firstName", "lastName", "email", "gender"];

  const isEditAllowed = Object.keys(req.body).every((field) =>
    allowedEditFields.includes(field)
  );

  return isEditAllowed;
};

module.exports = { validateSignUpData, validateProfileEditData };

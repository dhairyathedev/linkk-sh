const bcrypt = require("bcrypt");

export async function Seal(pass) {
  // Generate a salt

  // Hash the password using the salt
  const hash = await bcrypt.hash(pass, 10);

  return hash;
}

export async function isPasswordMatch(hash, password) {
  const result = await bcrypt.compare(password, hash);
  return result;
}

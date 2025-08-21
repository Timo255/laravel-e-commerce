import axios from "../axiosApi/axios";

export const verifyResetToken = async (token) => {
  try {
    await axios.post("/forgot-pwd/verify-reset-token", JSON.stringify({ token }));
    return true;
  } catch (err) {
    console.log(err.message);
    return false;
  }
};

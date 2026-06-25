// register, login, logout, OTP

export async function register(req, res) {
  res.json({
    success: true,
    message: "Register",
  });
}

export async function login(req, res) {
  res.json({ success: true, message: "login" });
}
export async function logout(req, res) {
  res.json({ success: true, message: "logout" });
}
export async function sendResetOtp(req, res) {
  res.json({ success: true, message: "sendResetOtp" });
}
export async function verifyResetOtp(req, res) {
  res.json({ success: true, message: "verifyResetOtp" });
}
export async function resetPassword(req, res) {
  res.json({ success: true, message: "resetPassword" });
}

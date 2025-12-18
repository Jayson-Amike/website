// src/utils/buyNowRedirect.js
export const buyNowRedirect = (session, navigate) => {
  if (session) {
    navigate("/checkout");
  } else {
    // Remember redirect after login
    localStorage.setItem("post_login_redirect", "/checkout");
    navigate("/login");
  }
};

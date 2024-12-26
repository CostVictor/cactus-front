export const redirectToLogin = () => {
  const currentPath = window.location.pathname;
  window.location.href = `/login?redirectTo=${currentPath}`;
};

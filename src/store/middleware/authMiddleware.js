import api from '../../services/api';

export const authMiddleware = (store) => (next) => (
  action
) => {
  const state = store.getState();
  const { token } = state.user;

  if (token) {
    // insert token from store to axios request
    // api.updateRequestInterceptor(token);
    // force logout when token is expired
    api.updateResponseInterceptor(() => {
      window.location.href = '/';
    });
  }

  return next(action);
};

export default authMiddleware;

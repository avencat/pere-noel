import config from '../config';

function scope(prefix) {
  const { api: { version } } = config;

  return `/api/v${version}/${prefix}`;
}

function success(res) {
  return payload => res.send({
    success: true,
    data: { ...payload },
  });
}

function error(res) {
  return payload => res.send({
    success: false,
    data: { ...payload },
  });
}

const api = {
  scope,
  success,
  error,
};

export default api;

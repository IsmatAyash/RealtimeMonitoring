import http from './httpService';

const rtmApi = '/rtm';
const userApi = '/user';

export function getRtm() {
  return http.get(rtmApi, { withCredentials: true });
}

export function getUser() {
  return http.getUser(userApi, { withCredentials: true });
}

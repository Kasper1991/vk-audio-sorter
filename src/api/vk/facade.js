import {LOGIN_STATUSES} from './constants';

export default class VKFacade {

  constructor(apiId, permissions) {
    this.apiId = apiId;
    this.permissions = permissions;
  }

  initialize() {
    VK.init({apiId: this.apiId});
  }

  login() {
    return new Promise((resolve, reject) => {
      VK.Auth.login(({session, status}) => {
        if(status = LOGIN_STATUSES.OK) {
          resolve(session.user);
        } else {
          reject(status);
        }
      }, this.permissions);
    })
  }

  getAllAudio(user_ids) {
    return new Promise((resolve, reject) => {
      VK.Api.call('audio.get', {user_ids}, ({response}) => {
        resolve(response);
      });
    })
  }
}
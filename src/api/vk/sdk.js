import VKFacade from './facade';
import {API_ID, PERMISSIONS_MASK} from './constants';

const facade = new VKFacade(API_ID, PERMISSIONS_MASK);

export default class VKSDK {

  constructor() {
    facade.initialize();
  }

  setUserId() {
    facade
      .login()
      .then(({id}) => {
        this.userId = id;
      })
  }

  getUserAudio() {
    return facade.getAllAudio(this.userId);
  }
}
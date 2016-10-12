import VKFacade from './facade';

describe("VKFacade", () => {

  describe('initialize()', () => {

    it("should initialize without error", () => {
      let vkFacade = new VKFacade();
      vkFacade.initialize();
    })
  })

});
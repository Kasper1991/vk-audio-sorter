import {Track} from './track';

describe('Track', () => {

    let track: Track,
        params = {
            title: 'track',
            id: 123456,
            artist: {}
        };

    beforeEach(() => {
        track = new Track(params);
    });

    it('should have id, title and artist', () => {
       track.should.have.all.keys(['id', 'title', 'artist']);
    });
});
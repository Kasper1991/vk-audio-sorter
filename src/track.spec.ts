import {Track} from './track';
import {Artist} from './artist';

describe('Track', () => {

    let track: Track,
        params = {
            title: 'track',
            id: 123456,
            artist: new Artist({
                title: 'title'
            })
        };

    before(() => {
        track = new Track(params);
    });

    it('should have id, title and artist', () => {
       track.should.contain.all.keys(['id', 'title', 'artist']);
    });
});
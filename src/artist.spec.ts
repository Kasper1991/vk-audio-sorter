import {Track} from './track';
import {Artist} from './artist';

describe('Artist', () => {

    let artist: Artist;

    before(() => {
        artist = new Artist({
            title: 'title'
        });
    });

    describe('after initialization', () => {
        it('should have title and tracks', () => {
            artist.should.have.all.keys(['title', 'tracks']);
        })
    });

    describe('#addTrack()', () => {
        it('should add track to tracks', () => {
            let prevTracksLength = artist.tracks.length,
                track = new Track({
                    title: 'title',
                    id: 123456789,
                    artist: artist
                });

            artist.addTrack(track);
            artist.tracks.should.to.have.lengthOf(prevTracksLength + 1);
        })
    });
});
import {Track} from './track';
import {Artist} from './artist';

describe('Artist', () => {

    let artist: Artist;

    beforeEach(() => {
        artist = new Artist({
            title: 'title'
        });
    });

    describe('after initialization', () => {
        it('should have title and tracks', () => {
            artist.should.contains.all.keys(['title', 'tracks']);
        })
    });

    describe('#addTrack()', () => {

        let track: Track;

        before(() => {
            track = new Track({
                title: 'title 1',
                id: 123456789,
                artist: artist
            });
        });

        it('should add track to tracks collection', () => {
            let prevTracksLength = artist.tracks.length;

            artist
                .addTrack(track)
                .then(() => {
                    artist.tracks.should.have.lengthOf(prevTracksLength + 1);
                })
        });

        it('should set track.shouldBeRemoved to false if track with the same title is unique', () => {
            let newTrack = new Track({
                title: 'title 2',
                id: 123456789,
                artist: artist
            });

            artist
                .addTrack(track)
                .then(() => {
                    return artist.addTrack(newTrack);
                })
                .then(() => {
                    newTrack.shouldBeRemoved.should.be.false;
                })
        });

        it('should set track.shouldBeRemoved to true if track with the same title already exists', () => {
            let existedTrack = new Track({
                title: 'title 1',
                id: 123456789,
                artist: artist
            });

            artist
                .addTrack(track)
                .then(() => {
                    return artist.addTrack(existedTrack);
                })
                .then(() => {
                    existedTrack.shouldBeRemoved.should.be.ok;
                })
        })
    });
});
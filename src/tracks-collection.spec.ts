import {TrackCollection} from './tracks-collection';
import {Track} from './track';

describe('TrackCollection', () => {

    let collection: TrackCollection,
        params = {
            title: 'title',
            id: 123456789,
            artist: {}
        };

    beforeEach(() => {
        collection = new TrackCollection();
    });

    describe('after initialization', () => {
        it('should contains array of tracks', () => {
            collection.tracks.should.be.an('array');
        });
    });

    describe('#createAndAddTrack()', () => {

        it('should return new Track instance', () => {
            let track: Track = collection.createAndAddTrack(params);
            track.should.be.instanceof(Track);
        });

        it('should add track to array of tracks', () => {
            let prevTracksLength = collection.tracks.length;
            collection.createAndAddTrack(params);
            collection.tracks.should.to.have.lengthOf(prevTracksLength + 1);
        })
    });

    describe('length', () => {
        it('should equal length of tracks array', () => {
            collection.length.should.equal(collection.tracks.length);
            collection.createAndAddTrack(params);
            collection.length.should.equal(collection.tracks.length);
        })
    })
});
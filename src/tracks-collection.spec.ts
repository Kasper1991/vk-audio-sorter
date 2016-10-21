import {TracksCollection} from './tracks-collection';
import {CollectionItem} from './collection';
import {Track} from './track';
import {Artist} from './artist';

let chai = require('chai'),
    chaiAsPromised = require('chai-as-promised'),
    expect = chai.expect;

chai.use(chaiAsPromised);

describe('TrackCollection', () => {

    let collection: TracksCollection,
        params = {
            title: 'title',
            id: 123456789,
            artist: {}
        };

    before(() => {
        collection = new TracksCollection();
    });

    describe('after initialization', () => {
        it('should contains array of tracks', () => {
            collection.items.should.be.an('array');
        });
    });

    describe('#createAndAddTrack()', () => {

        it('should return new Track instance', () => {
            let track: CollectionItem = collection.createAndAdd(params);
            track.should.be.instanceof(Track);
        });

        it('should add track to array of tracks', () => {
            let prevTracksLength = collection.items.length;
            collection.createAndAdd(params);
            collection.items.should.to.have.lengthOf(prevTracksLength + 1);
        })
    });

    describe('length', () => {
        it('should equal length of tracks array', () => {
            collection.length.should.equal(collection.items.length);
            collection.createAndAdd(params);
            collection.length.should.equal(collection.items.length);
        })
    });

    describe('#create()', () => {
        it('should return new Track instance', () => {
            let track: CollectionItem = collection.create(params);
            track.should.be.instanceof(Track);
        });
    });

    describe("#findByTitle()", () => {

        before(() => {
            collection.createAndAdd({
                title: 'track 1',
                id: 123456789,
                artist: {}
            })
        });

        describe('should return', () => {

            it('track if it is exists', () => {
                let track = collection.findByTitle('track 1');
                expect(track).eventually.to.be.instanceOf(Track);
            });

            it('undefined if track is\'nt exists', () => {
                let track = collection.findByTitle('track 3');
                expect(track).eventually.to.be.undefined;
            });
        });

        describe('should find', () => {

            it('without case sensitivity', () => {
                let track = collection.findByTitle('TRACK 1');
                expect(track).eventually.to.be.instanceOf(Track);
            });

            it('with whitespace at begin or/and end of title', () => {
                let track = collection.findByTitle(' track 1 ');
                expect(track).eventually.to.be.instanceOf(Track);
            });
        });
    });

    describe('#add()', () => {
        it('should add track to array of tracks', () => {
            let prevTracksLength = collection.items.length,
                artist = new Artist({
                    title: 'title'
                }),
                track: Track = new Track({
                    title: 'title',
                    id: 123456789,
                    artist: artist
                });

            collection.add(track);
            collection.items.should.to.have.lengthOf(prevTracksLength + 1);
        })
    })
});
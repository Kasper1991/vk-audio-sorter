import {TrackCollection} from './tracks-collection';
import {CollectionItem} from './collection';
import {Track} from './track';

let should = require('chai').should();

describe('TrackCollection', () => {

    let collection: TrackCollection,
        params = {
            title: 'title',
            id: 123456789,
            artist: {}
        };

    before(() => {
        collection = new TrackCollection();
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

            it('artist if it is exists', () => {
                collection.findByTitle('track 1').should.be.an('object');
            });

            it('undefined if artist is\'nt exists', () => {
                should.not.exist(collection.findByTitle('track 3'));
            });
        });

        describe('should find', () => {

            it('without case sensitivity', () => {
                collection.findByTitle('TRACK 1').should.be.an('object');
            });

            it('with whitespace at begin or/and end of title', () => {
                collection.findByTitle(' track 1 ').should.be.an('object');
            });
        });
    });
});
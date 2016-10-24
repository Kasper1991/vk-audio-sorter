import {Track} from './track';
import {Artist} from './artist';
import {checkLengthChange} from './spec-utils';
import {TracksCollection} from './tracks-collection';

let chai = require('chai'),
    chaiAsPromised = require('chai-as-promised'),
    expect = chai.expect;

chai.use(chaiAsPromised);

describe('TrackCollection', () => {

    let track: Track,
        artist: Artist,
        collection: TracksCollection,
        params;

    before(() => {
        artist = new Artist({title: 'title'});
        params = {
            title: 'title',
            id: 123456789,
            artist
        };
        track = new Track(params);
    });

    beforeEach(() => {
        collection = new TracksCollection({});
    });

    describe('after initialization', () => {
        it('should contains empty array of tracks', () => {
            expect(collection.items).to.have.lengthOf(0);
        });
    });

    describe('length', () => {
        it('should equal length of tracks array', () => {
            checkLengthChange(
                collection,
                () => collection.add(track)
            );
        })
    });

    describe('#process()', () => {

        it('should return Track instance', () => {
            let result = collection.process(params);
            expect(result).eventually.to.be.instanceof(Track);
        });

        it('should call #create()', () => {
            let spy = sinon.spy(collection, "create");
            return collection
                .process(params)
                .then(() => {
                    return expect(spy.calledWithExactly(params)).to.be.ok;
                })
        });

        it('should call #processItem() with Track instance as argument', () => {
            let spy = sinon.spy(collection, "processItem");
            return collection
                .process(params)
                .then(() => {
                    return expect(spy.firstCall.args[0]).to.be.instanceOf(Track);
                })
        });

    });

    describe('#create()', () => {
        it('should return Track instance', () => {
            let result = collection.create(params);
            expect(result).to.be.instanceof(Track);
        });
    });

    describe('#add()', () => {

        it('should add track to array of tracks', () => {
            checkLengthChange(
                collection.items,
                () => collection.add(track)
            );
        });

        it('should return Track instance', () => {
            let result = collection.add(track);
            expect(result).to.be.instanceof(Track);
        });
    });

    describe("#find()", () => {

        beforeEach(() => {
            return collection.add(track);
        });

        it('should return track if it is exists', () => {
            let result = collection.find(track);
            return expect(result).eventually.to.be.instanceOf(Track);
        });

        it('should return undefined if track is\'nt exists', () => {
            let otherTrack = new Track(Object.assign({}, params, {
                    title: 'other title'
                })),
                result = collection.find(otherTrack);

            return expect(result).eventually.to.be.undefined;
        });

        it('should call #isEquals() at least once', () => {
            let spy = sinon.spy(collection, 'isEquals');

            return collection
                .find(track)
                .then(() => {
                    return expect(spy.called).to.be.at.least(1);
                })
        });
    });

    describe('#isEquals()', () => {

        it('should return true if titles are equal', () => {
            let artist1 = new Track(params),
                artist2 = new Track(params),
                result = collection.isEquals(artist1, artist2);

            return expect(result).eventually.to.be.ok;
        });

        it('should return true if titles are\'nt equal', () => {
            let artist1 = new Track(params),
                artist2 = new Track(Object.assign({}, params, {
                    title: 'other title'
                })),
                result = collection.isEquals(artist1, artist2);

            return expect(result).eventually.to.be.false;
        });

        it('should compare without case sensitivity', () => {
            let artist1 = new Track(params),
                artist2 = new Track(Object.assign(params, {
                    title: 'TITLE'
                })),
                result = collection.isEquals(artist1, artist2);

            return expect(result).eventually.to.be.ok;
        });

        it('should compare with whitespace at begin or/and end of title', () => {
            let artist1 = new Track(params),
                artist2 = new Track(Object.assign({}, params, {
                    title: ' title '
                })),
                result = collection.isEquals(artist1, artist2);

            return expect(result).eventually.to.be.ok;
        });
    });
});
import {Track} from './track';
import {Artist} from './artist';
import {checkLengthChange} from './spec-utils';
import {TracksCollection} from './tracks-collection';

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

    beforeEach(() => {
        collection = new TracksCollection();
    });

    describe('after initialization', () => {
        it('should contains empty array of tracks', () => {
            expect(collection.items).to.have.lengthOf(0);
        });
    });

    describe.skip('length', () => {
        it('should equal length of tracks array', () => {
            checkLengthChange(
                collection,
                () => collection.createAndAdd(params)
            );
        })
    });

    describe.skip('#createAndAdd()', () => {

        it('should return Track instance', () => {
            let track = collection.createAndAdd(params);
            expect(track).to.be.instanceof(Track);
        });

        it('should call #create() with necessary parameters', () => {
            var spy = sinon.spy(collection, "create");
            collection.createAndAdd(params);
            expect(spy.calledWithExactly(params)).to.be.ok;
        });

        it('should call #add() with Track instance', () => {
            var spy = sinon.spy(collection, "add");
            collection.createAndAdd(params);
            expect(spy.firstCall.args[0]).to.be.instanceOf(Track);
        });
    });

    describe('#create()', () => {
        it('should return new Track instance', () => {
            let track = collection.create(params);
            expect(track).to.be.instanceof(Track);
        });
    });

    describe('#add()', () => {
        it('should add track to array of tracks', () => {
            let track = new Track(params);

            checkLengthChange(
                collection.items,
                () => collection.add(track)
            );
        })
    });

    describe("#findByTitle()", () => {

        beforeEach(() => {
            collection.createAndAdd(params);
        });

        it('should return track if it is exists', () => {
            let track = collection.findByTitle('title');
            return expect(track).eventually.to.be.instanceOf(Track);
        });

        it('should return undefined if track is\'nt exists', () => {
            let track = collection.findByTitle('other title');
            return expect(track).eventually.to.be.undefined;
        });
    });

    describe('#compareTitles()', () => {

        it('should return true if titles are equal', () => {
            let result = collection.compareTitles('title', 'title');
            return expect(result).eventually.to.be.ok;
        });

        it('should return true if titles are\'nt equal', () => {
            let result = collection.compareTitles('title 1', 'title 2');
            return expect(result).eventually.to.be.false;
        });

        it('should compare without case sensitivity', () => {
            let result = collection.compareTitles('TRACK', 'track');
            return expect(result).eventually.to.be.ok;
        });

        it('should compare with whitespace at begin or/and end of title', () => {
            let result = collection.compareTitles(' track  ', 'track');
            return expect(result).eventually.to.be.ok;
        });
    });

    describe('#process()', () => {
        it('should return Track instance', () => {
            let track = collection.process(params);
            return expect(track).eventually.to.be.instanceof(Track);
        });
    });
});
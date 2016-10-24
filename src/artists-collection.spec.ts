import {Artist} from './artist';
import {checkLengthChange} from './spec-utils';
import {ArtistsCollection} from './artists-collection';

let chai = require('chai'),
    chaiAsPromised = require('chai-as-promised'),
    expect = chai.expect;

chai.use(chaiAsPromised);

describe('ArtistsCollection', () => {

    let collection: ArtistsCollection,
        params = {
            title: 'title'
        };

    beforeEach(() => {
        collection = new ArtistsCollection();
    });

    describe('after initialization', () => {
        it('should contain array of artists', () => {
            expect(collection.items).to.have.lengthOf(0);
        })
    });

    describe.skip('length', () => {
        it('should return length of artists array', () => {
            checkLengthChange(
                collection,
                () => collection.createAndAdd(params)
            );
        })
    });

    describe.skip('#createAndAdd()', () => {

        it('should return Artist instance', () => {
            let track = collection.createAndAdd(params);
            expect(track).to.be.instanceof(Artist);
        });

        it('should call #create() with necessary parameters', () => {
            var spy = sinon.spy(collection, "create");
            collection.createAndAdd(params);
            expect(spy.calledWithExactly(params)).to.be.ok;
        });

        it('should call #add() with Artist instance', () => {
            var spy = sinon.spy(collection, "add");
            collection.createAndAdd(params);
            expect(spy.firstCall.args[0]).to.be.instanceOf(Artist);
        });

    });

    describe('#create()', () => {
        it('should return Artist instance', () => {
            let track = collection.create(params);
            expect(track).to.be.instanceof(Artist);
        });
    });

    describe('#add()', () => {
        it('should add artist to array of artists', () => {
            let artist = new Artist(params);

            checkLengthChange(
                collection.items,
                () => collection.add(artist)
            );
        })
    });

    describe.skip("#findByTitle()", () => {

        beforeEach(() => {
            collection.createAndAdd(params);
        });

        it('should return track if it is exists', () => {
            let artist = collection.findByTitle('title');
            return expect(artist).eventually.to.be.instanceOf(Artist);
        });

        it('should return undefined if track is\'nt exists', () => {
            let artist = collection.findByTitle('other title');
            return expect(artist).eventually.to.be.undefined;
        });

        it('should find without case sensitivity', () => {
            let artist = collection.findByTitle('TITLE');
            return expect(artist).eventually.to.be.instanceOf(Artist);
        });

        it('should find with whitespace at begin or/and end of title', () => {
            let artist = collection.findByTitle(' title  ');
            return expect(artist).eventually.to.be.instanceOf(Artist);
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
});
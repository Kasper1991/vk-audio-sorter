import {Artist} from './artist';
import {checkLengthChange} from './spec-utils';
import {ArtistsCollection} from './artists-collection';

let chai = require('chai'),
    chaiAsPromised = require('chai-as-promised'),
    expect = chai.expect;

chai.use(chaiAsPromised);

describe('ArtistsCollection', () => {

    let artist: Artist,
        collection: ArtistsCollection,
        params = {
            title: 'title'
        };

    before(() => {
        artist = new Artist(params);
    });

    beforeEach(() => {
        collection = new ArtistsCollection({});
    });

    describe('after initialization', () => {
        it('should contain array of artists', () => {
            expect(collection.items).to.have.lengthOf(0);
        })
    });

    describe('length', () => {
        it('should return length of artists array', () => {
            checkLengthChange(
                collection,
                () => collection.add(artist)
            );
        })
    });

    describe('#process()', () => {

        it('should return Artist instance', () => {
            let result = collection.process(params);
            expect(result).eventually.to.be.instanceof(Artist);
        });

        it('should call #create()', () => {
            let spy = sinon.spy(collection, "create");
            return collection
                .process(params)
                .then(() => {
                    return expect(spy.calledWithExactly(params)).to.be.ok;
                })
        });

        it('should call #processItem() with Artist instance as argument', () => {
            let spy = sinon.spy(collection, "processItem");
            return collection
                .process(params)
                .then(() => {
                    return expect(spy.firstCall.args[0]).to.be.instanceOf(Artist);
                })
        });
    });

    describe('#create()', () => {
        it('should return Artist instance', () => {
            let result = collection.create(params);
            expect(result).to.be.instanceof(Artist);
        });
    });

    describe('#add()', () => {

        it('should add artist to array of artists', () => {
            checkLengthChange(
                collection.items,
                () => collection.add(artist)
            );
        });

        it('should return Artist instance', () => {
            let result = collection.add(artist);
            expect(result).to.be.instanceof(Artist);
        });
    });

    describe("#find()", () => {

        beforeEach(() => {
            return collection.add(artist);
        });

        it('should return track if it is exists', () => {
            let otherArtist = new Artist({title: 'title'}),
                result = collection.find(otherArtist);

            return expect(result).eventually.to.be.instanceOf(Artist);
        });

        it('should return undefined if track is\'nt exists', () => {
            let otherArtist = new Artist({title: 'other title'}),
                result = collection.find(otherArtist);

            return expect(result).eventually.to.be.undefined;
        });

        it('should call #isEquals() at least once', () => {
            let spy = sinon.spy(collection, 'isEquals');

            return collection
                .find(artist)
                .then(() => {
                    return expect(spy.called).to.be.at.least(1);
                })
        });
    });

    describe('#isEquals()', () => {

        it('should return true if titles are equal', () => {
            let artist1 = new Artist(params),
                artist2 = new Artist(params),
                result = collection.isEquals(artist1, artist2);

            return expect(result).eventually.to.be.ok;
        });

        it('should return true if titles are\'nt equal', () => {
            let artist1 = new Artist({title: 'title'}),
                artist2 = new Artist({title: 'other title'}),
                result = collection.isEquals(artist1, artist2);

            return expect(result).eventually.to.be.false;
        });

        it('should compare without case sensitivity', () => {
            let artist1 = new Artist({title: 'title'}),
                artist2 = new Artist({title: 'TITLE'}),
                result = collection.isEquals(artist1, artist2);

            return expect(result).eventually.to.be.ok;
        });

        it('should compare with whitespace at begin or/and end of title', () => {
            let artist1 = new Artist({title: 'title'}),
                artist2 = new Artist({title: ' title '}),
                result = collection.isEquals(artist1, artist2);

            return expect(result).eventually.to.be.ok;
        });
    });
});
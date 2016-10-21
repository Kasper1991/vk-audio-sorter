import {ArtistsCollection} from './artists-collection';
import {CollectionItem} from './collection';
import {Artist} from './artist';

let chai = require('chai'),
    chaiAsPromised = require('chai-as-promised'),
    expect = chai.expect;

chai.use(chaiAsPromised);

describe('ArtistsCollection', () => {

    let collection: ArtistsCollection,
        params = {
            title: 'title'
        };

    before(() => {
        collection = new ArtistsCollection();
    });

    describe('after initialization', () => {
        it('should contain artists array', () => {
            collection.items.should.be.an('array');
        })
    });

    describe('length', () => {
        it('should return length of artists array', () => {
            collection.length.should.equal(collection.items.length);
            collection.createAndAdd(params);
            collection.length.should.equal(collection.items.length);
        })
    });

    describe('#createAndAdd()', () => {

        it('should return new Artist instance', () => {
            let track: CollectionItem = collection.createAndAdd(params);
            track.should.be.instanceof(Artist);
        });

        it('should add track to array of tracks', () => {
            let prevTracksLength = collection.items.length;
            collection.createAndAdd(params);
            collection.items.should.to.have.lengthOf(prevTracksLength + 1);
        })
    });

    describe("#findByTitle()", () => {

        before(() => {
            collection.createAndAdd({
                title: 'artist 1'
            })
        });

        describe('should return', () => {

            it('artist if it is exists', () => {
                let artist = collection.findByTitle('artist 1');
                expect(artist).eventually.to.be.instanceOf(Artist);
            });

            it('undefined if artist is\'nt exists', () => {
                let artist = collection.findByTitle('artist 3');
                expect(artist).eventually.to.be.undefined;
            });
        });

        describe('should find', () => {

            it('without case sensitivity', () => {
                let artist = collection.findByTitle('ARTIST 1');
                expect(artist).eventually.to.be.instanceOf(Artist);
            });

            it('with whitespace at begin or/and end of title', () => {
                let artist = collection.findByTitle(' artist 1 ');
                expect(artist).eventually.to.be.instanceOf(Artist);
            });
        });
    });

    describe('#create()', () => {
        it('should return new Artist instance', () => {
            let track: CollectionItem = collection.create(params);
            track.should.be.instanceof(Artist);
        });
    });

    describe('#add()', () => {
        it('should add artist to array of artists', () => {
            let prevTracksLength = collection.items.length,
                artist = new Artist({
                    title: 'title'
                });

            collection.add(artist);
            collection.items.should.to.have.lengthOf(prevTracksLength + 1);
        })
    })
});
import {ArtistsCollection} from './artists-collection';
import {CollectionItem} from './collection';
import {Artist} from './artist';

let should = require('chai').should();

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
                collection.findByTitle('artist 1').should.be.an('object');
            });

            it('undefined if artist is\'nt exists', () => {
                should.not.exist(collection.findByTitle('artist 3'));
            });
        });

        describe('should find', () => {

            it('without case sensitivity', () => {
                collection.findByTitle('ARTIST 1').should.be.an('object');
            });

            it('with whitespace at begin or/and end of title', () => {
                collection.findByTitle(' artist 1 ').should.be.an('object');
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
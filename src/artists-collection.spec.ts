import {ArtistsCollection} from './artists-collection';
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
            collection.artists.should.be.an('array');
        })
    });

    describe('#createAndAddArtist()', () => {

        it('should return new Artist instance', () => {
            let track: Artist = collection.createAndAddArtist(params);
            track.should.be.instanceof(Artist);
        });

        it('should add track to array of tracks', () => {
            let prevTracksLength = collection.artists.length;
            collection.createAndAddArtist(params);
            collection.artists.should.to.have.lengthOf(prevTracksLength + 1);
        })
    });


    describe("#findArtistByTitle()", () => {

        before(() => {
            collection.createAndAddArtist({
                title: 'artist 1'
            })
        });

        describe('should return', () => {

            it('artist if it is exists', () => {
                collection.findArtistByTitle('artist 1').should.be.an('object');
            });

            it('undefined if artist is\'nt exists', () => {
                should.not.exist(collection.findArtistByTitle('artist 3'));
            });
        });

        describe('should find', () => {

            it('without case sensitivity', () => {
                collection.findArtistByTitle('ARTIST 1').should.be.an('object');
            });

            it('with whitespace at begin or/and end of title', () => {
                collection.findArtistByTitle(' artist 1 ').should.be.an('object');
            });
        });
    });

    describe('length', () => {
        it('should equal length of tracks array', () => {
            collection.length.should.equal(collection.artists.length);
            collection.createAndAddArtist(params);
            collection.length.should.equal(collection.artists.length);
        })
    })
});
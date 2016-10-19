import Parser from './parser';

let should = require('chai').should();

chai.should();

describe('Parser', () => {

    let parser: Parser,
        audios = [
            {
                title: 'audio 1',
                artist: 'artist 1'
            },
            {
                title: 'audio 2',
                artist: 'artist 2',
            },
            {
                title: 'audio 3',
                artist: 'artist 2'
            }
        ];

    beforeEach(() => {
        parser = new Parser();
        parser.set(audios);
    });

    describe('#set()', () => {

        it('should put to tracks all audios', () => {
            parser.tracks.should.to.have.length(3);
        });

        it('should add track to each artist', () => {
            parser.tracks.forEach((track) => {
                track.artist.should.to.be.an('object');
            })
        });

        it('should put to artists only unique artists', () => {
            parser.artists.should.have.length(2);
        });

        it('should add to artist at least one track', () => {
            parser.artists.forEach((artist) => {
                artist.tracks.should.to.have.length.at.least(1);
            })
        });
    });

    describe("#findArtistByTitle()", () => {

        describe('should return', () => {

            it('artist if it is exists', () => {
                parser.findArtistByTitle('artist 1').should.to.be.an('object');
            });

            it('undefined if artist is\'nt exists', () => {
                should.not.exist(parser.findArtistByTitle('artist 3'));
            });
        });

        describe('should find', () => {

            it('without case sensitivity', () => {
                parser.findArtistByTitle('ARTIST 1').should.to.be.an('object');
            });

            it('with whitespace at begin or/and end of title', () => {
                parser.findArtistByTitle(' artist 1 ').should.to.be.an('object');
            });
        });
    });
});


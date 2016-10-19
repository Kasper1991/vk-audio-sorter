import Parser from './parser';

//let chai = require('chai');

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

    describe('#set', () => {

        it('tracks should contain all audios', () => {
            parser.tracks.should.to.have.length(3);
        });

        it('each track should contain artist', () => {
            parser.tracks.forEach((track) => {
                track.artist.should.to.be.an('object');
            })
        });

        it('artists should contain only unique artists', () => {
            parser.artists.should.have.length(2);
        });

        it('each artist should contain at least one track', () => {
            parser.artists.forEach((artist) => {
                artist.tracks.should.to.have.length.at.least(1);
            })
        });

        it('each artist should contain their tracks', () => {
            parser.artists.forEach((artist) => {
                artist.tracks.should.to.be.an('array');
            })
        });
    });
});


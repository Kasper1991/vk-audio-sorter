import {Track} from './track';
import {Parser} from './parser';
import {Artist} from './artist';
import {VKAudio} from './vk-audio';
import {checkLengthChangeAsync} from './spec-utils';

let chai = require('chai'),
    expect = chai.expect;

describe('Parser', () => {
    let parser: Parser,
        audios: VKAudio[] = [
            {
                title: 'audio 1',
                artist: 'artist 1',
                aid: 1
            },
            {
                title: 'audio 2',
                artist: 'artist 2',
                aid: 2
            },
            {
                title: 'audio 3',
                artist: 'artist 2',
                aid: 3
            }
        ];

    beforeEach(() => {
        parser = new Parser();
    });

    describe('#setAudios()', () => {

        it('should call #setAudio() for each audio', (done) => {
            var spy = sinon.spy(parser, "setAudio");
            parser
                .setAudios(audios)
                .then(() => {
                    expect(spy.callCount).to.be.equal(audios.length);
                    done();
                });
        });

        it('should call #setAudio() with audio as argument', (done) => {
            var spy = sinon.spy(parser, "setAudio");
            parser
                .setAudios(audios)
                .then(() => {
                    audios.forEach((audio: VKAudio) => {
                        expect(spy.calledWithExactly(audio)).to.be.ok;
                    });
                    done();
                });
        });
    });

    describe('#setAudio()', () => {

        it('should add track to tracks collection', (done) => {
            checkLengthChangeAsync(
                parser.tracks,
                parser.setAudio(audios[0])
            ). then(done);
        });

        it('should add artist to track', (done) => {
            parser
                .setAudio(audios[0])
                .then(() => {
                    expect(parser.tracks.items[0].artist).to.be.instanceOf(Artist);
                    done();
                });
        });

        it('should push to artists collection artist with unique title only', (done) => {
            let promise = parser
                .setAudio(audios[0])
                .then(() => parser.setAudio(audios[0]));

            checkLengthChangeAsync(parser.artists, promise).then(done);
        });

        it('should add to artist at least one track', (done) => {
            parser
                .setAudio(audios[0])
                .then(() => {
                    expect(parser.artists.items[0].tracks).have.length.at.least(1);
                    done();
                });
        });
    })
});


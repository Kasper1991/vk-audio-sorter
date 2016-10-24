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

        it('should call #setAudio() for each audio', () => {
            var spy = sinon.spy(parser, "setAudio");
            return parser
                .setAudios(audios)
                .then(() => {
                    return expect(spy.callCount).to.be.equal(audios.length);
                });
        });

        it('should call #setAudio() with audio as argument', () => {
            var spy = sinon.spy(parser, "setAudio");
            return parser
                .setAudios(audios)
                .then(() => {
                    return audios.forEach((audio: VKAudio) => {
                        return expect(spy.calledWithExactly(audio)).to.be.ok;
                    });
                });
        });
    });

    describe('#setAudio()', () => {

        it('should add track to tracks collection', () => {
            return checkLengthChangeAsync(
                parser.tracks,
                parser.setAudio(audios[0])
            );
        });

        it('should add artist to track', () => {
            return parser
                .setAudio(audios[0])
                .then(() => {
                    return expect(parser.tracks.items[0].artist).to.be.instanceOf(Artist);
                });
        });

        it('should push to artists collection artist with unique title only', () => {
            return parser
                .setAudio(audios[0])
                .then(() => parser.setAudio(audios[0]))
                .then(() => {
                    expect(parser.artists.length).to.equals(1);
                })
        });

        it('should add to artist at least one track', () => {
            return parser
                .setAudio(audios[0])
                .then(() => {
                    return expect(parser.artists.items[0].tracks).have.length.at.least(1);
                });
        });
    })
});


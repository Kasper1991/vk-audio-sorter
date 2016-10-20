import {Track} from './track';
import {Parser} from './parser';
import {Artist} from './artist';
import {VKAudio} from './vk-audio';

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

    before(() => {
        parser = new Parser();
        parser.set(audios);
    });

    describe('#set()', () => {

        it('should put to tracks all audios', () => {
            parser.tracks.should.have.length(3);
        });

        it('should add track to each artist', () => {
            parser.tracks.items.forEach((track: Track) => {
                track.artist.should.be.an('object');
            })
        });

        it('should put to artists only unique artists', () => {
            parser.artists.should.have.length(2);
        });

        it('should add to artist at least one track', () => {
            parser.artists.items.forEach((artist: Artist) => {
                artist.tracks.should.have.length.at.least(1);
            })
        });
    });
});


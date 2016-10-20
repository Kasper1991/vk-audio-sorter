import {Track} from './track';
import {Artist} from './artist';
import {VKAudio} from './vk-audio';
import {TrackCollection} from './tracks-collection';
import {ArtistsCollection} from './artists-collection';

export class Parser{

    tracks: TrackCollection = new TrackCollection();
    artists: ArtistsCollection = new ArtistsCollection();

    public set(audios: VKAudio[]) : void {
        audios.forEach((audio: VKAudio) : void => {
            let artist: Artist = this.artists.findArtistByTitle(audio.artist);

            if(!artist) {
                artist = this.artists.createAndAdd({
                    title: audio.artist
                });
            }

            let track: Track = this.tracks.createAndAdd({
                title: audio.title,
                id: audio.aid,
                artist: artist
            });

            artist.addTrack(track);
        })
    }
}
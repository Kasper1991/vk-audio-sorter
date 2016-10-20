import {Track} from './track';
import {Artist} from './artist';
import {VKAudio} from './vk-audio';
import {TracksCollection} from './tracks-collection';
import {ArtistsCollection} from './artists-collection';
import {Collection, CollectionItem} from './collection';

export class Parser{

    public tracks: Collection = new TracksCollection();
    public artists: Collection = new ArtistsCollection();

    public set(audios: VKAudio[]) : void {
        audios.forEach((audio: VKAudio) : void => {
            let artist: CollectionItem = this.artists.findByTitle(audio.artist);

            if(!artist) {
                artist = this.artists.createAndAdd({
                    title: audio.artist
                });
            }

            let track: CollectionItem = this.tracks.createAndAdd({
                title: audio.title,
                id: audio.aid,
                artist: artist
            });

            (<Artist>artist).addTrack(<Track>track);
        })
    }
}
import {Track} from './track';
import {Artist} from './artist';
import {VKAudio} from './vk-audio';
import {CollectionItem} from './collection';
import {TracksCollection} from './tracks-collection';
import {ArtistsCollection} from './artists-collection';

export class Parser{

    public tracks: TracksCollection = new TracksCollection({
        uniqueOnly: false,
        handleDuplicated: false
    });

    public artists: ArtistsCollection = new ArtistsCollection({
        uniqueOnly: true,
        handleDuplicated: false
    });

    public async setAudios(audios: VKAudio[]) : Promise<void> {
        for(const audio of audios) {
            await this.setAudio(audio);
        }
    }

    public async setAudio(audio: VKAudio) : Promise<void> {
        let artist: CollectionItem = await this.artists.process({
                title: audio.artist
            }),
            track: CollectionItem = await this.tracks.process({
                title: audio.title,
                id: audio.aid,
                artist
            });

        (<Artist>artist).addTrack(<Track>track);
    }
}
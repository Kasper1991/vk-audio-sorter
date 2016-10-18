import Audio from './audio';
import Artist from './artist';
import Collection from './collection';
import CollectionItem from './collection-item';

export default class ArtistsCollection extends Collection {

    constructor(audios: Audio[]) {
        super();
        this.set(audios);
    }

    public set(audios: Audio[]) : void {
        audios.forEach((audio) => {
            let artist: CollectionItem = this.find(audio.artist);

            if(!artist) {
                artist = this.add(audio);
            }

            artist.addTrack(audio);
        })
    }

    public create(audio: Audio) : CollectionItem {
        return new Artist(audio.artist);
    }
}
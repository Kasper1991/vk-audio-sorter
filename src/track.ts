import Audio from './audio';
import Artist from './artist';
import CollectionItem from './collection-item';

export default class Track extends CollectionItem {

    private id: number;
    private shouldBeRemoved: boolean;
    private shouldBeRenamed: boolean;

    public artist: Artist;

    constructor(audio: Audio) {
        super(audio.title);

        this.id = audio.aid;
        this.shouldBeRemoved = false;
        this.shouldBeRenamed = false;
    }

    public setArtist(artist: Artist) : void {
        this.artist = artist;
    }

    public markToRemove() : void {
        this.shouldBeRemoved = true;
    }

    public markToRename() : void {
        this.shouldBeRenamed = true;
    }
}
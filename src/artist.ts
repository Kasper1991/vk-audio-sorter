import {Track} from './track';
import {CollectionItem} from './collection';
import {TracksCollection} from './tracks-collection';

export class Artist extends CollectionItem {

    public tracks: TracksCollection = new TracksCollection();

    constructor({title} : {title: string}) {
        super(title);
    }

    public addTrack(track: Track) : void {
        let existedTrack = this.tracks.findByTitle(track.title);

        if(existedTrack) {
            console.log("existed");
        }

        this.tracks.add(track);
    }
}
import {Track} from './track';
import {CollectionItem} from './collection';
import {TracksCollection} from './tracks-collection';

export class Artist extends CollectionItem {

    public tracks: TracksCollection = new TracksCollection();

    constructor({title} : {title: string}) {
        super(title);
    }

    public async addTrack(track: Track) : Promise<void> {
        let alreadyExists: CollectionItem = await this.tracks.findByTitle(track.title);

        if(alreadyExists) {
            track.shouldBeRemoved = true;
        }

        this.tracks.add(track);
    }
}
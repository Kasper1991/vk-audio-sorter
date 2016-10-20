import {Artist} from './artist';
import {Collection, CollectionItem} from './collection';

export class ArtistsCollection extends Collection {

    items: CollectionItem[] = [];

    public createAndAdd(params) : Artist {
        let artist = new Artist(params);
        this.items.push(artist);
        return artist;
    }

    public findArtistByTitle(title: string) : Artist {
        return this
            .items
            .find((artist: Artist) : boolean => {
                let title1: string = title.trim().toLowerCase(),
                    title2: string = artist.title.trim().toLowerCase();

                return title1 == title2;
            })
    }

    get length() {
        return this.items.length;
    }
}
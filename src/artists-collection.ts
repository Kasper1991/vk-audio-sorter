import {Artist} from './artist';

export class ArtistsCollection {

    artists: Artist[] = [];

    public createAndAddArtist(params) : Artist {
        let artist = new Artist(params);
        this.artists.push(artist);
        return artist;
    }

    public findArtistByTitle(title: string) : Artist {
        return this
            .artists
            .find((artist: Artist) : boolean => {
                let title1: string = title.trim().toLowerCase(),
                    title2: string = artist.title.trim().toLowerCase();

                return title1 == title2;
            })
    }

    get length() {
        return this.artists.length;
    }
}
export default class Parser{

    tracks: any[] = [];
    artists: any[] = [];

    public set(audios: any[]) : void {
        audios.forEach((audio) => {
            let isExists = this.artists.find((artist) => {
                return artist.title == audio.artist;
            });

            if(!isExists) {
                isExists = {
                    title: audio.artist,
                    tracks: []
                };
                this.artists.push(isExists);
            }

            audio.artist = isExists;
            isExists.tracks.push(audio);
            this.tracks.push(audio);
        })
    }
}
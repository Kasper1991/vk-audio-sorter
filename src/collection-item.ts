export default class CollectionItem {

    private title: string;

    constructor(title: string) {
        this.title = title;
    }

    public titleIsEquals(title: string) : boolean {
        let title1 = CollectionItem.formatTitle(this.title),
            title2 = CollectionItem.formatTitle(title);

        return title1.localeCompare(title2) == 0;
    }

    static formatTitle(title: string) : string {
        return title.trim().toLowerCase();
    }
}
export abstract class Collection {

    public items: CollectionItem[] = [];

    public abstract create(params) : CollectionItem;

    public get length() {
        return this.items.length;
    }

    public createAndAdd(params) : CollectionItem {
        let item: CollectionItem = this.create(params);
        this.items.push(item);
        return item;
    }

    public findByTitle(title: string) : CollectionItem {
        return this
            .items
            .find((item: CollectionItem) : boolean => {
                let title1: string = title.trim().toLowerCase(),
                    title2: string = item.title.trim().toLowerCase();

                return title1 == title2;
            })
    }
}

export abstract class CollectionItem {
    public title: string;

    constructor(title: string) {
        this.title = title;
    }
}
export abstract class Collection {

    public items: CollectionItem[] = [];

    public abstract create(params) : CollectionItem;

    public get length() {
        return this.items.length;
    }

    public createAndAdd(params) : CollectionItem {
        let item: CollectionItem = this.create(params);
        this.add(item);
        return item;
    }

    public add(item: CollectionItem) : void {
        this.items.push(item);
    }

    public async findByTitle(title: string) : Promise<CollectionItem> {
        for(const item of this.items) {
            let title1: string = title.trim().toLowerCase(),
                title2: string = item.title.trim().toLowerCase();

            if(title1 == title2) return item;
        }
    }
}

export abstract class CollectionItem {
    public title: string;

    constructor(title: string) {
        this.title = title;
    }
}
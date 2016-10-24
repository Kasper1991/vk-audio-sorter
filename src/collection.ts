export abstract class Collection {

    protected options;

    public items: CollectionItem[] = [];

    constructor(options = {}) {
        this.options = options;
    }

    public abstract create(params) : CollectionItem;

    public get length() {
        return this.items.length;
    }

    public add(item: CollectionItem) : CollectionItem {
        this.items.push(item);
        return item;
    }

    public async find(toFind: CollectionItem) : Promise<CollectionItem> {
        for(let item of this.items) {
            let isEquals = await this.isEquals(item, toFind);
            if(isEquals) return item;
        }
    }

    public async isEquals(item1: CollectionItem, item2: CollectionItem) : Promise<boolean> {
        let title1 = item1.title.trim().toLowerCase(),
            title2 = item2.title.trim().toLowerCase();

        return title1 == title2;
    }

    public async process(params) : Promise<CollectionItem> {
        let instance = this.create(params);
        return await this.processItem(instance);
    }

    public async processItem(item: CollectionItem) : Promise<CollectionItem> {
        let duplicate = await this.find(item);

        if(this.options.handleDuplicated && duplicate) {
            item = this.handleDuplicated(item);
        }

        if(this.options.uniqueOnly && duplicate) {
            return duplicate;
        } else {
            return this.add(item);
        }
    }

    public handleDuplicated(item: CollectionItem) : CollectionItem {
        return item;
    }
}

export abstract class CollectionItem {
    public title: string;

    constructor(title: string) {
        this.title = title;
    }
}
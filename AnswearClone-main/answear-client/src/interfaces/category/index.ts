export interface ICategory {
    id: number;
    name: string;
    slug: string;
    targetGroupId: number;
    targetGroup: ITargetGroup;
    parentId: number | null;
    parent: IShortCategory | null;
    childrens: IShortCategory[];
}

export interface ICreateCategory {
    name: string;
    targetGroupId?: string;
    parentId?: number;
}

export interface IUpdateCategory {
    id: string;
    name: string;
    targetGroupId?: string;
    parentId?: number;
}

export interface IShortCategory {
    id: number;
    name: string;
    slug: string;
}

export interface ITargetGroup {
    id: number;
    name: string;
    slug: string;
}

export interface ICategoryFilters {
    name?: string;
    targetGroupId?: number;
    isRandomItems?: boolean;
    isParent?: boolean;
    pageIndex?: number;
    pageSize?: number;
}

export interface IPagedCategory {
    items: ICategory[];
    pagesAvailable: number;
    itemsAvailable: number;
}

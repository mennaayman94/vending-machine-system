interface FindItemsParams {
    page: number;
    pageSize: number;
    minPrice?: number;
    maxPrice?: number;
    catalogId?: string;
    categoryId?: string;
}

interface Item {
    id: string;
    name: string;
    catalogId: string;
    categoryId: string;
    quantity: number;
    price: number;
}
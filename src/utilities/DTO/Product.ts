export interface iProductDTO {
    id?: number;
    name: string;
    description?: string;
    modelName: string;
    modelId: string;
    price: number;
    discount?: number;
    sellername?: string;
    sellerAddress?: string;
    subCategoryId: number;
};

export interface iProductSummaryDTO {
    id: number,
    name: string,
    price: number
};
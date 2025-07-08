// This is an interface for the Product module in a TypeScript application.


// variants interface
export interface IVariant {
    type: string; // e.g., "size", "color"
    value: string; // e.g., "small", "red"
}

export interface IInventory {
    quantity: number; // total quantity available
    inStock: boolean; // whether the product is in stock
}

export interface IProduct {
    name: string;
    description: string;
    price: number;
    category: string;
    tags: string[];
    variants: IVariant[];
    inventory: IInventory;
}
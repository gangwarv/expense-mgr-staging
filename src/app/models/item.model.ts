export interface Item {
    id: string;
    name: string;
    defaultPrice: number;
    error?: string;
    loading?: boolean;
}
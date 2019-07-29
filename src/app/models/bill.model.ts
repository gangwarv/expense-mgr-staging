export interface Bill{
    id:string;
    itemId: string;
    amount: number;

    description: string;
    createdAt: Date;
    billDate: Date;

    // Join
    itemName?: string;
}
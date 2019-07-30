export interface Bill{
    id:string;
    itemId: string;
    amount: number;
    monthId:string;

    description: string;
    createdAt: Date;
    billDate: Date;

    // Join
    itemName?: string;
}
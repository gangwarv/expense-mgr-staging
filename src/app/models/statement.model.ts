export interface Statement {
    id: string;
    totalUser: number;
    budgetPerUser: number;
    fromPrevBill: number;
    currentBill: number;
    toNextBill: number;
    startDate: string;
    endDate: Date;
    processed: boolean;
}
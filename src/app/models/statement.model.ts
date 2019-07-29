export interface Statement {
    id: string;
    totalUser: number;
    budgetPerUser: number;
    fromPrevBill: number;
    currentSpent: number;
    toNextBill: number;
    startDate: Date;
    endDate: Date;
    processed: boolean;
}
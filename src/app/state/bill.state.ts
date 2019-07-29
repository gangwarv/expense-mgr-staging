import { Bill } from '../models/bill.model';
import { Statement } from '../models/statement.model';

export interface BillState {
    items: Bill[];
    statements: Statement[];
    loading: boolean;
    error?: string;
}
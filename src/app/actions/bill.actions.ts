import { Action } from '@ngrx/store';
import { Bill } from '../models/bill.model';
import { Statement } from '../models/statement.model';

export const GET_MONTHLY_STATEMENTS = 'GET_MONTHLY_STATEMENTS';
export const GET_MONTHLY_STATEMENTS_SUCCESS = 'GET_MONTHLY_STATEMENTS_SUCCESS';

export const GET_BILLS = 'GET_BILLS';
export const GET_BILLS_SUCCESS = 'GET_BILLS_SUCCESS';
export const GET_BILLS_FAILED = 'GET_BILLS_FAILED';

export const ADD_BILL = 'ADD_BILL';
export const ADD_BILL_SUCCESS = 'ADD_BILL_SUCCESS';
export const ADD_BILL_FAILED = 'ADD_BILL_FAILED';

export type All = GetMonthlyStatements | GetMonthlyStatementsSuccess | GetBills | GetBillsSuccess | GetBillsFailed | AddBill | AddBillSuccess | AddBillFailed;

export class GetMonthlyStatements {
    readonly type = GET_MONTHLY_STATEMENTS;
    constructor(public payload: number) { }
}

export class GetMonthlyStatementsSuccess {
    readonly type = GET_MONTHLY_STATEMENTS_SUCCESS;
    constructor(public payload: Statement[]) { }
}


export class GetBills implements Action {
    readonly type = GET_BILLS;
    constructor(public payload: string) { }
}

export class GetBillsSuccess implements Action {
    readonly type = GET_BILLS_SUCCESS;
    constructor(public payload: Bill[]) { }
}

export class GetBillsFailed implements Action {
    readonly type = GET_BILLS_FAILED;
    constructor(public payload: string) { }
}

export class AddBill implements Action {
    readonly type = ADD_BILL;
    constructor(public payload: Bill) { }
}

export class AddBillSuccess implements Action {
    readonly type = ADD_BILL_SUCCESS;
    constructor(public payload: Bill) { }
}
export class AddBillFailed implements Action {
    readonly type = ADD_BILL_FAILED;
    constructor(public payload: string) { }
}
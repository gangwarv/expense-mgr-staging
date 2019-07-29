import * as Actions from '../actions/bill.actions';
import { BillState } from '../state/bill.state';

const defaultState: BillState = {
    items: [
        {
            id: '10',
            amount: 22,
            billDate: new Date(),
            createdAt: new Date(),
            description: '',
            itemId: '1',
            itemName: 'Milk'
        },
        {
            id: '20',
            amount: 30,
            billDate: new Date(),
            createdAt: new Date(),
            description: '',
            itemId: '2',
            itemName: 'Bread'
        }
    ],
    statements: [
        {
            id: '201907',
            totalUser: 2,
            budgetPerUser: 6000,
            fromPrevBill: 1000,
            currentSpent: 12100,
            toNextBill: 900,
            endDate: new Date(),
            startDate: new Date(),
            processed: false
        }
    ],
    loading: false
}
export function billReducer(state: BillState = defaultState, action: Actions.All): BillState {
    switch (action.type) {

        case Actions.GET_MONTHLY_STATEMENTS:
            return { ...state, error: '', loading: true }
        case Actions.GET_MONTHLY_STATEMENTS_SUCCESS:
            return { ...state, error: '', loading: false, statements: action.payload }

        case Actions.GET_BILLS:
            return { ...state, error: '', loading: true }
        case Actions.GET_BILLS_SUCCESS:
            return { ...state, items: action.payload, loading: false }
        case Actions.GET_BILLS_FAILED:
            return { ...state, error: action.payload, loading: false }

        case Actions.ADD_BILL:
            return { ...state, error: '', loading: true }
        case Actions.ADD_BILL_SUCCESS:
            return { ...state, loading: false, items: [...state.items, action.payload] }
        case Actions.ADD_BILL_FAILED:
            return { ...state, loading: false, error: action.payload }

        default: return state;
    }
}
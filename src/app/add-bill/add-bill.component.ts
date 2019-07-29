import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { Item } from '../models/item.model';
import { Store } from '@ngrx/store';
import { AppState } from '../state/appstate';
import { Bill } from '../models/bill.model';
import { AddBill, AddBillSuccess } from '../actions/bill.actions';

@Component({
  selector: 'app-add-bill',
  templateUrl: './add-bill.component.html',
  styleUrls: ['./add-bill.component.scss']
})
export class AddBillComponent implements OnInit {
  billForm: FormGroup;

  items$: Observable<Item[]>;
  bills$: Observable<Bill[]>;

  constructor(private fb: FormBuilder, private store: Store<AppState>) {
    this.billForm = fb.group({
      'itemId': ['', Validators.required],
      'amount': [null, Validators.compose([
        Validators.required, Validators.min(1)
      ])],
      'quantity': ['Quantity 1', Validators.required],
      'billDate': [new Date().toISOString(), Validators.required]
    });

    this.items$ = this.store.select('items');
    this.bills$ = this.store.select('bills');
  }

  onSubmit() {
    this.store.dispatch(new AddBill(this.billForm.value));
    // this.store.dispatch(new AddBillSuccess(this.billForm.value));
    console.log(this.billForm.value);
  }
  ngOnInit() {
  }

}

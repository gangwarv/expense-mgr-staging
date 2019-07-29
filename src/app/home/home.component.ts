import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../state/appstate';
import { Observable } from 'rxjs';
import { Bill } from '../models/bill.model';
import { GetBills } from '../actions/bill.actions';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  items$: Observable<Bill[]>;

  constructor(private store: Store<AppState>) {
    this.items$ = store.select('bills');
  }

  ngOnInit() {
    this.store.dispatch(new GetBills('201910'));
  }

}

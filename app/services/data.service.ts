import {
  HttpClient,
  HttpErrorResponse,
  HttpParams
} from "@angular/common/http";
import { Injectable } from "@angular/core";
import moment from "moment";
import { BehaviorSubject } from "rxjs/BehaviorSubject";
import { of } from "rxjs/observable/of";
import { flatMap } from "rxjs/operators";
import { map } from "rxjs/operators/map";
import { Expense, ExpenseItem } from "../models/expense.model";

@Injectable()
export class DataService {
  private readonly API_URL =
    "https://2byv9.sse.codesandbox.io/api/expenseItems";

  expense$: BehaviorSubject<ExpenseItem[]> = new BehaviorSubject<ExpenseItem[]>(
    []
  );

  constructor(private httpClient: HttpClient) {}

  /**
   * GET all expenses from WS
   */
  getExpenses(): void {
    this.httpClient.get<ExpenseItem[]>(this.API_URL).subscribe(
      data => {
        data.map(expense => {
          expense.createdAt = moment(expense.createdAt).toDate();
          expense.lastModifiedAt = moment(expense.lastModifiedAt).toDate();
          expense.purchasedOn = moment(expense.purchasedOn).toDate();
        });
        this.expense$.next(data);
      },
      (error: HttpErrorResponse) => {}
    );
  }

  /**
   * Update a specific expense item
   */
  putExpenses(expense: ExpenseItem): void {
    this.httpClient.put(this.API_URL + "/" + expense.id, expense).subscribe(
      success => {
        console.log("suc");
      },
      (error: HttpErrorResponse) => {}
    );
  }
}

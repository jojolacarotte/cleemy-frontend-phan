import { Component } from "@angular/core";
import { ChangeDetectionStrategy, OnInit, ViewChild } from "@angular/core";
import { Observable } from "rxjs/Observable";
import { of } from "rxjs/observable/of";
import { map } from "rxjs/operators";
import { MatSort, Sort } from "@angular/material";
import { MatPaginator, PageEvent } from "@angular/material";
import { fromMatSort, sortRows } from "./datasource-utils";
import { fromMatPaginator, paginateRows } from "./datasource-utils";
import { DataService } from "./services/data.service";
import { Expense, ExpenseItem } from "./models/expense.model";
import { FormControl } from "@angular/forms";
import { HttpErrorResponse } from "@angular/common/http";

@Component({
  selector: "my-app",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent {
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  expense: ExpenseItem[] = [];

  loading: boolean;

  totalRows$: Observable<number>;

  date = new FormControl(new Date());

  constructor(private DataService: DataService) {}

  ngOnInit() {
    this.loading = true;
    this.DataService.expense$.subscribe(expense => {
      this.expense = expense;
      this.loading = false;
    });
    this.DataService.getExpenses();

    const sortEvents$: Observable<Sort> = fromMatSort(this.sort);
    const pageEvents$: Observable<PageEvent> = fromMatPaginator(this.paginator);

    /*this.totalRows$ = rows$.pipe(map(rows => rows.length));
    this.displayedRows$ = rows$.pipe(
      sortRows(sortEvents$),
      paginateRows(pageEvents$)
    );*/
  }

  updateExpense(item: ExpenseItem) {
    this.DataService.putExpenses(item).subscribe(
      success => {
        console.log("PUT successfully");
      },
      (error: HttpErrorResponse) => {
        // Cas d'erreur volontairement pas géré
        console.log(error);
      }
    );
  }
}

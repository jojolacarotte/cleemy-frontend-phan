import { Component } from "@angular/core";
import { ChangeDetectionStrategy, OnInit, ViewChild } from "@angular/core";
import { Observable } from "rxjs/Observable";
import { map } from "rxjs/operators";
import { MatSort, Sort } from "@angular/material";
import { MatPaginator, PageEvent } from "@angular/material";
import { fromMatSort, sortRows } from "./datasource-utils";
import { fromMatPaginator, paginateRows } from "./datasource-utils";
import { DataService } from "./services/data.service";
import { Expense, ExpenseItem } from "./models/expense.model";
import { FormControl } from "@angular/forms";
import { TranslateService } from "@ngx-translate/core";

@Component({
  selector: "my-app",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent {
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  displayedRows: ExpenseItem[];
  totalRows$: Observable<number>;
  pageSize: number = 5;

  constructor(private DataService: DataService) {}

  ngOnInit() {

    this.paginator.pageSize = this.pageSize;
    const sortEvents$: Observable<Sort> = fromMatSort(this.sort);
    const pageEvents$: Observable<PageEvent> = fromMatPaginator(this.paginator);

    this.DataService.expense$
      .pipe(
        sortRows(sortEvents$),
        paginateRows(pageEvents$)
      )
      .subscribe(expense => {
        this.displayedRows = expense;
      });
    this.DataService.getExpenses();
    this.totalRows$ = this.DataService.expense$.pipe(map(rows => rows.length));
  }
}

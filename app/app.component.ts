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
import {TranslateService} from '@ngx-translate/core';

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

  constructor(private DataService: DataService, 
              private translate: TranslateService) {
    translate.addLangs(['en', 'fr']);
    translate.setDefaultLang('fr');

    const browserLang = translate.getBrowserLang();
    translate.use(browserLang.match(/en|fr/) ? browserLang : 'en');
  }

  ngOnInit() {
    this.DataService.expense$.subscribe(expense => {
      console.log("update", expense);
      this.expense = expense;
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
}

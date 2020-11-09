import { DatePipe } from "@angular/common";
import { HttpErrorResponse } from "@angular/common/http";
import { Component, Input, OnInit } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { ExpenseItem } from "../models/expense.model";
import { DataService } from "./../services/data.service";

@Component({
  selector: "app-new-expense",
  templateUrl: "./app-new-expense.component.html",
  styleUrls: ["./app-new-expense.component.scss"]
})
export class NewExpenseComponent implements OnInit {
  @Input() expense: ExpenseItem;
  expenseForm;

  constructor(
    private fb: FormBuilder,
    private DataService: DataService,
    private datePipe: DatePipe
  ) {
    this.expenseForm = this.fb.group({
      purchasedOn: ["", Validators.required],
      nature: ["", Validators.required],
      originalAmount: this.fb.group({
        amount: ["", Validators.required],
        currency: ["EUR", Validators.required]
      }),
      comment: ["", Validators.required],
      id: ["", Validators.required]
    });
  }

  ngOnInit() {
    this.expenseForm.patchValue({ ...this.expense });
  }

  onSubmit(i: ExpenseItem) {
    if (this.expense) {
      this.DataService.putExpenses(i).subscribe(
        success => {
          console.log("PUT successfully");
        },
        (error: HttpErrorResponse) => {
          // Cas d'erreur volontairement pas géré
          console.log(error);
        }
      );
    } else {
      this.DataService.postExpense(i).subscribe(
        success => {
          console.log("POST successfully");
        },
        (error: HttpErrorResponse) => {
          // Cas d'erreur volontairement pas géré
          console.log(error);
        }
      );
    }
  }
}

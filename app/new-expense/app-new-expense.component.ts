import { DatePipe } from "@angular/common";
import { HttpErrorResponse } from "@angular/common/http";
import { Component, Input, OnInit } from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormGroupDirective,
  Validators
} from "@angular/forms";
import { ExpenseItem } from "../models/expense.model";
import { DataService } from "./../services/data.service";

@Component({
  selector: "app-new-expense",
  templateUrl: "./app-new-expense.component.html",
  styleUrls: ["./app-new-expense.component.scss"]
})
export class NewExpenseComponent implements OnInit {
  @Input() expense: ExpenseItem;
  expenseForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private DataService: DataService,
    private datePipe: DatePipe
  ) {
    this.expenseForm = this.fb.group({
      purchasedOn: ["2020-11-01", Validators.required],
      nature: ["R", Validators.required],
      originalAmount: this.fb.group({
        amount: ["1", Validators.required],
        currency: ["EUR", Validators.required]
      }),
      comment: ["M", Validators.required],
      id: [""]
    });
  }

  ngOnInit() {
    this.expenseForm.patchValue({ ...this.expense });
  }

  /**
   * Update or Create expense on submittion
   */
  onSubmit(i: ExpenseItem, formDirective: FormGroupDirective): void {
    if (this.expense) {
      this.DataService.putExpenses(i).subscribe(
        success => {
          console.log("PUT successfully");
          this.clearForm(formDirective);
          setTimeout(() => {
            this.DataService.getExpenses();
          }, 500);
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
          this.clearForm(formDirective);
          setTimeout(() => {
            this.DataService.getExpenses();
          }, 500);
        },
        (error: HttpErrorResponse) => {
          // Cas d'erreur volontairement pas géré
          console.log(error);
        }
      );
    }
  }

  /**
   * Remove a specific expense
   */
  removeExpense(id: string): void {
    this.DataService.deleteExpense(id).subscribe(
      success => {
        console.log("DELETE successfully");
        setTimeout(() => {
          this.DataService.getExpenses();
        }, 500);
      },
      (error: HttpErrorResponse) => {
        // Cas d'erreur volontairement pas géré
        console.log(error);
      }
    );
  }

  /**
   * Remove all values in form
   */
  clearForm(formDirective: FormGroupDirective) {
    this.expenseForm.reset();
    formDirective.resetForm();
  }
}

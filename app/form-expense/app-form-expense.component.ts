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
  selector: "app-form-expense",
  templateUrl: "./app-form-expense.component.html",
  styleUrls: ["./app-form-expense.component.scss"]
})
export class FormExpenseComponent implements OnInit {
  @Input() expense: ExpenseItem;
  expenseForm: FormGroup;

  constructor(private fb: FormBuilder, private DataService: DataService) {
    this.expenseForm = this.fb.group({
      purchasedOn: ["", Validators.required],
      nature: ["", Validators.required],
      originalAmount: this.fb.group({
        amount: ["", Validators.required],
        currency: ["", Validators.required]
      }),
      comment: ["", Validators.required],
      id: [""]
    });
  }

  ngOnInit() {
    this.expenseForm.patchValue({ ...this.expense });
  }

  /**
   * Update or Create expense on submittion
   */
  onSubmit(i: ExpenseItem, formDirective?: FormGroupDirective): void {
    if (this.expense) {
      this.DataService.putExpenses(i).subscribe(
        success => {
          console.log("PUT successfully");
          formDirective ? this.clearForm(formDirective) : this.clearForm();
          this.refreshExpense();
        },
        (error: HttpErrorResponse) => {
          console.log(error);
        }
      );
    } else {
      this.DataService.postExpense(i).subscribe(
        success => {
          console.log("POST successfully");
          this.clearForm(formDirective);
          this.refreshExpense();
        },
        (error: HttpErrorResponse) => {
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
        this.refreshExpense();
      },
      (error: HttpErrorResponse) => {
        console.log(error);
      }
    );
  }

  /**
   * Remove all values in form
   */
  clearForm(formDirective?: FormGroupDirective) {
    this.expenseForm.reset();
    if (formDirective) {
      formDirective.resetForm();
    }
  }

  refreshExpense() {
    /**
     * 2 solutions:
     * - modifier les données dans l'observables
     * - refaire un getExpenses
     * J'ai préféré prendre la rapidité
     */
    setTimeout(() => {
      // Pour compenser le chargement de nodejs de la modif du db.json
      this.DataService.getExpenses();
    }, 1000);
  }
}

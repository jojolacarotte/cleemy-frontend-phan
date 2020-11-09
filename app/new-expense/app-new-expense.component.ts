import { Component } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";

@Component({
  selector: "app-new-expense",
  templateUrl: "./app-new-expense.component.html",
  styleUrls: ["./app-new-expense.component.scss"]
})
export class NewExpenseComponent {

  expenseForm;
  
  constructor(private fb: FormBuilder) {
    this.expenseForm = this.fb.group({
      date: ['', Validators.required],
      nature: ['', Validators.required],
      amount: ['', Validators.required],
    });
  }
}

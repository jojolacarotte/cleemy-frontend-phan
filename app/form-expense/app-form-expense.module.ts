import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import {
  MatButtonModule,
  MatIconModule,
  MatInputModule,
  MatNativeDateModule
} from "@angular/material";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { DataService } from "../services/data.service";
import { FormExpenseComponent } from "./app-form-expense.component";

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatInputModule,
    ReactiveFormsModule,
    MatNativeDateModule,
    MatIconModule
  ],
  providers: [DataService],
  declarations: [FormExpenseComponent],
  exports: [FormExpenseComponent]
})
export class FormExpenseComponentModule {}

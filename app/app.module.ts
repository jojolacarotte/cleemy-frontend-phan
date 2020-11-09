import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import {
  MatListModule,
  MatNativeDateModule,
  MAT_DATE_LOCALE
} from "@angular/material";
import { MatExpansionModule } from "@angular/material";
import { MatSortModule } from "@angular/material";
import { MatPaginatorModule } from "@angular/material";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { FlexLayoutModule } from "@angular/flex-layout";
import { MatButtonModule } from "@angular/material/button";
import { MatInputModule } from "@angular/material/input";
import {MatIconModule} from '@angular/material/icon';


import { AppComponent } from "./app.component";
import { DataService } from "./services/data.service";
import { HttpClientModule } from "@angular/common/http";
import { NewExpenseModule } from "./new-expense/app-new-expense.module";

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    MatListModule,
    MatExpansionModule,
    MatSortModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    MatPaginatorModule,
    HttpClientModule,
    MatButtonModule,
    MatInputModule,
    ReactiveFormsModule,
    MatNativeDateModule,
    MatIconModule,
    NewExpenseModule
  ],
  providers: [DataService],
  declarations: [AppComponent],
  bootstrap: [AppComponent]
})
export class AppModule {}

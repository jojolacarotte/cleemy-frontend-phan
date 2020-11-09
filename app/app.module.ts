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
import { HttpClient, HttpClientModule } from "@angular/common/http";
import { NewExpenseModule } from "./new-expense/app-new-expense.module";
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {TranslateModule, TranslateLoader} from '@ngx-translate/core';

export function HttpLoaderFactory(httpClient: HttpClient) {
  return new TranslateHttpLoader(httpClient);
}

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
    NewExpenseModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })
  ],
  providers: [DataService],
  declarations: [AppComponent],
  bootstrap: [AppComponent]
})
export class AppModule {}

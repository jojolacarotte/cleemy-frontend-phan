import { HttpClientModule } from "@angular/common/http";
import { async, fakeAsync, TestBed, tick } from "@angular/core/testing";
import { FormGroupDirective } from "@angular/forms";
import { of } from "rxjs/observable/of";
import { DataService } from "../services/data.service";
import { NewExpenseComponent } from "./app-new-expense.component";
import { NewExpenseModule } from "./app-new-expense.module";

describe("Expense form", () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [NewExpenseModule, HttpClientModule],
      providers: [DataService]
    }).compileComponents();
  }));

  it("should have value from WS", fakeAsync(() => {
    const fixture = TestBed.createComponent(NewExpenseComponent);
    const component = fixture.componentInstance;
    const debugElement = fixture.debugElement;

    const expense = {
      id: "727212a0-4d73-4615-bd23-d7df6f562491",
      purchasedOn: "2018-12-04",
      nature: "Restaurant",
      originalAmount: {
        amount: 17,
        currency: "GBP"
      },
      convertedAmount: {
        amount: 19.09,
        currency: "EUR"
      },
      comment: "Mission de 5 jours à Londres",
      createdAt: "2018-12-05T14:00:34.435154Z",
      lastModifiedAt: "2018-12-05T14:00:34.435154Z"
    };

    const expenseExpected = {
      id: "727212a0-4d73-4615-bd23-d7df6f562491",
      purchasedOn: "2018-12-04",
      nature: "Restaurant",
      originalAmount: {
        amount: 17,
        currency: "GBP"
      },
      comment: "Mission de 5 jours à Londres"
    };

    component.expenseForm.patchValue({ ...expense });

    fixture.detectChanges();

    expect(component.expenseForm.value).toEqual(expenseExpected);
  }));

  // it("should have value from WS", fakeAsync(() => {
  //   const fixture = TestBed.createComponent(NewExpenseComponent);
  //   const component = fixture.componentInstance;
  //   const debugElement = fixture.debugElement;

  //   let dataService = TestBed.get(DataService);

  //   const expense = {
  //     id: "727212a0-4d73-4615-bd23-d7df6f562491",
  //     purchasedOn: new Date("2018-12-04"),
  //     nature: "Restaurant",
  //     originalAmount: {
  //       amount: 17,
  //       currency: "GBP"
  //     },
  //     convertedAmount: {
  //       amount: 19.09,
  //       currency: "EUR"
  //     },
  //     comment: "Mission de 5 jours à Londres",
  //     createdAt: new Date("2018-12-05T14:00:34.435154Z"),
  //     lastModifiedAt: new Date("2018-12-05T14:00:34.435154Z")
  //   };

  //   spyOn(dataService, "putExpenses").and.returnValue(of(expense));

  //   component.expense = expense;

  //   component.onSubmit(component.expenseForm.value, null);
  //   fixture.detectChanges();
  //   tick(1500);

  //   expect(dataService.putExpenses).toHaveBeenCalled();
  // }));

  //   it('should clear form', fakeAsync(() => {

  //   const fixture = TestBed.createComponent(NewExpenseComponent);
  //   const component = fixture.componentInstance;
  //   const debugElement = fixture.debugElement;

  //   const expense = {
  //       id: "727212a0-4d73-4615-bd23-d7df6f562491",
  //       purchasedOn: "2018-12-04",
  //       nature: "Restaurant",
  //       originalAmount: {
  //         amount: 17,
  //         currency: "GBP"
  //       },
  //       convertedAmount: {
  //         amount: 19.09,
  //         currency: "EUR"
  //       },
  //       comment: "Mission de 5 jours à Londres",
  //       createdAt: "2018-12-05T14:00:34.435154Z",
  //       lastModifiedAt: "2018-12-05T14:00:34.435154Z"
  //     };

  //   const expenseExpected = {};

  //   component.expenseForm.patchValue({ ...expense });

  //   component.clearForm(component.expenseForm.value, formDirective);

  //   fixture.detectChanges();

  //   expect(component.expenseForm.value)
  //       .toEqual(expenseExpected);

  //  }));
});

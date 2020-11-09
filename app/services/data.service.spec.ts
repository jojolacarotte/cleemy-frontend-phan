import { inject, TestBed } from '@angular/core/testing';
import { DataService } from './data.service';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ExpenseItem } from '../models/expense.model';
import { filter } from 'rxjs/operators/filter';

describe('UsersService', () => {
  let dataService: DataService; // Add this

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientModule, HttpClientTestingModule],
      providers: [DataService]
    });
  });

  beforeEach(() => dataService = TestBed.get(DataService));
  
  let httpTestingController: HttpTestingController;
  beforeEach(() => httpTestingController = TestBed.get(HttpTestingController));

  it('SC01 : GET one expense', () => {

    const expenseExpected : ExpenseItem[] = [
    {
      "id": "727212a0-4d73-4615-bd23-d7df6f562491",
      "purchasedOn": new Date("2018-12-04"),
      "nature": "Restaurant",
      "originalAmount": {
        "amount": 17,
        "currency": "GBP"
      },
      "convertedAmount": {
        "amount": 19.09,
        "currency": "EUR"
      },
      "comment": "Mission de 5 jours à Londres",
      "createdAt": new Date("2018-12-05T14:00:34.435154Z"),
      "lastModifiedAt": new Date("2018-12-05T14:00:34.435154Z")
    }]

    dataService.getExpenses();
    dataService.expense$.subscribe(expense => {
      expect(expense).toEqual(expenseExpected);
    });

    const req = httpTestingController.expectOne('https://2byv9.sse.codesandbox.io/api/expenseItems');

    req.flush(expenseExpected);

  });

   it('SC02 : GET multiple expense', () => {

    const expenseExpected : ExpenseItem[] = [
    {
      "id": "727212a0-4d73-4615-bd23-d7df6f562491",
      "purchasedOn": new Date("2018-12-04"),
      "nature": "Restaurant",
      "originalAmount": {
        "amount": 17,
        "currency": "GBP"
      },
      "convertedAmount": {
        "amount": 19.09,
        "currency": "EUR"
      },
      "comment": "Mission de 5 jours à Londres",
      "createdAt": new Date("2018-12-05T14:00:34.435154Z"),
      "lastModifiedAt": new Date("2018-12-05T14:00:34.435154Z")
    },
        {
      "id": "727212a0-4d73-4615-bd23-d7df6f562492",
      "purchasedOn": new Date("2018-12-18"),
      "nature": "Ciné",
      "originalAmount": {
        "amount": 6,
        "currency": "EUR"
      },
      "convertedAmount": {
        "amount": 19.09,
        "currency": "GBP"
      },
      "comment": "Tenet",
      "createdAt": new Date("2018-12-05T14:00:34.435154Z"),
      "lastModifiedAt": new Date("2018-12-05T14:00:34.435154Z")
    }]

    dataService.getExpenses();
    dataService.expense$.subscribe(expense => {
      expect(expense).toEqual(expenseExpected);
    });

    const req = httpTestingController.expectOne('https://2byv9.sse.codesandbox.io/api/expenseItems');

    req.flush(expenseExpected);

  });
});
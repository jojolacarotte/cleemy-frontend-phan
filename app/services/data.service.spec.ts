import { inject, TestBed, async } from "@angular/core/testing";
import { HttpClientModule } from "@angular/common/http";
import { DataService } from "./data.service";

import {
  HttpClientTestingModule,
  HttpTestingController
} from "@angular/common/http/testing";
import { ExpenseItem } from "../models/expense.model";

const URL = "https://2byv9.sse.codesandbox.io/api/expenseItems";

describe("Service: LanguagesServiceHttpClient", () => {
  let service: DataService, httpMock: HttpTestingController;

  beforeEach(() =>
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [DataService]
    })
  );

  beforeEach(inject([DataService, HttpTestingController], (s, h) => {
    service = s;
    httpMock = h;
  }));

  //specs
  it("should return available users", done => {
    const USERS = [
      {
        id: 34,
        username: "spiderman",
        roles: ["admin", "user"],
        superuser: true
      },
      {
        id: 67,
        username: "batman",
        roles: ["user"]
      }
    ];

    const Expense: ExpenseItem = {
      id: "727212a0-4d73-4615-bd23-d7df6f562491",
      purchasedOn: new Date("2018-12-04"),
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
      createdAt: new Date("2018-12-05T14:00:34.435154Z"),
      lastModifiedAt: new Date("2018-12-05T14:00:34.435154Z")
    };

    service.postExpense(Expense).subscribe({
      next: res => {
        //expect(res).toBe(USERS);
        //expect(res.length).toEqual(2);
        done();
      }
    });
    httpMock.expectOne(URL).flush(Expense);
    httpMock.verify();
  });
});

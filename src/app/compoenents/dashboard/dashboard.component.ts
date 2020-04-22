import { Component, OnInit } from '@angular/core';
import {RequestsService} from '../../services/requests.service';
import {ApiResponse} from '../../models/apiResponse';
import {Product} from '../../models/product';
import {Observable, Subject} from 'rxjs';
import {debounceTime, distinctUntilChanged} from 'rxjs/operators';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  private _searchInput: string;
  private _cards: Array<Product>;
  private _collection: Array<Product>;
  private requestsService: RequestsService;
  private _checkReprints = false;
  public input: string;
  public userQuestion: string;
  userQuestionUpdate = new Subject<string>();


  constructor(requestService: RequestsService) {
    this.requestsService = requestService;
    this.cards = new Array<Product>();
    this.collection = new Array<Product>();
    // Debounce search.
    this.userQuestionUpdate.pipe(
      debounceTime(1500),
      distinctUntilChanged())
      .subscribe(value => {
        this.searchCards(value);
      });
  }

  ngOnInit() {
  }


  get searchInput(): string {
    return this._searchInput;
  }

  set searchInput(value: string) {
    this._searchInput = value;
  }


  get cards(): Array<Product> {
    return this._cards;
  }

  set cards(value: Array<Product>) {
    this._cards = value;
  }


  get collection(): Array<Product> {
    return this._collection;
  }

  set collection(value: Array<Product>) {
    this._collection = value;
  }

  public addToCollection(card: Product) {
    let exists = false;
    for (let i = 0; i < this.collection.length; i++) {
      if (this.collection[i].idProduct === card.idProduct) {
        exists = true;
        this.collection[i].count += 1;
      }
    }
    if (!exists) {
      card.count = 1;
      this._collection.push(card);
    }
  }

  public removeFromCollection(card: Product) {
    if (card.count === 1) {
      const index = this.collection.indexOf(card, 0);
      if (index > -1) {
        this.collection.splice(index, 1);
      }
    } else {
      card.count -= 1;
    }
  }

  get checkReprints(): boolean {
    return this._checkReprints;
  }

  set checkReprints(value: boolean) {
    this._checkReprints = value;
  }

  public searchCards(value: string) {
    if (value.length >= 4) {
      this.requestsService.getCards(value).subscribe(
        (res: ApiResponse) => {
          if (res != null) {
            const products = res.product;
            const temp: Array<Product> = [];
            for (let i = 0; i + 1 < products.length;) {
              if (products[i].countReprints > 1 && products[i].enName === products[i + 1].enName) {
                temp.push(products[i]);
                i += products[i].countReprints;
              } else {
                temp.push(products[i]);
                i++;
              }
            }
            this.cards = temp;
          } else {
            this.cards = null;
          }
        }
      );
    }
  }

  public openCard(card: string): void {
    this.checkReprints = true;
    this.requestsService.getCards(card).subscribe(
      (res: ApiResponse) => {
          this.cards = res.product;
        }
    );
  }
}

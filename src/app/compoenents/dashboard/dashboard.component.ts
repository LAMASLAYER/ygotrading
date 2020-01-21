import { Component, OnInit } from '@angular/core';
import {RequestsService} from '../../services/requests.service';
import {ApiResponse} from '../../models/apiResponse';
import {Product} from '../../models/product';

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


  constructor(requestService: RequestsService) {
    this.requestsService = requestService;
    this.cards = new Array<Product>();
    this.collection = new Array<Product>();
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
    this._collection.push(card);
  }

  public removeFromCollection(card: Product) {
    const index = this.collection.indexOf(card, 0);
    if (index > -1) {
      this.collection.splice(index, 1);
    }
  }

  get checkReprints(): boolean {
    return this._checkReprints;
  }

  set checkReprints(value: boolean) {
    this._checkReprints = value;
  }

  private searchCards(value: string) {
    if (this.searchInput.length >= 4) {
      value = this.searchInput;
      this.requestsService.getCards(value).subscribe(
        (res: ApiResponse) => {
          if (res != null) {
            const temp: Array<Product> = [];
            console.log(res.product);
            for (let i = 0; i + 1 < res.product.length;) {
              if (res.product[i].countReprints > 1 && res.product[i].enName === res.product[i + 1].enName) {
                temp.push(res.product[i]);
                i += res.product[i].countReprints;
              } else {
                temp.push(res.product[i]);
                i++;
              }
            }
            temp.push(res.product[res.product.length - 1]);
            console.log(temp);
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

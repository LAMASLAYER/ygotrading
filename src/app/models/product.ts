import {Localization} from './localization';

export class Product {
  public idProduct: number;
  public idMetaProduct: number;
  public countReprints: number;
  public enName: string;
  public locName: string;
  public localization: Array<Localization>;
  public website: string;
  public image: string;
  public gameName: string;
  public categoryName: string;
  public idGame: string;
  public number: string;
  public rarity: string;
  public expansionName: string;
  public expansionIcon: number;
  public countArticles: number;
  public countFoils: number;
  public link: Array<object>;
}

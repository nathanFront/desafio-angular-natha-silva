import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Md5 } from 'ts-md5';

@Injectable({
  providedIn: 'root'
})
export class MarvelService {
  public favoriteChangeEvent = new EventEmitter();
  public filterChangeEvent = new EventEmitter();
  constructor(
    private _http: HttpClient,
  ) { }

  /**
   * emitChange
   */
  public emitChangeFavorites() {
    this.favoriteChangeEvent.emit(true);
  }
  /**
   * emitChangeFilter
   */
  public emitChangeFilter(name) {
    console.log(name);
    
    this.filterChangeEvent.emit(name);
  }

  /**
   * getHerosStartWith
   */
  public getHerosStartWith(page = 1, nameStartsWith: string = ''): Observable<any> {
    const limit = 10;
    const offset = limit * (page - 1);
    let params = nameStartsWith ? {nameStartsWith} : {}
    params = {...params, ...this.params, offset, limit}
    return this._http.get( environment.urlAPI + '/characters', {
      params
    })
  }

  /**
   * getComics
   */
  public getComics(page, heroId): Observable<any> {
    const limit = 10;
    const offset = limit * (page - 1);
    const params = {...this.params, offset, limit}
    return this._http.get( environment.urlAPI + `/characters/${heroId}/comics`, {
      params
    })
  }
  /**
   * getComic
   */
  public getComic(url): Observable<any> {
    return this._http.get( url.replace('http://','https://'), {
      params:this.params
    })
  }
  
  private get params(): any {
    const ts = Date.now();
    const apikey = environment.apiKey.public;
    const hash = new Md5().appendStr(ts + environment.apiKey.private + apikey).end();
    return {
      apikey,
      ts,
      hash
    }
  }
}

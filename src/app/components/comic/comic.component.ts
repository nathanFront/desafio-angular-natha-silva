import { Component, Input, } from '@angular/core';
import { MarvelService } from 'src/app/shared/marvel.service';

@Component({
  selector: 'app-comic',
  templateUrl: './comic.component.html',
  styleUrls: ['./comic.component.scss']
})
export class ComicComponent {
  @Input('comic') comic: any = {};
  @Input('favorite') favorite = false;
  constructor(private marvelService: MarvelService) { }

  public get imageSrc(): string {
    return (
      this.comic.thumbnail.path +
      '/standard_fantastic.' +
      this.comic.thumbnail.extension
    );
  }

  toggleComic(){
    this.favorite = !this.favorite;
    this.favorite ? this.add() : this.remove();
    this.marvelService.emitChangeFavorites();
  }

  add(){
    const favoriteList = JSON.parse(localStorage.getItem('favoriteList')) || [];
    localStorage.setItem(
      'favoriteList', JSON.stringify([this.comic, ...favoriteList])
    );
  }

  remove(){
    const favoriteList = JSON.parse(localStorage.getItem('favoriteList')) || [];
    localStorage.setItem(
      'favoriteList',
      JSON.stringify(favoriteList.filter((comic)=> comic.id !== this.comic.id))
    );
  }
}

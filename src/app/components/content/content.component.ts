import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MarvelService } from 'src/app/shared/marvel.service';
import { LoadingComponent } from '../loading/loading.component';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss']
})
export class ContentComponent implements OnInit {
  public heros = [];
  public page = 1;
  public total = 0;
  public name = '';
  public luckyComics = [];
  constructor(private marvelService: MarvelService,
    private modalService: NgbModal) { }

  ngOnInit() {
    this.marvelService.filterChangeEvent.subscribe((name) => {
      this.name = name;
      this.page = 1;
      this.loadHeros();
    });
    this.loadHeros();
  }

  loadHeros() {
    const modalRef = this.modalService.open(LoadingComponent, {
      backdrop: 'static',
      keyboard: false,
    });

    this.marvelService.getHerosStartWith(this.page, this.name).subscribe(
      (value) => {
        this.heros = value.data.results;

        this.total = value.data.total;

        modalRef.dismiss();
      },
      () => modalRef.dismiss()
    );
  }
  changePage(page) {
    this.page = page;
    this.loadHeros();
  }

  getLucky() {
    const modalRef = this.modalService.open(LoadingComponent, {
      backdrop: 'static',
      keyboard: false,
    });
    const favourites: any[] =
      JSON.parse(localStorage.getItem('favoriteList')) || [];

    const newComics = [];
    const allComics: string[] = this.heros
      .map((hero) =>
        hero.comics.items
          .filter((item) => !favourites.some((c) => c.id == item.resourceURI.split('/').pop()))
          .map((item) => item.resourceURI)
      )
      .reduce((acc, val) => acc.concat(val), []);
    const random = allComics.sort(() => Math.random() - 0.5).slice(0, 3);
    if (random.length === 0) {
      modalRef.dismiss();
    }
    random.forEach((val) => {
      this.marvelService.getComic(val).subscribe((value) => {
        newComics.push(value.data.results[0]);
        if (newComics.length === random.length) {
          localStorage.setItem(
            'favoriteList',
            JSON.stringify([...newComics, ...favourites])
          );
          this.marvelService.emitChangeFavorites();
          modalRef.dismiss();
        }
      });
    });
  }

}

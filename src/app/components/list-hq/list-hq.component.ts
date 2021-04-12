import { Component, Input, OnInit } from '@angular/core';
import { MarvelService } from 'src/app/shared/marvel.service';

@Component({
  selector: 'app-list-hq',
  templateUrl: './list-hq.component.html',
  styleUrls: ['./list-hq.component.scss']
})
export class ListHqComponent implements OnInit {

  @Input('heroId') heroId;
  public comics = [];
  public loading = false;
  public favoriteList = [];
  public page = 1;
  public  total = 0;
  constructor(private marvelService:  MarvelService) { }

  ngOnInit() {
    this.marvelService.favoriteChangeEvent.subscribe(() => {
      this.heroId || this.loadList();
    });

   this.loadList();
  }

  isFavorite(comic){
    return this.favoriteList.some((c) => c.id == comic.id);
  }

  loadList(){
    this.favoriteList = JSON.parse(localStorage.getItem('favoriteList')) || [];
    if(!this.heroId){
      this.comics = this.favoriteList;
    }else {
      this.loading = true;
      this.marvelService.getComics(this.page, this.heroId).subscribe(
        (value: any) =>{
          this.comics = value.data.results;
          this.total = value.data.total;
          this.loading = false;
        },
        
        () => (this.loading = false)
        
      );
    }
    console.log(this.comics);
    
  }

  changePage(page){
    this.page = page;
    this.loadList();
  }

}

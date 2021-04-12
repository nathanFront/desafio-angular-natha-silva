import { Component, Input, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ListHqComponent } from '../list-hq/list-hq.component';

@Component({
  selector: 'app-hero',
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.scss']
})
export class HeroComponent implements OnInit {
@Input('hero') hero: any = {};

  constructor( private modalService: NgbModal) {
   
   }

  ngOnInit() {
  }

  public get imageSrc(): string{
    return this.hero.thumbnail.path + '/standard_amazing.' + this.hero.thumbnail.extension
  }

  openComics(){
    console.log('teste');
    
    const modalRef = this.modalService.open(ListHqComponent);
    modalRef.componentInstance.heroId = this.hero.id
  }
}

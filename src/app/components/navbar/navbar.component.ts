import { Component, OnInit } from '@angular/core';
import { MarvelService } from 'src/app/shared/marvel.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  public name = '';
  constructor( private marvelService: MarvelService) { }

  ngOnInit() {
  }


  onSubmit(){
    this.marvelService.emitChangeFilter(this.name);
  }
}

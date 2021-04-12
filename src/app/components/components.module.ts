import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { ComicComponent } from "./comic/comic.component";
import { ContentComponent } from "./content/content.component";
import { HeroComponent } from "./hero/hero.component";
import { ListHqComponent } from "./list-hq/list-hq.component";
import { LoadingComponent } from "./loading/loading.component";
import { NavbarComponent } from "./navbar/navbar.component";
import { PaginationComponent } from "./pagination/pagination.component";

@NgModule({
    declarations: [HeroComponent, NavbarComponent, ContentComponent, ListHqComponent, ComicComponent, PaginationComponent, LoadingComponent],
    imports:[
    CommonModule,
    FormsModule
],
exports: [ NavbarComponent, ContentComponent, ListHqComponent],
entryComponents: [LoadingComponent, ListHqComponent, PaginationComponent]
})

export class ComponentsModule{}
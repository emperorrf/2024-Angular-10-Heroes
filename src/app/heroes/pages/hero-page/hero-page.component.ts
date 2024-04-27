import { Component, OnInit } from '@angular/core';
import { HeroesService } from '../../services/heroes.service';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { Hero } from '../../interfaces/hero.interface';

@Component({
  selector: 'app-hero-page',
  templateUrl: './hero-page.component.html',
  styles: ``
})
export class HeroPageComponent implements OnInit {

  public hero?: Hero;

  constructor( private heroesService: HeroesService,
               private activatedRoute: ActivatedRoute,
               private router: Router ){};

  ngOnInit(): void {
    this.activatedRoute.params
      .pipe(
        switchMap ( ({id}) => this.heroesService.getHeroById( id ))
      )
      .subscribe( hero => {
        if (!hero) return this.router.navigateByUrl("heroes/list");
        //if (!hero) return this.router.navigate(['heroes', 'list'], { skipLocationChange: true});
        // skipLocationChange: true -> al redireccionar no cambia la url en el navegador
        //if (!hero) return this.router.navigate(['heroes/list']); Como el path es estático se puede poner como un string
        this.hero = hero;
        console.log({hero});

        return;
      }
      )
  };

  goBack():void {
    this.router.navigateByUrl('heroes/list');
  }

}

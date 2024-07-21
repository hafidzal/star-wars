import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SwapiService } from '../../services/swapi.services';
import { forkJoin } from 'rxjs';
import { NgForOf, NgIf } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-character-details',
  standalone: true,
  imports: [NgForOf, NgIf, MatIconModule, MatProgressSpinnerModule],
  templateUrl: './character-details.component.html',
  styleUrl: './character-details.component.css'
})
export class CharacterDetailsComponent {
  person: any;
  films: any[] = [];
  species: any[] = [];
  starships: any[] = [];
  vehicles: any[] = [];
  isLoading: boolean = true;

  constructor(
    private route: ActivatedRoute,
    private swapiService: SwapiService
  ) { }

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    const id = idParam ? +idParam : 0;

    this.swapiService.getPerson(id).subscribe(person => {
      this.isLoading = false;
      this.person = person;
      this.fetchDetails(person);
    });
  }

  fetchDetails(person: any): void {
    forkJoin(this.swapiService.getFilms(person.films)).subscribe(data => this.films = data);
    forkJoin(this.swapiService.getSpecies(person.species)).subscribe(data => this.species = data);
    forkJoin(this.swapiService.getStarships(person.starships)).subscribe(data => this.starships = data);
    forkJoin(this.swapiService.getVehicles(person.vehicles)).subscribe(data => this.vehicles = data);
  }

  goBack(): void {
    window.history.back();
  }
}

import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet, Router } from '@angular/router';
import { SwapiService } from '../../services/swapi.services';
import { NgForOf, NgIf } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-character-list',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive, NgForOf, NgIf, MatCardModule, MatListModule, MatButtonModule, MatToolbarModule, MatProgressSpinnerModule],
  templateUrl: './character-list.component.html',
  styleUrl: './character-list.component.css'
})
export class CharacterListComponent {
  characters: any[] = [];
  isLoading: boolean = true;

  constructor(private swapiService: SwapiService, private router: Router) { }

  ngOnInit(): void {
    this.swapiService.getPeople().subscribe(data => {
      this.isLoading = false;
      this.characters = data.results;
    });
  }

  goToDetail(id: number): void {
    this.router.navigate(['/character', id]);
  }
}

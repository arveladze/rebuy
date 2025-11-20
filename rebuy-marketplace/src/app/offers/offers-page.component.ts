import { Component, inject } from "@angular/core";
import { OffersStore } from "./data/offers.store";
import { OffersListComponent } from "./ui/offers-list.component";

@Component({
	imports: [OffersListComponent],
	template: `
    <div class="d-flex justify-content-between align-items-end">
      <h1>Best offers</h1>

      <div class="d-flex align-items-center">
        sort by votes:
        <button class="btn btn-link"
        (click)="store.toggleSort()" 
        aria-label="Toggle sort direction">
          <i class="bi"
          [class]="store.sortOrder$()==='asc' ? 'bi-sort-numeric-up-alt' : 'bi-sort-numeric-down'"></i>
      </button>
      </div>
    </div>

		@if (store.loading$()) {
			loading...
		} @else if (store.error$()) {
			{{store.error$()}}
		} @else {
      <app-offers-list 
        [offers]="store.sortedOffers$()"
        (vote)="store.vote($event)" />
		}
  `,
})
export class OffersPageComponent {
	protected store = inject(OffersStore);

	constructor() {
		this.store.loadAll();
	}
}

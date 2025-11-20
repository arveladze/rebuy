import { Component, input, output } from "@angular/core";
import { Offer, Vote } from "../data/offer.schema";
import { CardComponent } from "./card.component";

@Component({
	selector: "app-offers-list",
	imports: [CardComponent],
	template: `
      <div id="offers-grid">
        @for (offer of offers(); track offer.id) {
          <app-card [offer]="offer" (vote)=vote.emit($event) />
        } 
        @empty {
          no items
        }
      </div>
  `,
	styles: `
    #offers-grid {
      display: grid;
      gap: 2em;
      grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
    }
  `,
})
export class OffersListComponent {
	offers = input.required<Offer[]>();
	vote = output<Vote>();
}

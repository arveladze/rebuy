import { Component, effect, inject, input } from "@angular/core";
import { OffersStore } from "./data/offers.store";
import { CardComponent } from "./ui/card.component";

@Component({
	imports: [CardComponent],
	template: `
    @if (store.loading$()) {
      loading...
    } @else if (store.error$()) {
      {{store.error$()}}
    } @else if (store.selected$()) {
        <app-card [offer]="store.selected$()!" (vote)="store.vote($event)" [isDetailed]="true" />
    }
  `,
	styles: `
    :host {
      display: flex;
      justify-content: center;
    }
  `,
})
export class OfferDetailsPageComponent {
	protected store = inject(OffersStore);

	offerId = input.required<string>();

	constructor() {
		effect(() => {
			this.store.loadOne(this.offerId());
		});
	}
}

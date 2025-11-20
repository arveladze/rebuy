import { Routes } from "@angular/router";
import { OfferDetailsPageComponent } from "./offers/offer-details-page.component";
import { OffersPageComponent } from "./offers/offers-page.component";

export const routes: Routes = [
	{
		path: "offers",
		component: OffersPageComponent,
	},
	{
		path: "offers/:offerId",
		component: OfferDetailsPageComponent,
	},
	{
		path: "**",
		redirectTo: "offers",
		pathMatch: "full",
	},
];

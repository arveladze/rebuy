import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { map } from "rxjs";
import { Offer, OfferSchema, OffersSchema } from "./offer.schema";

@Injectable({ providedIn: "root" })
export class OffersApi {
	private http = inject(HttpClient);

	private BASE_URL = "https://691ae5e42d8d785575709d0d.mockapi.io/api/offers";

	getOffers() {
		return this.http.get(`${this.BASE_URL}`).pipe(
			map((raw) => {
				const parsed = OffersSchema.safeParse(raw);
				if (!parsed.success) {
					throw parsed.error;
				}
				return parsed.data;
			}),
		);
	}

	getOffer(id: string) {
		return this.http.get(`${this.BASE_URL}/${id}`).pipe(
			map((raw) => {
				const parsed = OfferSchema.safeParse(raw);
				if (!parsed.success) throw parsed.error;
				return parsed.data;
			}),
		);
	}

	vote(updated: Offer) {
		return this.http.put<Offer>(`${this.BASE_URL}/${updated.id}`, updated).pipe(
			map((raw) => {
				const parsed = OfferSchema.safeParse(raw);
				if (!parsed.success) throw parsed.error;
				return parsed.data;
			}),
		);
	}
}

import { computed, inject, Injectable, signal } from "@angular/core";
import { catchError, of } from "rxjs";
import { Offer, Vote } from "./offer.schema";
import { OffersApi } from "./offers-api.service";

export type SortOrder = "asc" | "desc";

@Injectable({ providedIn: "root" })
export class OffersStore {
	private api = inject(OffersApi);

	private offers = signal<Offer[]>([]);
	private selected = signal<Offer | null>(null);
	private loading = signal(false);
	private error = signal<string | null>(null);
	private sortOrder = signal<SortOrder>("desc");

	offers$ = computed(() => this.offers());
	selected$ = computed(() => this.selected());
	loading$ = computed(() => this.loading());
	error$ = computed(() => this.error());
	sortOrder$ = computed(() => this.sortOrder());
	sortedOffers$ = computed(() => {
		const order = this.sortOrder();
		return [...this.offers()].sort((a, b) =>
			order === "desc" ? b.votes - a.votes : a.votes - b.votes,
		);
	});

	toggleSort() {
		this.sortOrder.update((o) => (o === "desc" ? "asc" : "desc"));
	}

	setSort(order: SortOrder) {
		this.sortOrder.set(order);
	}

	loadAll() {
		this.loading.set(true);
		this.error.set(null);
		this.api
			.getOffers()
			.pipe(
				catchError(() => {
					this.error.set("Failed to load offers");
					this.loading.set(false);
					return of<Offer[]>([]);
				}),
			)
			.subscribe((list) => {
				this.offers.set(list);
				this.loading.set(false);
			});
	}

	loadOne(id: string) {
		this.loading.set(true);
		this.error.set(null);

		this.api
			.getOffer(id)
			.pipe(
				catchError(() => {
					this.error.set("Failed to load offer");
					this.loading.set(false);
					return of(null);
				}),
			)
			.subscribe((offer) => {
				this.selected.set(offer);
				this.loading.set(false);
			});
	}

	vote(vote: Vote) {
		const current = this.offers().find((o) => o.id === vote.id);
		if (!current) return;

		const updated: Offer = {
			...current,
			votes: current.votes + vote.delta,
		};

		this.error.set(null);

		this.api
			.vote(updated)
			.pipe(
				catchError(() => {
					this.error.set("Failed to vote");
					return of(null);
				}),
			)
			.subscribe((updated) => {
				if (!updated) return;

				document.startViewTransition(()=>
					this.offers.update((list) =>
						list.map((o) => (o.id === vote.id ? updated : o)),
			)
		)

				if (this.selected()?.id === vote.id) {
					this.selected.set(updated);
				}
			});
	}
}

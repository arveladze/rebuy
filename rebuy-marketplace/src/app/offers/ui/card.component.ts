import { Component, input, output } from "@angular/core";
import { RouterLink } from "@angular/router";
import { Offer, Vote } from "../data/offer.schema";

@Component({
	selector: "app-card",
	imports: [RouterLink],
	template: `
    <div class="card d-flex" [style.view-transition-name]="'offer-'+offer().id">
      <a class="x" [routerLink]="[offer().id]">
        <img [src]="offer().imageUrl" loading="lazy" class="card-img-top" [alt]="offer().name" />
      </a>

      <div class="card-body p-2 py-0 d-flex flex-column justify-content-evenly gap-2">
        <a class="text-reset" [routerLink]="['.', offer().id]">
          <h6 class="card-title mt-3">{{offer().name}}</h6>
        </a>

        <p [style.display]="isDetailed() ? 'block' : 'none'">{{offer().description}}</p>

        <div class="d-flex justify-content-evenly">
          <span class="fw-bolder fs-4">{{offer().price}} €</span>

          <button type="button" class="btn btn-primary">
            <i class="bi bi-cart2"></i>
            Buy
          </button>
        </div>

        <div class="d-flex justify-content-center align-items-center">
          <button type="button" class="btn btn-lg p-2" (click)="vote.emit({id: offer().id, delta: -1 })" aria-label="Downvote {{offer().name}}">
            <i class="bi bi-hand-thumbs-down text-danger"></i>
          </button>

          <span class="fs-3">{{offer().votes}}</span>

          <button type="button" class="btn btn-lg p-2" (click)="vote.emit({id: offer().id, delta: 1 })" aria-label="Upvote {{offer().name}}">
            <i class="bi bi-hand-thumbs-up text-success"></i>
          </button>
        </div>
      </div>
    </div>
  `,
  styles: `
    .card {
      max-width: 600px;
    }
  `
})
export class CardComponent {
	offer = input.required<Offer>();
	vote = output<Vote>();
	isDetailed = input(false);
}

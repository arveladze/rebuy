import { Component } from "@angular/core";
import { RouterOutlet } from "@angular/router";

@Component({
	selector: "app-root",
	imports: [RouterOutlet],
	template: `
		<div class="container-xxl p-5">
			<router-outlet />
		</div>
  `,
})
export class App {}

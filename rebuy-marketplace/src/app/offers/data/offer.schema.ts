import { z } from "zod";

export const OfferSchema = z.object({
	id: z.string(),
	name: z.string(),
	votes: z.coerce.number().int(),
	description: z.string(),
	price: z.string(),
	imageUrl: z.string().url(),
});

export type Offer = z.infer<typeof OfferSchema>;

export const OffersSchema = z.array(OfferSchema);

export interface Vote {
	id: string;
	delta: -1 | 1;
}

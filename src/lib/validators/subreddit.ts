import { z } from "zod";

export const SubredditValidators = z.object({
  name: z.string().min(3).max(21),
});

export const SubredditSubscriptionValidators = z.object({
  subredditId: z.string(),
});

export type CreateSubredditPayload = z.infer<typeof SubredditValidators>;
export type SubscribeToSubredditPayload = z.infer<
  typeof SubredditSubscriptionValidators
>;

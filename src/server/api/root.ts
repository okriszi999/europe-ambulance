import { createTRPCRouter } from "@/server/api/trpc";
import { caseRouter } from "@/server/api/routers/case";
import { samplerRouter } from "@/server/api/routers/sampler";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  case: caseRouter,
  sampler: samplerRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;

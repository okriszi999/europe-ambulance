import { z } from "zod";

import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "@/server/api/trpc";

export const samplerRouter = createTRPCRouter({
  getAll: protectedProcedure.query(({ ctx }) => {
    return ctx.prisma.sampler.findMany({
      include: {
        cases: {
          include: {
            client: true,
          },
        },
      },
    });
  }),

  create: protectedProcedure
    .input(
      z.object({
        name: z.string(),
        email: z.string().email(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      console.log(input);
      return await ctx.prisma.sampler.create({
        data: {
          name: input.name,
          email: input.email,
        },
      });
    }),

  delete: protectedProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      return await ctx.prisma.sampler.delete({
        where: {
          id: input.id,
        },
      });
    }),

  modify: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        name: z.string(),
        email: z.string().email(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      return await ctx.prisma.sampler.update({
        where: {
          id: input.id,
        },
        data: {
          name: input.name,
          email: input.email,
        },
      });
    }),

  getOffCase: protectedProcedure
    .input(
      z.object({
        samplerId: z.string(),
        caseId: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      return await ctx.prisma.sampler.update({
        where: {
          id: input.samplerId,
        },

        data: {
          cases: {
            disconnect: {
              id: input.caseId,
            },
          },
        },
        include: {
          cases: true,
        },
      });
    }),
});

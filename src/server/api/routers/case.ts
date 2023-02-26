import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import { CreateCaseSchema } from "@/schema/CreateCaseSchema";
import { TRPCError } from "@trpc/server";
import { Prisma } from "@prisma/client";

export const caseRouter = createTRPCRouter({
  create: protectedProcedure
    .input(CreateCaseSchema)
    .mutation(async ({ ctx, input }) => {
      try {
        const caseObj = await ctx.prisma.case.create({
          data: {
            seen: false,
            state: 1,
            client: {
              create: {
                email: input.email,
                firstName: input.firstName,
                lastName: input.lastName,
                gender: input.gender,
                phoneNumber: input.phoneNumber,
                birthDay: input.birthday,
                address: {
                  create: {
                    liveZip: Number.parseInt(input.address.home.zip),
                    liveCity: input.address.home.city,
                    liveAddress: input.address.home.address,
                    testZip: Number.parseInt(input.address.sample.zip),
                    testCity: input.address.sample.city,
                    testAddress: input.address.sample.address,
                    billingZip: Number.parseInt(input.address.billing.zip),
                    billingCity: input.address.billing.city,
                    billingAddress: input.address.billing.address,
                    birthPlace: input.address.home.city,
                  },
                },
                identification: {
                  create: {
                    cardNumber: input.identification.number,
                    taj: input.identification.taj,
                    type: input.identification.type,
                  },
                },
              },
            },
          },
          include: {
            client: {
              include: {
                identification: true,
                address: true,
              },
            },
          },
        });

        console.log("Created Object:", caseObj);

        return caseObj;
      } catch (e) {
        if (e instanceof Prisma.PrismaClientKnownRequestError) {
          console.log(e.code);
          if (e.code === "P2002") {
            throw new TRPCError({
              code: "CONFLICT",
              message:
                "Ezzel az emaillel már van ügyfél felvéve|LétezőEmailHiba",
              cause: "LétezőEmailHiba",
            });
          }

          throw new TRPCError({
            code: "INTERNAL_SERVER_ERROR",
            message: "Valami nem sikerült..",
          });
        }
      }
    }),

  getAll: protectedProcedure.query(async ({ ctx }) => {
    return ctx.prisma.case.findMany({
      include: {
        client: {
          include: {
            address: true,
            identification: true,
          },
        },
        sampler: true,
      },
    });
  }),
});

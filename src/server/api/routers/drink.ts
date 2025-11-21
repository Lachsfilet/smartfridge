import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";

export const drinkRouter = createTRPCRouter({
  // Get all drinks
  getAll: publicProcedure.query(async ({ ctx }) => {
    const drinks = await ctx.db.drink.findMany({
      orderBy: [
        { openedQuantity: "desc" }, // Opened drinks first
        { quantity: "desc" }, // Then by quantity
        { name: "asc" }, // Then alphabetically
      ],
    });

    return drinks;
  }),

  // Get drink by barcode
  getByBarcode: publicProcedure
    .input(z.object({ barcode: z.string() }))
    .query(async ({ ctx, input }) => {
      const drink = await ctx.db.drink.findUnique({
        where: { barcode: input.barcode },
      });

      return drink;
    }),

  // Create a new drink
  create: publicProcedure
    .input(
      z.object({
        barcode: z.string().min(1),
        name: z.string().min(1),
        quantity: z.number().int().min(0).default(1),
        openedQuantity: z.number().int().min(0).default(0),
      })
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.db.drink.create({
        data: {
          barcode: input.barcode,
          name: input.name,
          quantity: input.quantity,
          openedQuantity: input.openedQuantity,
        },
      });
    }),

  // Update drink quantity
  updateQuantity: publicProcedure
    .input(
      z.object({
        id: z.number(),
        quantity: z.number().int().min(0),
      })
    )
    .mutation(async ({ ctx, input }) => {
      // Get current drink state
      const drink = await ctx.db.drink.findUnique({
        where: { id: input.id },
      });

      if (!drink) {
        throw new Error("Drink not found");
      }

      // If new quantity is less than opened quantity, adjust opened quantity
      const openedQuantity = Math.min(drink.openedQuantity, input.quantity);

      return ctx.db.drink.update({
        where: { id: input.id },
        data: { 
          quantity: input.quantity,
          openedQuantity,
        },
      });
    }),

  // Update opened quantity
  updateOpenedQuantity: publicProcedure
    .input(
      z.object({
        id: z.number(),
        openedQuantity: z.number().int().min(0),
      })
    )
    .mutation(async ({ ctx, input }) => {
      // Get current drink state
      const drink = await ctx.db.drink.findUnique({
        where: { id: input.id },
      });

      if (!drink) {
        throw new Error("Drink not found");
      }

      // Ensure opened quantity doesn't exceed total quantity
      const openedQuantity = Math.min(input.openedQuantity, drink.quantity);

      return ctx.db.drink.update({
        where: { id: input.id },
        data: { openedQuantity },
      });
    }),

  // Delete a drink
  delete: publicProcedure
    .input(z.object({ id: z.number() }))
    .mutation(async ({ ctx, input }) => {
      return ctx.db.drink.delete({
        where: { id: input.id },
      });
    }),
});

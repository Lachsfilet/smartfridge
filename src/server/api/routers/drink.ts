import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";

export const drinkRouter = createTRPCRouter({
  // Get all drinks
  getAll: publicProcedure.query(async ({ ctx }) => {
    const drinks = await ctx.db.drink.findMany({
      orderBy: [
        { isOpened: "desc" }, // Opened drinks first
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
        isOpened: z.boolean().default(false),
      })
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.db.drink.create({
        data: {
          barcode: input.barcode,
          name: input.name,
          quantity: input.quantity,
          isOpened: input.isOpened,
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
      return ctx.db.drink.update({
        where: { id: input.id },
        data: { quantity: input.quantity },
      });
    }),

  // Update drink status (opened/closed)
  updateStatus: publicProcedure
    .input(
      z.object({
        id: z.number(),
        isOpened: z.boolean(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.db.drink.update({
        where: { id: input.id },
        data: { isOpened: input.isOpened },
      });
    }),

  // Open drinks (mark as opened and reduce quantity)
  openDrinks: publicProcedure
    .input(
      z.object({
        id: z.number(),
        count: z.number().int().min(1),
      })
    )
    .mutation(async ({ ctx, input }) => {
      // Get the current drink
      const drink = await ctx.db.drink.findUnique({
        where: { id: input.id },
      });

      if (!drink) {
        throw new Error("Drink not found");
      }

      if (input.count > drink.quantity) {
        throw new Error("Cannot open more drinks than available");
      }

      // Update the drink: mark as opened and reduce quantity
      return ctx.db.drink.update({
        where: { id: input.id },
        data: {
          isOpened: true,
          quantity: drink.quantity - input.count,
        },
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

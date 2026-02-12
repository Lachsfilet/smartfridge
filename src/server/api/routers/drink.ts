import {z} from "zod";

import {createTRPCRouter, publicProcedure} from "@/server/api/trpc";
import type {Pfand} from '@/models/pfand.model';
import { PfandType } from '@/models/enums/pfand-type.enum'

export const drinkRouter = createTRPCRouter({
    // Get all drinks
    getAll: publicProcedure.query(async ({ctx}) => {
        const drinks = await ctx.db.drink.findMany({
            orderBy: [
                {openedQuantity: "desc"}, // Opened drinks first
                {quantity: "desc"}, // Then by quantity
                {name: "asc"}, // Then alphabetically
            ],
        });

        return drinks;
    }),

    // Get drink by barcode
    getByBarcode: publicProcedure
        .input(z.object({barcode: z.string()}))
        .query(async ({ctx, input}) => {
            const drink = await ctx.db.drink.findUnique({
                where: {barcode: input.barcode},
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
        .mutation(async ({ctx, input}) => {
            return ctx.db.drink.create({
                data: {
                    barcode: input.barcode,
                    name: input.name,
                    quantity: input.quantity,
                    openedQuantity: input.openedQuantity,
                },
            });
        }),

    updateBaseData: publicProcedure
        .input(
            z.object({
                id: z.number(),
                name: z.string(),
                barcode: z.string(),
            })
        )
        .mutation(async ({ctx, input}) => {
            const drink = await ctx.db.drink.findUnique({
                where: {id: input.id},
            });

            if (!drink) {
                throw new Error("Drink not found");
            }

            return ctx.db.drink.update({
                where: {id: input.id},
                data: {
                    name: input.name,
                    barcode: input.barcode,
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
        .mutation(async ({ctx, input}) => {
            // Get current drink state
            const drink = await ctx.db.drink.findUnique({
                where: {id: input.id},
            });

            if (!drink) {
                throw new Error("Drink not found");
            }

            // If new quantity is less than opened quantity, adjust opened quantity
            const openedQuantity = Math.min(drink.openedQuantity, input.quantity);

            return ctx.db.drink.update({
                where: {id: input.id},
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
        .mutation(async ({ctx, input}) => {
            // Get current drink state
            const drink = await ctx.db.drink.findUnique({
                where: {id: input.id},
            });

            if (!drink) {
                throw new Error("Drink not found");
            }

            // Ensure opened quantity doesn't exceed total quantity
            const openedQuantity = Math.min(input.openedQuantity, drink.quantity);

            return ctx.db.drink.update({
                where: {id: input.id},
                data: {openedQuantity},
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
        .mutation(async ({ctx, input}) => {
            // Get the current drink
            const drink = await ctx.db.drink.findUnique({
                where: {id: input.id},
            });

            if (!drink) {
                throw new Error("Drink not found");
            }

            if (input.count > drink.quantity) {
                throw new Error("Cannot open more drinks than available");
            }

            // Update the drink: mark as opened and reduce quantity
            return ctx.db.drink.update({
                where: {id: input.id},
                data: {
                    openedQuantity: input.count,
                    quantity: drink.quantity - input.count,
                },
            });
        }),

    // Delete a drink
    delete: publicProcedure
        .input(z.object({id: z.number()}))
        .mutation(async ({ctx, input}) => {
            return ctx.db.drink.delete({
                where: {id: input.id},
            });
        }),

    getPfand: publicProcedure.query(async ({ctx}) => {
        const unmappedPfand = await ctx.db.pfand.findMany({
            orderBy: [
                {quantity: "desc"},
            ],
        });

        let einweg: Pfand = {id: 0, quantity: 0, pfandType: PfandType.EINWEG}
        let mehrweg: Pfand = {id: 0, quantity: 0, pfandType: PfandType.MEHRWEG}
        let glas: Pfand = {id: 0, quantity: 0, pfandType: PfandType.GLAS}

        unmappedPfand.forEach((pfand) => {
            switch (pfand.pfandType){
                case "EINWEG":
                    einweg = {
                        id: pfand.id,
                        quantity: pfand.quantity,
                        pfandType: PfandType.EINWEG
                    };
                    break;
                case "MEHRWEG":
                    mehrweg = {
                        id: pfand.id,
                        quantity: pfand.quantity,
                        pfandType: PfandType.MEHRWEG
                    };
                    break;
                case "GLAS":
                    glas = {
                        id: pfand.id,
                        quantity: pfand.quantity,
                        pfandType: PfandType.GLAS
                    };
                    break;
            }
        })

        const pfand = {
            einweg,
            mehrweg,
            glas
        }


        const pfandValue = {
            einweg: einweg.quantity * .25,
            mehrweg: mehrweg.quantity * .15,
            glas: glas.quantity * .08,
            total: (einweg.quantity * .25) + (mehrweg.quantity * .15) + (glas.quantity * .08)
        }

        return {pfand, pfandValue};
    }),

    addPfand: publicProcedure
        .input(z.object({ id: z.number()}))
        .mutation(async ({ctx, input}) => {
            const pfand = await ctx.db.pfand.findUniqueOrThrow({
                where: {
                    id: input.id
                }
            })

            return ctx.db.pfand.update({
                where: {id: input.id},
                data: {
                    quantity: pfand.quantity + 1
                }
            })
        }),

    removePfand: publicProcedure
        .input(z.object({ id: z.number()}))
        .mutation(async ({ctx, input}) => {
            const pfand = await ctx.db.pfand.findUniqueOrThrow({
                where: {
                    id: input.id
                }
            })

            if (pfand.quantity === 0) {
                throw new Error("Cannot have less pfand than 0");
            }

            return ctx.db.pfand.update({
                where: {id: input.id},
                data: {
                    quantity: pfand.quantity - 1
                }
            })
        }),


    updatePfand: publicProcedure
        .input(z.object({id: z.number(), quantity: z.number()}))
        .mutation(async ({ctx, input}) => {

            if (input.quantity < 0) {
                throw new Error("Cannot have less pfand than 0");
            }

            return ctx.db.pfand.update({
                where: {id: input.id},
                data: {
                    quantity: input.quantity
                }
            })
        }),

    // Get all crates
    getAllCrates: publicProcedure.query(async ({ctx}) => {
        return ctx.db.crate.findMany({
            include: {drink: true},
            orderBy: [{name: "asc"}],
        });
    }),

    // Get crate by barcode
    getCrateByBarcode: publicProcedure
        .input(z.object({barcode: z.string()}))
        .query(async ({ctx, input}) => {
            return ctx.db.crate.findUnique({
                where: {barcode: input.barcode},
                include: {drink: true},
            });
        }),

    // Create a new crate
    createCrate: publicProcedure
        .input(
            z.object({
                barcode: z.string().min(1),
                name: z.string().min(1),
                drinkId: z.number(),
                defaultPfandType: z.enum(["EINWEG", "MEHRWEG", "GLAS"]),
            })
        )
        .mutation(async ({ctx, input}) => {
            return ctx.db.crate.create({
                data: {
                    barcode: input.barcode,
                    name: input.name,
                    drinkId: input.drinkId,
                    defaultPfandType: input.defaultPfandType,
                },
                include: {drink: true},
            });
        }),

    // Scan a crate: decrement closed bottle count by 1
    scanCrate: publicProcedure
        .input(z.object({crateId: z.number()}))
        .mutation(async ({ctx, input}) => {
            const crate = await ctx.db.crate.findUnique({
                where: {id: input.crateId},
                include: {drink: true},
            });

            if (!crate) {
                throw new Error("Crate not found");
            }

            const closedQuantity = crate.drink.quantity - crate.drink.openedQuantity;
            if (closedQuantity <= 0) {
                throw new Error("No closed bottles available in this crate");
            }

            // Decrement the drink quantity by 1 (remove one closed bottle)
            await ctx.db.drink.update({
                where: {id: crate.drink.id},
                data: {
                    quantity: crate.drink.quantity - 1,
                },
            });

            return crate;
        }),

    // Update a crate
    updateCrate: publicProcedure
        .input(
            z.object({
                id: z.number(),
                barcode: z.string().min(1),
                name: z.string().min(1),
                drinkId: z.number(),
                defaultPfandType: z.enum(["EINWEG", "MEHRWEG", "GLAS"]),
            })
        )
        .mutation(async ({ctx, input}) => {
            const crate = await ctx.db.crate.findUnique({
                where: {id: input.id},
            });

            if (!crate) {
                throw new Error("Crate not found");
            }

            return ctx.db.crate.update({
                where: {id: input.id},
                data: {
                    barcode: input.barcode,
                    name: input.name,
                    drinkId: input.drinkId,
                    defaultPfandType: input.defaultPfandType,
                },
                include: {drink: true},
            });
        }),

    // Delete a crate
    deleteCrate: publicProcedure
        .input(z.object({id: z.number()}))
        .mutation(async ({ctx, input}) => {
            return ctx.db.crate.delete({
                where: {id: input.id},
            });
        }),
});
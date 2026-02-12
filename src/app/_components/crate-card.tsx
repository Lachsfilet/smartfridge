"use client";

import { PfandType } from "@/models/enums/pfand-type.enum";

interface CrateCardProps {
    crate: {
        id: number;
        barcode: string;
        name: string;
        defaultPfandType: string;
        drink: {
            id: number;
            name: string;
            quantity: number;
            openedQuantity: number;
        };
    };
    onClick: () => void;
}

export function CrateCard({ crate, onClick }: CrateCardProps) {
    const closedQuantity = crate.drink.quantity - crate.drink.openedQuantity;

    let pfandLabel = "";
    let pfandValue = 0;
    switch (crate.defaultPfandType) {
        case "EINWEG":
            pfandLabel = PfandType.EINWEG;
            pfandValue = 0.25;
            break;
        case "MEHRWEG":
            pfandLabel = PfandType.MEHRWEG;
            pfandValue = 0.15;
            break;
        case "GLAS":
            pfandLabel = PfandType.GLAS;
            pfandValue = 0.08;
            break;
    }

    const totalPfandValue = closedQuantity * pfandValue;

    return (
        <div
            onClick={onClick}
            className="bg-white border-2 border-gray-200 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow cursor-pointer"
        >
            <div className="flex items-center justify-between">
                <div className="flex-1">
                    <h3 className="font-semibold text-lg text-gray-800">
                        📦 {crate.name}
                    </h3>
                    <p className="text-sm text-gray-500">
                        Getränk: {crate.drink.name}
                    </p>
                    <div className="mt-2 flex flex-wrap gap-2">
                        <span className="px-3 py-1 rounded-full text-xs font-medium bg-blue-200 text-blue-800">
                            {closedQuantity} Flaschen
                        </span>
                        <span className="px-3 py-1 rounded-full text-xs font-medium bg-slate-200 text-green-800">
                            {pfandLabel}
                        </span>
                        <span className="px-3 py-1 rounded-full text-xs font-medium bg-green-200 text-green-800">
                            Pfandwert: {totalPfandValue.toFixed(2)}€
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}

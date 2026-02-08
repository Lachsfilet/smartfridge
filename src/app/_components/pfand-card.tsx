"use client";
import type {Pfand} from '@/models/pfand.model'
import {PfandType} from '@/models/enums/pfand-type.enum'

interface PfandCardProps {
    pfand: Pfand;
    onQuantityChange: (id: number, quantity: number) => void;
}

export function PfandCard({
                              pfand,
                              onQuantityChange,
                          }: PfandCardProps) {

    let euroBottleValue = 0.00

    switch (pfand.pfandType) {
        case PfandType.EINWEG:
            euroBottleValue = 0.25
            break
        case PfandType.MEHRWEG:
            euroBottleValue = 0.15
            break
        case PfandType.GLAS:
            euroBottleValue = 0.08
    }

    return (
        <div className="bg-white border-2 border-gray-200 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
                <div className="flex-1">
                    <h3 className="font-semibold text-lg text-gray-800">{pfand.pfandType}</h3>
                    {pfand.quantity > 0 && (
                        <div className="mt-2">
                          <span className="px-3 py-1 rounded-full text-xs font-medium bg-slate-200 text-green-800">
                            Gesamtwert: {euroBottleValue*pfand.quantity}€
                          </span>
                        </div>
                    )}
                </div>

                <div className="flex items-center gap-3">
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            onQuantityChange(pfand.id, pfand.quantity - 1);
                        }}
                        disabled={pfand.quantity === 0}
                        className="w-10 h-10 rounded-full bg-red-500 text-white font-bold text-xl disabled:bg-gray-300 disabled:cursor-not-allowed hover:bg-red-600 active:scale-95 transition-all"
                    >
                        −
                    </button>
                    <span className="text-2xl font-bold text-gray-800 w-12 text-center">
            {pfand.quantity}
          </span>
                    <button
                        onClick={(e) => {
                            e.stopPropagation(); // Prevent card click when incrementing
                            onQuantityChange(pfand.id, pfand.quantity + 1);
                        }}
                        className="w-10 h-10 rounded-full bg-green-500 text-white font-bold text-xl hover:bg-green-600 active:scale-95 transition-all"
                    >
                        +
                    </button>
                </div>
            </div>
        </div>
    );
}

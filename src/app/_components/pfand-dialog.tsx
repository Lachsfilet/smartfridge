"use client";

import { useState, useEffect } from "react";
import type { Pfand } from "@/models/pfand.model";
import { PfandType } from "@/models/enums/pfand-type.enum";

interface PfandDialogProps {
    pfand: Pfand;
    isOpen: boolean;
    onClose: () => void;
    onQuantityChange: (id: number, quantity: number) => void;
}

export function PfandDialog({
    pfand,
    isOpen,
    onClose,
    onQuantityChange,
}: PfandDialogProps) {
    const [localQuantity, setLocalQuantity] = useState(
        pfand.quantity.toString(),
    );

    let euroBottleValue = 0.0;
    switch (pfand.pfandType) {
        case PfandType.EINWEG:
            euroBottleValue = 0.25;
            break;
        case PfandType.MEHRWEG:
            euroBottleValue = 0.15;
            break;
        case PfandType.GLAS:
            euroBottleValue = 0.08;
            break;
    }

    useEffect(() => {
        setLocalQuantity(pfand.quantity.toString());
    }, [pfand.quantity]);

    if (!isOpen) return null;

    const handleIncrement = () => {
        const current = parseInt(localQuantity, 10) || 0;
        setLocalQuantity((current + 1).toString());
    };

    const handleDecrement = () => {
        const current = parseInt(localQuantity, 10) || 0;
        if (current > 0) {
            setLocalQuantity((current - 1).toString());
        }
    };

    const handleClose = () => {
        const finalQuantity = parseInt(localQuantity, 10);
        const validQuantity =
            !isNaN(finalQuantity) && finalQuantity >= 0 ? finalQuantity : 0;
        onQuantityChange(pfand.id, validQuantity);
        onClose();
    };

    const handleCloseWithoutSave = () => {
        setLocalQuantity(pfand.quantity.toString());
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
                <div className="p-6">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-2xl font-bold text-gray-800">
                            {pfand.pfandType}
                        </h2>
                        <button
                            onClick={handleCloseWithoutSave}
                            className="text-gray-500 hover:text-gray-700 text-2xl"
                        >
                            ×
                        </button>
                    </div>

                    {/* Quantity Controls */}
                    <div className="mb-6">
                        <label className="block text-sm font-medium text-gray-700 mb-3">
                            Anzahl:
                        </label>
                        <div className="flex items-center justify-center gap-6">
                            <button
                                onClick={handleDecrement}
                                disabled={parseInt(localQuantity, 10) === 0}
                                className="w-16 h-16 rounded-full bg-red-500 text-white font-bold text-3xl disabled:bg-gray-300 disabled:cursor-not-allowed hover:bg-red-600 active:scale-95 transition-all shadow-md"
                            >
                                −
                            </button>
                            <input
                                type="number"
                                min="0"
                                value={localQuantity}
                                onChange={(e) => {
                                    const val = e.target.value;
                                    if (
                                        val === "" ||
                                        (!isNaN(parseInt(val, 10)) &&
                                            parseInt(val, 10) >= 0)
                                    ) {
                                        setLocalQuantity(val);
                                    }
                                }}
                                className="text-5xl font-bold text-gray-800 w-32 text-center border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent py-2"
                            />
                            <button
                                onClick={handleIncrement}
                                className="w-16 h-16 rounded-full bg-green-500 text-white font-bold text-3xl hover:bg-green-600 active:scale-95 transition-all shadow-md"
                            >
                                +
                            </button>
                        </div>
                    </div>

                    {/* Pfand Value */}
                    <div className="bg-green-50 border border-green-200 rounded-lg p-3 mb-6">
                        <p className="text-green-800 text-sm text-center">
                            Gesamtwert:{" "}
                            <span className="font-semibold">
                                {(
                                    euroBottleValue *
                                    (parseInt(localQuantity, 10) || 0)
                                ).toFixed(2)}
                                €
                            </span>
                        </p>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-3">
                        <button
                            onClick={handleClose}
                            className="flex-1 bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors font-medium"
                        >
                            Speichern & Schließen
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

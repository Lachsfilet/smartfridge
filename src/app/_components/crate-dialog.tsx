"use client";

import { useState, useEffect } from "react";
import { api } from "@/trpc/react";

interface CrateDialogProps {
    crate: {
        id: number;
        barcode: string;
        name: string;
        drinkId: number;
        defaultPfandType: string;
        drink: {
            id: number;
            name: string;
        };
    };
    isOpen: boolean;
    onClose: () => void;
    onSuccess: () => void;
}

export function CrateDialog({
    crate,
    isOpen,
    onClose,
    onSuccess,
}: CrateDialogProps) {
    const [localName, setLocalName] = useState(crate.name);
    const [localBarcode, setLocalBarcode] = useState(crate.barcode);
    const [localDrinkId, setLocalDrinkId] = useState(crate.drinkId);
    const [localPfandType, setLocalPfandType] = useState<"EINWEG" | "MEHRWEG" | "GLAS">(crate.defaultPfandType as "EINWEG" | "MEHRWEG" | "GLAS");
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

    const { data: drinks } = api.drink.getAll.useQuery();
    const { data: allCrates } = api.drink.getAllCrates.useQuery();

    // Filter drinks: show the current crate's drink + any drinks not assigned to other crates
    const availableDrinks = drinks?.filter(
        (drink) => drink.id === crate.drinkId || !allCrates?.some((c) => c.drinkId === drink.id)
    ) ?? [];

    const utils = api.useUtils();

    const updateCrateMutation = api.drink.updateCrate.useMutation({
        onSuccess: () => {
            void utils.drink.getAllCrates.invalidate();
            void utils.drink.getAll.invalidate();
            void utils.drink.getPfand.invalidate();
            onSuccess();
            onClose();
        },
    });

    const deleteCrateMutation = api.drink.deleteCrate.useMutation({
        onSuccess: () => {
            void utils.drink.getAllCrates.invalidate();
            void utils.drink.getAll.invalidate();
            void utils.drink.getPfand.invalidate();
            onClose();
        },
        onError: (error) => {
            alert(`Fehler beim Löschen: ${error.message}`);
            setShowDeleteConfirm(false);
        },
    });

    useEffect(() => {
        setLocalName(crate.name);
        setLocalBarcode(crate.barcode);
        setLocalDrinkId(crate.drinkId);
        setLocalPfandType(crate.defaultPfandType as "EINWEG" | "MEHRWEG" | "GLAS");
    }, [crate.name, crate.barcode, crate.drinkId, crate.defaultPfandType]);

    if (!isOpen) return null;

    const handleSave = () => {
        if (!localName.trim() || !localBarcode.trim()) return;

        updateCrateMutation.mutate({
            id: crate.id,
            barcode: localBarcode.trim(),
            name: localName.trim(),
            drinkId: localDrinkId,
            defaultPfandType: localPfandType,
        });
    };

    const handleDelete = () => {
        deleteCrateMutation.mutate({ id: crate.id });
    };

    const handleCloseWithoutSave = () => {
        setLocalName(crate.name);
        setLocalBarcode(crate.barcode);
        setLocalDrinkId(crate.drinkId);
        setLocalPfandType(crate.defaultPfandType as "EINWEG" | "MEHRWEG" | "GLAS");
        setShowDeleteConfirm(false);
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
                <div className="p-6">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-2xl font-bold text-gray-800">
                            Kasten bearbeiten
                        </h2>
                        <button
                            onClick={handleCloseWithoutSave}
                            className="text-gray-500 hover:text-gray-700 text-2xl"
                        >
                            ×
                        </button>
                    </div>

                    <div className="space-y-4">
                        {/* Name Input */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Kastenname *
                            </label>
                            <input
                                type="text"
                                value={localName}
                                onChange={(e) => setLocalName(e.target.value)}
                                placeholder="z.B. Cola-Kasten 20x0.5L"
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                required
                            />
                        </div>

                        {/* Barcode Input */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Barcode *
                            </label>
                            <input
                                type="text"
                                value={localBarcode}
                                onChange={(e) => setLocalBarcode(e.target.value)}
                                placeholder="Barcode"
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                required
                            />
                        </div>

                        {/* Drink Selection */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Zugehöriges Getränk *
                            </label>
                            {availableDrinks.length > 0 ? (
                                <select
                                    value={localDrinkId}
                                    onChange={(e) =>
                                        setLocalDrinkId(parseInt(e.target.value, 10))
                                    }
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    required
                                >
                                    {availableDrinks.map((drink) => (
                                        <option key={drink.id} value={drink.id}>
                                            {drink.name}
                                        </option>
                                    ))}
                                </select>
                            ) : (
                                <p className="text-sm text-gray-500">
                                    Keine Getränke vorhanden.
                                </p>
                            )}
                        </div>

                        {/* Default Pfand Type */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Standard-Pfandtyp
                            </label>
                            <div className="flex gap-2">
                                <button
                                    type="button"
                                    onClick={() => setLocalPfandType("EINWEG")}
                                    className={`flex-1 py-2 px-3 rounded-lg font-medium text-sm transition-colors ${
                                        localPfandType === "EINWEG"
                                            ? "bg-blue-500 text-white"
                                            : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                                    }`}
                                >
                                    🥫 Einweg 25¢
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setLocalPfandType("MEHRWEG")}
                                    className={`flex-1 py-2 px-3 rounded-lg font-medium text-sm transition-colors ${
                                        localPfandType === "MEHRWEG"
                                            ? "bg-blue-500 text-white"
                                            : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                                    }`}
                                >
                                    🍾 Mehrweg 15¢
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setLocalPfandType("GLAS")}
                                    className={`flex-1 py-2 px-3 rounded-lg font-medium text-sm transition-colors ${
                                        localPfandType === "GLAS"
                                            ? "bg-blue-500 text-white"
                                            : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                                    }`}
                                >
                                    🫙 Glas 8¢
                                </button>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex gap-3 mt-6">
                            <button
                                onClick={handleSave}
                                disabled={
                                    updateCrateMutation.isPending ||
                                    !localName.trim() ||
                                    !localBarcode.trim()
                                }
                                className="flex-1 bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors font-medium disabled:bg-gray-400 disabled:cursor-not-allowed"
                            >
                                {updateCrateMutation.isPending
                                    ? "Speichere..."
                                    : "Speichern & Schließen"}
                            </button>
                            <button
                                onClick={() => setShowDeleteConfirm(true)}
                                disabled={deleteCrateMutation.isPending}
                                className="bg-red-600 text-white py-3 px-4 rounded-lg hover:bg-red-700 transition-colors font-medium disabled:bg-gray-400 disabled:cursor-not-allowed"
                                title="Kasten löschen"
                            >
                                🗑️
                            </button>
                        </div>
                    </div>

                    {updateCrateMutation.isError && (
                        <p className="text-red-600 text-sm mt-3">
                            Fehler: {updateCrateMutation.error.message}
                        </p>
                    )}

                    {/* Delete Confirmation Dialog */}
                    {showDeleteConfirm && (
                        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4">
                            <div className="bg-white rounded-lg shadow-xl max-w-sm w-full p-6">
                                <h3 className="text-xl font-bold text-gray-800 mb-3">
                                    Kasten löschen?
                                </h3>
                                <p className="text-gray-600 mb-6">
                                    Möchten Sie{" "}
                                    <span className="font-semibold">{crate.name}</span>{" "}
                                    wirklich löschen? Diese Aktion kann nicht rückgängig
                                    gemacht werden.
                                </p>
                                <div className="flex gap-3">
                                    <button
                                        onClick={() => setShowDeleteConfirm(false)}
                                        disabled={deleteCrateMutation.isPending}
                                        className="flex-1 bg-gray-200 text-gray-800 py-2 px-4 rounded-lg hover:bg-gray-300 transition-colors font-medium disabled:opacity-50"
                                    >
                                        Abbrechen
                                    </button>
                                    <button
                                        onClick={handleDelete}
                                        disabled={deleteCrateMutation.isPending}
                                        className="flex-1 bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 transition-colors font-medium disabled:bg-gray-400 disabled:cursor-not-allowed"
                                    >
                                        {deleteCrateMutation.isPending
                                            ? "Löschen..."
                                            : "Löschen"}
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

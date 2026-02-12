"use client";

import {useState} from "react";
import {api} from "@/trpc/react";

interface CreateCrateDialogProps {
    isOpen: boolean;
    onClose: () => void;
    barcode: string;
    onSuccess: () => void;
}

export function CreateCrateDialog({
    isOpen,
    onClose,
    barcode,
    onSuccess,
}: CreateCrateDialogProps) {
    const [name, setName] = useState("");
    const [selectedDrinkId, setSelectedDrinkId] = useState<number | null>(null);
    const [defaultPfandType, setDefaultPfandType] = useState<"EINWEG" | "MEHRWEG" | "GLAS">("MEHRWEG");

    const {data: drinks} = api.drink.getAll.useQuery();
    const {data: crates} = api.drink.getAllCrates.useQuery();

    // Filter out drinks already assigned to a crate
    const availableDrinks = drinks?.filter(
        (drink) => !crates?.some((crate) => crate.drinkId === drink.id)
    ) ?? [];

    const createCrateMutation = api.drink.createCrate.useMutation({
        onSuccess: () => {
            setName("");
            setSelectedDrinkId(null);
            setDefaultPfandType("MEHRWEG");
            onSuccess();
        },
    });

    if (!isOpen) return null;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (name.trim() && selectedDrinkId !== null) {
            createCrateMutation.mutate({
                barcode,
                name: name.trim(),
                drinkId: selectedDrinkId,
                defaultPfandType,
            });
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
                <div className="p-6">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-2xl font-bold text-gray-800">
                            Neuen Kasten erstellen
                        </h2>
                        <button
                            onClick={onClose}
                            className="text-gray-500 hover:text-gray-700 text-2xl"
                        >
                            ×
                        </button>
                    </div>

                    <p className="text-sm text-gray-600 mb-4">
                        Barcode <span className="font-mono font-semibold">{barcode}</span>{" "}
                        wird als Kasten registriert.
                    </p>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        {/* Name Input */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Kastenname *
                            </label>
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="z.B. Cola-Kasten 20x0.5L"
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
                                    value={selectedDrinkId ?? ""}
                                    onChange={(e) =>
                                        setSelectedDrinkId(
                                            e.target.value ? parseInt(e.target.value, 10) : null
                                        )
                                    }
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    required
                                >
                                    <option value="">Getränk auswählen...</option>
                                    {availableDrinks.map((drink) => (
                                        <option key={drink.id} value={drink.id}>
                                            {drink.name} ({drink.quantity} verfügbar)
                                        </option>
                                    ))}
                                </select>
                            ) : (
                                <p className="text-sm text-gray-500">
                                    Keine Getränke vorhanden. Bitte zuerst ein Getränk erstellen.
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
                                    onClick={() => setDefaultPfandType("EINWEG")}
                                    className={`flex-1 py-2 px-3 rounded-lg font-medium text-sm transition-colors ${
                                        defaultPfandType === "EINWEG"
                                            ? "bg-blue-500 text-white"
                                            : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                                    }`}
                                >
                                    🥫 Einweg 25¢
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setDefaultPfandType("MEHRWEG")}
                                    className={`flex-1 py-2 px-3 rounded-lg font-medium text-sm transition-colors ${
                                        defaultPfandType === "MEHRWEG"
                                            ? "bg-blue-500 text-white"
                                            : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                                    }`}
                                >
                                    🍾 Mehrweg 15¢
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setDefaultPfandType("GLAS")}
                                    className={`flex-1 py-2 px-3 rounded-lg font-medium text-sm transition-colors ${
                                        defaultPfandType === "GLAS"
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
                                type="button"
                                onClick={onClose}
                                className="flex-1 bg-gray-200 text-gray-800 py-3 px-4 rounded-lg hover:bg-gray-300 transition-colors font-medium"
                            >
                                Abbrechen
                            </button>
                            <button
                                type="submit"
                                disabled={
                                    createCrateMutation.isPending ||
                                    !name.trim() ||
                                    selectedDrinkId === null
                                }
                                className="flex-1 bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors font-medium disabled:bg-gray-400 disabled:cursor-not-allowed"
                            >
                                {createCrateMutation.isPending
                                    ? "Erstelle..."
                                    : "Kasten erstellen"}
                            </button>
                        </div>
                    </form>

                    {createCrateMutation.isError && (
                        <p className="text-red-600 text-sm mt-3">
                            Fehler: {createCrateMutation.error.message}
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
}

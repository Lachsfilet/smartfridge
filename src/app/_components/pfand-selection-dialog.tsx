"use client";

import {api} from "@/trpc/react";
import {PfandType} from "@/models/enums/pfand-type.enum";

interface PfandSelectionDialogProps {
    isOpen: boolean;
    onClose: () => void;
    crateName: string;
    drinkName: string;
    defaultPfandType: string;
    pfandData: {
        pfand: {
            einweg: { id: number; quantity: number; pfandType: PfandType };
            mehrweg: { id: number; quantity: number; pfandType: PfandType };
            glas: { id: number; quantity: number; pfandType: PfandType };
        };
    } | undefined;
    onSuccess: () => void;
}

export function PfandSelectionDialog({
    isOpen,
    onClose,
    crateName,
    drinkName,
    defaultPfandType,
    pfandData,
    onSuccess,
}: PfandSelectionDialogProps) {
    const addPfandMutation = api.drink.addPfand.useMutation({
        onSuccess: () => {
            onSuccess();
            onClose();
        },
    });

    if (!isOpen || !pfandData) return null;

    const pfandOptions = [
        {
            type: "EINWEG",
            label: PfandType.EINWEG,
            id: pfandData.pfand.einweg.id,
            emoji: "🥫",
        },
        {
            type: "MEHRWEG",
            label: PfandType.MEHRWEG,
            id: pfandData.pfand.mehrweg.id,
            emoji: "🍾",
        },
        {
            type: "GLAS",
            label: PfandType.GLAS,
            id: pfandData.pfand.glas.id,
            emoji: "🫙",
        },
    ];

    const handleSelectPfand = (pfandId: number) => {
        addPfandMutation.mutate({id: pfandId});
    };

    const handleSkip = () => {
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
                <div className="p-6">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-2xl font-bold text-gray-800">
                            Pfand auswählen
                        </h2>
                        <button
                            onClick={handleSkip}
                            className="text-gray-500 hover:text-gray-700 text-2xl"
                        >
                            ×
                        </button>
                    </div>

                    <div className="bg-green-50 border border-green-200 rounded-lg p-3 mb-4">
                        <p className="text-green-800 text-sm">
                            ✅ Eine geschlossene Flasche von{" "}
                            <span className="font-semibold">{drinkName}</span> wurde aus
                            Kasten <span className="font-semibold">{crateName}</span>{" "}
                            entfernt.
                        </p>
                    </div>

                    <p className="text-gray-600 mb-4 text-sm">
                        Wählen Sie die Pfand-Kategorie für die Flasche:
                    </p>

                    <div className="space-y-3">
                        {pfandOptions.map((option) => (
                            <button
                                key={option.type}
                                onClick={() => handleSelectPfand(option.id)}
                                disabled={addPfandMutation.isPending || option.id === 0}
                                className={`w-full text-left p-4 rounded-lg border-2 transition-all font-medium flex items-center gap-3 ${
                                    option.type === defaultPfandType
                                        ? "border-blue-500 bg-blue-50 hover:bg-blue-100"
                                        : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
                                } disabled:opacity-50 disabled:cursor-not-allowed`}
                            >
                                <span className="text-2xl">{option.emoji}</span>
                                <div>
                                    <span className="text-gray-800">{option.label}</span>
                                    {option.type === defaultPfandType && (
                                        <span className="ml-2 text-xs bg-blue-500 text-white px-2 py-0.5 rounded-full">
                                            Empfohlen
                                        </span>
                                    )}
                                </div>
                            </button>
                        ))}
                    </div>

                    <button
                        onClick={handleSkip}
                        className="w-full mt-4 bg-gray-200 text-gray-800 py-2 px-4 rounded-lg hover:bg-gray-300 transition-colors font-medium text-sm"
                    >
                        Überspringen
                    </button>

                    {addPfandMutation.isError && (
                        <p className="text-red-600 text-sm mt-3">
                            Fehler: {addPfandMutation.error.message}
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
}

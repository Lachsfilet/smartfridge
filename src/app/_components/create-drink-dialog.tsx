"use client";

import { useState } from "react";
import { api } from "@/trpc/react";

interface CreateDrinkDialogProps {
  isOpen: boolean;
  onClose: () => void;
  barcode: string;
  onSuccess: () => void;
}

export function CreateDrinkDialog({
  isOpen,
  onClose,
  barcode,
  onSuccess,
}: CreateDrinkDialogProps) {
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [isOpened, setIsOpened] = useState(false);

  const createMutation = api.drink.create.useMutation({
    onSuccess: () => {
      setName("");
      setQuantity(1);
      setIsOpened(false);
      onSuccess();
    },
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      createMutation.mutate({
        barcode,
        name: name.trim(),
        quantity,
        isOpened,
      });
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold text-gray-800">
              Neues Getränk erstellen
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
            wurde nicht in der Datenbank gefunden.
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name Input */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Getränkename *
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="z.B. Coca-Cola 500ml"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>

            {/* Quantity Input */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Anfangsmenge
              </label>
              <div className="flex items-center gap-4">
                <button
                  type="button"
                  onClick={() => setQuantity(Math.max(0, quantity - 1))}
                  className="w-10 h-10 rounded-full bg-red-500 text-white font-bold text-xl hover:bg-red-600 active:scale-95 transition-all"
                >
                  −
                </button>
                <span className="text-3xl font-bold text-gray-800 w-16 text-center">
                  {quantity}
                </span>
                <button
                  type="button"
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-10 h-10 rounded-full bg-green-500 text-white font-bold text-xl hover:bg-green-600 active:scale-95 transition-all"
                >
                  +
                </button>
              </div>
            </div>

            {/* Status Toggle */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Status
              </label>
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setIsOpened(false)}
                  className={`flex-1 py-2 px-4 rounded-lg font-medium transition-colors ${
                    !isOpened
                      ? "bg-blue-500 text-white"
                      : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                  }`}
                >
                  🥤 Geschlossen
                </button>
                <button
                  type="button"
                  onClick={() => setIsOpened(true)}
                  className={`flex-1 py-2 px-4 rounded-lg font-medium transition-colors ${
                    isOpened
                      ? "bg-green-500 text-white"
                      : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                  }`}
                >
                  🍺 Geöffnet
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
                disabled={createMutation.isPending || !name.trim()}
                className="flex-1 bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors font-medium disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                {createMutation.isPending ? "Erstelle..." : "Getränk erstellen"}
              </button>
            </div>
          </form>

          {createMutation.isError && (
            <p className="text-red-600 text-sm mt-3">
              Fehler: {createMutation.error.message}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

"use client";

import { useState, useEffect } from "react";
import { api } from "@/trpc/react";

interface DrinkDialogProps {
  drink: {
    id: number;
    barcode: string;
    name: string;
    quantity: number;
    openedQuantity: number;
  };
  isOpen: boolean;
  onClose: () => void;
  onQuantityChange: (id: number, quantity: number) => void;
  onOpenedQuantityChange: (id: number, openedQuantity: number) => void;
}

export function DrinkDialog({
  drink,
  isOpen,
  onClose,
  onQuantityChange,
  onOpenedQuantityChange,
}: DrinkDialogProps) {
  const [localQuantity, setLocalQuantity] = useState(drink.quantity.toString());
  const [localOpenedQuantity, setLocalOpenedQuantity] = useState(drink.openedQuantity.toString());
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const utils = api.useUtils();
  const deleteMutation = api.drink.delete.useMutation({
    onSuccess: () => {
      void utils.drink.getAll.invalidate();
      onClose();
    },
    onError: (error) => {
      alert(`Fehler beim Löschen: ${error.message}`);
      setShowDeleteConfirm(false);
    },
  });

  // Update local quantities when drink quantities change (from external updates)
  useEffect(() => {
    setLocalQuantity(drink.quantity.toString());
    setLocalOpenedQuantity(drink.openedQuantity.toString());
  }, [drink.quantity, drink.openedQuantity]);

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

  const handleOpenedIncrement = () => {
    const currentOpened = parseInt(localOpenedQuantity, 10) || 0;
    const currentTotal = parseInt(localQuantity, 10) || 0;
    if (currentOpened < currentTotal) {
      setLocalOpenedQuantity((currentOpened + 1).toString());
    }
  };

  const handleOpenedDecrement = () => {
    const currentOpened = parseInt(localOpenedQuantity, 10) || 0;
    if (currentOpened > 0) {
      setLocalOpenedQuantity((currentOpened - 1).toString());
    }
  };;

  const handleDelete = () => {
    deleteMutation.mutate({ id: drink.id });
  };

  const handleClose = () => {
    // Submit both quantity and opened quantity changes
    const finalQuantity = parseInt(localQuantity, 10);
    const finalOpenedQuantity = parseInt(localOpenedQuantity, 10);
    
    // If empty or invalid, default to 0
    const validQuantity = !isNaN(finalQuantity) && finalQuantity >= 0 ? finalQuantity : 0;
    const validOpenedQuantity = !isNaN(finalOpenedQuantity) && finalOpenedQuantity >= 0 ? finalOpenedQuantity : 0;
    
    // Ensure opened quantity doesn't exceed total quantity
    const constrainedOpenedQuantity = Math.min(validOpenedQuantity, validQuantity);
    
    onQuantityChange(drink.id, validQuantity);
    if (constrainedOpenedQuantity !== drink.openedQuantity) {
      onOpenedQuantityChange(drink.id, constrainedOpenedQuantity);
    }
    
    setShowDeleteConfirm(false);
    onClose();
  };

  const handleCloseWithoutSave = () => {
    // Reset local state to original values
    setLocalQuantity(drink.quantity.toString());
    setLocalOpenedQuantity(drink.openedQuantity.toString());
    setShowDeleteConfirm(false);
    onClose();
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
        <div className="p-6">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h2 className="text-2xl font-bold text-gray-800">{drink.name}</h2>
              <p className="text-sm text-gray-500 mt-1">
                Barcode: {drink.barcode}
              </p>
            </div>
            <button
              onClick={() => {
                handleCloseWithoutSave();
              }}
              className="text-gray-500 hover:text-gray-700 text-2xl"
            >
              ×
            </button>
          </div>

          {/* Opened Quantity Controls */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Geöffnete Getränke:
            </label>
            <div className="flex items-center justify-center gap-4">
              <button
                onClick={handleOpenedDecrement}
                disabled={parseInt(localOpenedQuantity, 10) === 0}
                className="w-12 h-12 rounded-full bg-orange-500 text-white font-bold text-xl disabled:bg-gray-300 disabled:cursor-not-allowed hover:bg-orange-600 active:scale-95 transition-all shadow-md"
              >
                −
              </button>
              <input
                type="number"
                min="0"
                max={parseInt(localQuantity, 10) || 0}
                value={localOpenedQuantity}
                onChange={(e) => {
                  const val = e.target.value;
                  const maxAllowed = parseInt(localQuantity, 10) || 0;
                  // Allow empty string for editing
                  if (val === "") {
                    setLocalOpenedQuantity(val);
                  } else {
                    const numVal = parseInt(val, 10);
                    // Validate: must be non-negative and not exceed total quantity
                    if (!isNaN(numVal) && numVal >= 0 && numVal <= maxAllowed) {
                      setLocalOpenedQuantity(val);
                    }
                  }
                }}
                className="text-3xl font-bold text-green-800 bg-green-100 w-24 text-center border-2 border-green-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent py-2"
              />
              <button
                onClick={handleOpenedIncrement}
                disabled={parseInt(localOpenedQuantity, 10) >= parseInt(localQuantity, 10)}
                className="w-12 h-12 rounded-full bg-orange-500 text-white font-bold text-xl disabled:bg-gray-300 disabled:cursor-not-allowed hover:bg-orange-600 active:scale-95 transition-all shadow-md"
              >
                +
              </button>
            </div>
          </div>

          {/* Quantity Controls */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Gesamtmenge:
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
                  // Allow empty string for editing, otherwise validate
                  if (val === "" || (!isNaN(parseInt(val, 10)) && parseInt(val, 10) >= 0)) {
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

          {/* Action Buttons */}
          <div className="flex gap-3">
            <button
              onClick={handleClose}
              className="flex-1 bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              Speichern & Schließen
            </button>
            <button
              onClick={() => setShowDeleteConfirm(true)}
              disabled={deleteMutation.isPending}
              className="bg-red-600 text-white py-3 px-4 rounded-lg hover:bg-red-700 transition-colors font-medium disabled:bg-gray-400 disabled:cursor-not-allowed"
              title="Getränk löschen"
            >
              🗑️
            </button>
          </div>

          {/* Delete Confirmation Dialog */}
          {showDeleteConfirm && (
            <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4">
              <div className="bg-white rounded-lg shadow-xl max-w-sm w-full p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-3">
                  Getränk löschen?
                </h3>
                <p className="text-gray-600 mb-6">
                  Möchten Sie <span className="font-semibold">{drink.name}</span> wirklich aus der Datenbank löschen? Diese Aktion kann nicht rückgängig gemacht werden.
                </p>
                <div className="flex gap-3">
                  <button
                    onClick={() => setShowDeleteConfirm(false)}
                    disabled={deleteMutation.isPending}
                    className="flex-1 bg-gray-200 text-gray-800 py-2 px-4 rounded-lg hover:bg-gray-300 transition-colors font-medium disabled:opacity-50"
                  >
                    Abbrechen
                  </button>
                  <button
                    onClick={handleDelete}
                    disabled={deleteMutation.isPending}
                    className="flex-1 bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 transition-colors font-medium disabled:bg-gray-400 disabled:cursor-not-allowed"
                  >
                    {deleteMutation.isPending ? "Löschen..." : "Löschen"}
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

"use client";

import { useState, useEffect } from "react";

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
  onDelete: (id: number) => void;
}

export function DrinkDialog({
  drink,
  isOpen,
  onClose,
  onQuantityChange,
  onOpenedQuantityChange,
  onDelete,
}: DrinkDialogProps) {
  const [openCount, setOpenCount] = useState("1");
  const [localQuantity, setLocalQuantity] = useState(drink.quantity.toString());
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  // Update local quantity when drink quantity changes (from external updates)
  useEffect(() => {
    setLocalQuantity(drink.quantity.toString());
  }, [drink.quantity]);

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

  const handleOpenDrinks = () => {
    const count = parseInt(openCount, 10);
    if (isNaN(count) || count < 1) {
      alert("Bitte geben Sie eine gültige Anzahl an Getränken ein.");
      return;
    }
    
    const currentQty = parseInt(localQuantity, 10) || 0;
    const closedQuantity = currentQty - drink.openedQuantity;
    
    if (count > closedQuantity) {
      alert(`Sie haben nur ${closedQuantity} geschlossene Getränke verfügbar.`);
      return;
    }

    // Increase the opened quantity
    const newOpenedQuantity = drink.openedQuantity + count;
    onOpenedQuantityChange(drink.id, newOpenedQuantity);
    
    // Reset the input
    setOpenCount("1");
  };

  const handleOpenCountChange = (newCount: number) => {
    const currentQty = parseInt(localQuantity, 10) || 0;
    const closedQuantity = currentQty - drink.openedQuantity;
    if (newCount >= 1 && newCount <= closedQuantity) {
      setOpenCount(newCount.toString());
    }
  };

  const handleClose = () => {
    // Submit the quantity changes
    const finalQuantity = parseInt(localQuantity, 10);
    // If empty or invalid, default to 0
    const validQuantity = !isNaN(finalQuantity) && finalQuantity >= 0 ? finalQuantity : 0;
    onQuantityChange(drink.id, validQuantity);
    onClose();
  };

  const handleDelete = () => {
    onDelete(drink.id);
    onClose();
  };

  const closedQuantity = parseInt(localQuantity, 10) - drink.openedQuantity;

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
                handleClose();
                setOpenCount("1");
              }}
              className="text-gray-500 hover:text-gray-700 text-2xl"
            >
              ×
            </button>
          </div>

          {/* Opened Quantity Display and Controls */}
          {drink.openedQuantity > 0 && parseInt(localQuantity, 10) > 0 && (
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Geöffnete Getränke:
              </label>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => onOpenedQuantityChange(drink.id, Math.max(0, drink.openedQuantity - 1))}
                  disabled={drink.openedQuantity === 0}
                  className="w-10 h-10 rounded-full bg-orange-500 text-white font-bold text-lg disabled:bg-gray-300 disabled:cursor-not-allowed hover:bg-orange-600 active:scale-95 transition-all"
                >
                  −
                </button>
                <span className="text-2xl font-semibold text-green-800 bg-green-100 px-6 py-2 rounded-lg">
                  {drink.openedQuantity}
                </span>
                <button
                  onClick={() => onOpenedQuantityChange(drink.id, Math.min(parseInt(localQuantity, 10), drink.openedQuantity + 1))}
                  disabled={drink.openedQuantity >= parseInt(localQuantity, 10)}
                  className="w-10 h-10 rounded-full bg-orange-500 text-white font-bold text-lg disabled:bg-gray-300 disabled:cursor-not-allowed hover:bg-orange-600 active:scale-95 transition-all"
                >
                  +
                </button>
              </div>
            </div>
          )}

          {/* Open Drinks Section - Only show if there are closed drinks */}
          {closedQuantity > 0 && (
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Getränke öffnen:
              </label>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => handleOpenCountChange(parseInt(openCount, 10) - 1)}
                  disabled={parseInt(openCount, 10) <= 1}
                  className="w-12 h-12 rounded-full bg-orange-500 text-white font-bold text-xl disabled:bg-gray-300 disabled:cursor-not-allowed hover:bg-orange-600 active:scale-95 transition-all shadow-md"
                >
                  −
                </button>
                <input
                  type="number"
                  min="1"
                  max={closedQuantity}
                  value={openCount}
                  onChange={(e) => {
                    const val = e.target.value;
                    // Allow empty string for editing, otherwise validate within range
                    if (val === "" || (!isNaN(parseInt(val, 10)) && parseInt(val, 10) >= 1)) {
                      setOpenCount(val);
                    }
                  }}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg text-center"
                  placeholder="Anzahl"
                />
                <button
                  onClick={() => handleOpenCountChange(parseInt(openCount, 10) + 1)}
                  disabled={parseInt(openCount, 10) >= closedQuantity}
                  className="w-12 h-12 rounded-full bg-orange-500 text-white font-bold text-xl disabled:bg-gray-300 disabled:cursor-not-allowed hover:bg-orange-600 active:scale-95 transition-all shadow-md"
                >
                  +
                </button>
                <button
                  onClick={handleOpenDrinks}
                  className="px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors font-medium"
                >
                  Öffnen
                </button>
              </div>
              <p className="text-xs text-gray-500 mt-2">
                Geben Sie die Anzahl der zu öffnenden Getränke ein (1 - {closedQuantity})
              </p>
            </div>
          )}

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
          <div className="space-y-3">
            <button
              onClick={handleClose}
              className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              Speichern & Schließen
            </button>
            
            {/* Delete Button */}
            {!showDeleteConfirm ? (
              <button
                onClick={() => setShowDeleteConfirm(true)}
                className="w-full bg-red-100 text-red-700 py-3 px-4 rounded-lg hover:bg-red-200 transition-colors font-medium"
              >
                Getränk löschen
              </button>
            ) : (
              <div className="space-y-2">
                <p className="text-sm text-center text-gray-700">
                  Wirklich löschen?
                </p>
                <div className="flex gap-2">
                  <button
                    onClick={handleDelete}
                    className="flex-1 bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 transition-colors font-medium"
                  >
                    Ja, löschen
                  </button>
                  <button
                    onClick={() => setShowDeleteConfirm(false)}
                    className="flex-1 bg-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-400 transition-colors font-medium"
                  >
                    Abbrechen
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

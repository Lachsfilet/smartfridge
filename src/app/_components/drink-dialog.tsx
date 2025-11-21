"use client";

import { useState, useEffect } from "react";

interface DrinkDialogProps {
  drink: {
    id: number;
    barcode: string;
    name: string;
    quantity: number;
    isOpened: boolean;
  };
  isOpen: boolean;
  onClose: () => void;
  onQuantityChange: (id: number, quantity: number) => void;
  onStatusChange: (id: number, isOpened: boolean) => void;
}

export function DrinkDialog({
  drink,
  isOpen,
  onClose,
  onQuantityChange,
  onStatusChange,
}: DrinkDialogProps) {
  const [openCount, setOpenCount] = useState("1");
  const [localQuantity, setLocalQuantity] = useState(drink.quantity.toString());

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
      alert("Please enter a valid number of drinks to open.");
      return;
    }
    
    const currentQty = parseInt(localQuantity, 10) || 0;
    if (count > currentQty) {
      alert(`You only have ${currentQty} drinks available.`);
      return;
    }

    // Open the specified number of drinks
    if (!drink.isOpened) {
      onStatusChange(drink.id, true);
    }
    
    // Reset the input
    setOpenCount("1");
  };

  const handleOpenCountChange = (newCount: number) => {
    const currentQty = parseInt(localQuantity, 10) || 0;
    if (newCount >= 1 && newCount <= currentQty) {
      setOpenCount(newCount.toString());
    }
  };

  const handleClose = () => {
    // Submit the quantity changes
    const finalQuantity = parseInt(localQuantity, 10);
    if (!isNaN(finalQuantity) && finalQuantity >= 0) {
      onQuantityChange(drink.id, finalQuantity);
    }
    onClose();
  };

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

          {/* Opened/Closed Toggle - Only show if quantity > 0 */}
          {parseInt(localQuantity, 10) > 0 && (
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Status:
              </label>
              <button
                onClick={() => onStatusChange(drink.id, !drink.isOpened)}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  drink.isOpened
                    ? "bg-green-100 text-green-800 hover:bg-green-200"
                    : "bg-blue-100 text-blue-800 hover:bg-blue-200"
                }`}
              >
                {drink.isOpened ? "🍺 Opened" : "🥤 Closed"}
              </button>
            </div>
          )}

          {/* Open Drinks Section - Only show if closed and quantity > 0 */}
          {!drink.isOpened && parseInt(localQuantity, 10) > 0 && (
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Open Drinks:
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
                  max={parseInt(localQuantity, 10)}
                  value={openCount}
                  onChange={(e) => setOpenCount(e.target.value)}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg text-center"
                  placeholder="Number"
                />
                <button
                  onClick={() => handleOpenCountChange(parseInt(openCount, 10) + 1)}
                  disabled={parseInt(openCount, 10) >= parseInt(localQuantity, 10)}
                  className="w-12 h-12 rounded-full bg-orange-500 text-white font-bold text-xl disabled:bg-gray-300 disabled:cursor-not-allowed hover:bg-orange-600 active:scale-95 transition-all shadow-md"
                >
                  +
                </button>
                <button
                  onClick={handleOpenDrinks}
                  className="px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors font-medium"
                >
                  Open
                </button>
              </div>
              <p className="text-xs text-gray-500 mt-2">
                Enter the number of drinks to open (1 - {parseInt(localQuantity, 10)})
              </p>
            </div>
          )}

          {/* Quantity Controls */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Quantity:
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
                onChange={(e) => setLocalQuantity(e.target.value)}
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

          {/* Close/Submit Button */}
          <button
            onClick={handleClose}
            className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors font-medium"
          >
            Save & Close
          </button>
        </div>
      </div>
    </div>
  );
}

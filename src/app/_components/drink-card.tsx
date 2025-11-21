"use client";

import { useState } from "react";

interface DrinkCardProps {
  drink: {
    id: number;
    barcode: string;
    name: string;
    quantity: number;
    isOpened: boolean;
  };
  onQuantityChange: (id: number, quantity: number) => void;
  onStatusChange: (id: number, isOpened: boolean) => void;
}

export function DrinkCard({
  drink,
  onQuantityChange,
  onStatusChange,
}: DrinkCardProps) {
  const [openCount, setOpenCount] = useState("1");

  const handleOpenDrinks = () => {
    const count = parseInt(openCount, 10);
    if (isNaN(count) || count < 1) {
      alert("Please enter a valid number of drinks to open.");
      return;
    }
    
    if (count > drink.quantity) {
      alert(`You only have ${drink.quantity} drinks available.`);
      return;
    }

    // Open the drinks
    if (!drink.isOpened) {
      onStatusChange(drink.id, true);
    }
    
    // Reset the input
    setOpenCount("1");
  };

  const handleOpenCountChange = (newCount: number) => {
    if (newCount >= 1 && newCount <= drink.quantity) {
      setOpenCount(newCount.toString());
    }
  };

  return (
    <div className="bg-white border-2 border-gray-200 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between mb-3">
        <div className="flex-1">
          <h3 className="font-semibold text-lg text-gray-800">{drink.name}</h3>
          <p className="text-sm text-gray-500">Barcode: {drink.barcode}</p>
          {drink.quantity > 0 && (
            <div className="mt-2">
              <button
                onClick={() => onStatusChange(drink.id, !drink.isOpened)}
                className={`px-3 py-1 rounded-full text-xs font-medium ${
                  drink.isOpened
                    ? "bg-green-200 text-green-800"
                    : "bg-blue-200 text-blue-800"
                }`}
              >
                {drink.isOpened ? "Opened" : "Closed"}
              </button>
            </div>
          )}
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => onQuantityChange(drink.id, drink.quantity - 1)}
            disabled={drink.quantity === 0}
            className="w-10 h-10 rounded-full bg-red-500 text-white font-bold text-xl disabled:bg-gray-300 disabled:cursor-not-allowed hover:bg-red-600 active:scale-95 transition-all"
          >
            −
          </button>
          <span className="text-2xl font-bold text-gray-800 w-12 text-center">
            {drink.quantity}
          </span>
          <button
            onClick={() => onQuantityChange(drink.id, drink.quantity + 1)}
            className="w-10 h-10 rounded-full bg-green-500 text-white font-bold text-xl hover:bg-green-600 active:scale-95 transition-all"
          >
            +
          </button>
        </div>
      </div>

      {/* Open Drinks Section - Only show if closed and quantity > 0 */}
      {!drink.isOpened && drink.quantity > 0 && (
        <div className="border-t border-gray-200 pt-3">
          <div className="flex items-center gap-2">
            <button
              onClick={() => handleOpenCountChange(parseInt(openCount, 10) - 1)}
              disabled={parseInt(openCount, 10) <= 1}
              className="w-8 h-8 rounded-full bg-orange-500 text-white font-bold text-sm disabled:bg-gray-300 disabled:cursor-not-allowed hover:bg-orange-600 active:scale-95 transition-all"
            >
              −
            </button>
            <input
              type="number"
              min="1"
              max={drink.quantity}
              value={openCount}
              onChange={(e) => setOpenCount(e.target.value)}
              className="flex-1 px-3 py-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-center"
            />
            <button
              onClick={() => handleOpenCountChange(parseInt(openCount, 10) + 1)}
              disabled={parseInt(openCount, 10) >= drink.quantity}
              className="w-8 h-8 rounded-full bg-orange-500 text-white font-bold text-sm disabled:bg-gray-300 disabled:cursor-not-allowed hover:bg-orange-600 active:scale-95 transition-all"
            >
              +
            </button>
            <button
              onClick={handleOpenDrinks}
              className="px-4 py-1 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors font-medium text-sm"
            >
              Open
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

"use client";

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
  return (
    <div className="bg-white border-2 border-gray-200 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between">
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
    </div>
  );
}

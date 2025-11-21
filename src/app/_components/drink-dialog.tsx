"use client";

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
  if (!isOpen) return null;

  const handleIncrement = () => {
    onQuantityChange(drink.id, drink.quantity + 1);
  };

  const handleDecrement = () => {
    if (drink.quantity > 0) {
      onQuantityChange(drink.id, drink.quantity - 1);
    }
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
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 text-2xl"
            >
              ×
            </button>
          </div>

          {/* Opened/Closed Toggle - Only show if quantity > 0 */}
          {drink.quantity > 0 && (
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

          {/* Quantity Controls */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Quantity:
            </label>
            <div className="flex items-center justify-center gap-6">
              <button
                onClick={handleDecrement}
                disabled={drink.quantity === 0}
                className="w-16 h-16 rounded-full bg-red-500 text-white font-bold text-3xl disabled:bg-gray-300 disabled:cursor-not-allowed hover:bg-red-600 active:scale-95 transition-all shadow-md"
              >
                −
              </button>
              <span className="text-5xl font-bold text-gray-800 w-24 text-center">
                {drink.quantity}
              </span>
              <button
                onClick={handleIncrement}
                className="w-16 h-16 rounded-full bg-green-500 text-white font-bold text-3xl hover:bg-green-600 active:scale-95 transition-all shadow-md"
              >
                +
              </button>
            </div>
          </div>

          {/* Close Button */}
          <button
            onClick={onClose}
            className="w-full bg-gray-200 text-gray-800 py-3 px-4 rounded-lg hover:bg-gray-300 transition-colors font-medium"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

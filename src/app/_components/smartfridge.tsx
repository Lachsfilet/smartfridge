"use client";

import { useState, useEffect } from "react";
import { api } from "@/trpc/react";
import { BarcodeScannerModal } from "./barcode-scanner-modal";
import { DrinkCard } from "./drink-card";
import { DrinkDialog } from "./drink-dialog";
import { CreateDrinkDialog } from "./create-drink-dialog";

export function SmartFridge() {
  const [isScannerOpen, setIsScannerOpen] = useState(false);
  const [selectedDrink, setSelectedDrink] = useState<{
    id: number;
    barcode: string;
    name: string;
    quantity: number;
    openedQuantity: number;
  } | null>(null);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [scannedBarcode, setScannedBarcode] = useState<string>("");

  const { data: drinks, refetch } = api.drink.getAll.useQuery();
  const updateQuantityMutation = api.drink.updateQuantity.useMutation({
    onSuccess: () => {
      void refetch();
    },
  });
  const updateOpenedQuantityMutation = api.drink.updateOpenedQuantity.useMutation({
    onSuccess: () => {
      void refetch();
    },
  });
  const openDrinksMutation = api.drink.openDrinks.useMutation({
    onSuccess: () => {
      void refetch();
    },
  });

  // Auto-refresh drinks overview every minute
  useEffect(() => {
    const intervalId = setInterval(() => {
      void refetch();
    }, 60000); // 60000ms = 1 minute

    return () => clearInterval(intervalId);
  }, [refetch]);

  const openedDrinks = drinks?.filter((d) => d.openedQuantity > 0 && d.quantity > 0) ?? [];
  const closedDrinks = drinks?.filter((d) => d.openedQuantity === 0 && d.quantity > 0) ?? [];
  const emptyDrinks = drinks?.filter((d) => d.quantity === 0) ?? [];

  const handleScan = async (barcode: string) => {
    setIsScannerOpen(false);
    
    // Try to find the drink
    const drink = drinks?.find((d) => d.barcode === barcode);
    
    if (drink) {
      setSelectedDrink(drink);
    } else {
      // Drink doesn't exist, open create dialog
      setScannedBarcode(barcode);
      setIsCreateDialogOpen(true);
    }
  };

  const handleQuantityChange = (id: number, newQuantity: number) => {
    if (newQuantity < 0) return;
    
    updateQuantityMutation.mutate({
      id,
      quantity: newQuantity,
    });
  };

  const handleOpenedQuantityChange = (id: number, newOpenedQuantity: number) => {
    if (newOpenedQuantity < 0) return;
    
    updateOpenedQuantityMutation.mutate({
      id,
      openedQuantity: newOpenedQuantity,
    });
  };

  const handleOpenDrinks = (id: number, count: number) => {
    openDrinksMutation.mutate({
      id,
      count,
    });
  };

  const handleCreateSuccess = () => {
    setIsCreateDialogOpen(false);
    setScannedBarcode("");
    void refetch();
  };

  return (
    <div className="flex flex-col h-screen bg-gradient-to-b from-blue-50 to-blue-100">
      {/* Header */}
      <div className="bg-blue-600 text-white p-4 md:p-6 shadow-lg flex-shrink-0">
        <h1 className="text-2xl md:text-3xl font-bold">Smart Kühlschrank</h1>
        <p className="text-blue-100 mt-1 text-sm md:text-base">Verwalten Sie Ihr Getränkeinventar</p>
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto">
        <div className="container mx-auto p-3 md:p-4 max-w-4xl pb-24">
          {/* Opened Drinks Section */}
          {openedDrinks.length > 0 && (
            <section className="mb-6">
              <div className="bg-green-100 border-l-4 border-green-500 p-3 md:p-4 mb-3 rounded shadow-sm">
                <h2 className="text-lg md:text-xl font-semibold text-green-900 flex items-center">
                  <span className="mr-2">🍺</span>
                  Geöffnete Getränke
                </h2>
              </div>
              <div className="space-y-3">
                {openedDrinks.map((drink) => (
                  <div key={drink.id} onClick={() => setSelectedDrink(drink)} className="cursor-pointer">
                    <DrinkCard
                      drink={drink}
                      onQuantityChange={handleQuantityChange}
                    />
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Closed Drinks Section */}
          {closedDrinks.length > 0 && (
            <section className="mb-6">
              <div className="bg-blue-100 border-l-4 border-blue-500 p-3 md:p-4 mb-3 rounded shadow-sm">
                <h2 className="text-lg md:text-xl font-semibold text-blue-900 flex items-center">
                  <span className="mr-2">🥤</span>
                  Geschlossene Getränke
                </h2>
              </div>
              <div className="space-y-3">
                {closedDrinks.map((drink) => (
                  <div key={drink.id} onClick={() => setSelectedDrink(drink)} className="cursor-pointer">
                    <DrinkCard
                      drink={drink}
                      onQuantityChange={handleQuantityChange}
                    />
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Empty Drinks Section */}
          {emptyDrinks.length > 0 && (
            <section className="mb-6">
              <div className="bg-red-100 border-l-4 border-red-500 p-3 md:p-4 mb-3 rounded shadow-sm">
                <h2 className="text-lg md:text-xl font-semibold text-red-900 flex items-center">
                  <span className="mr-2">📭</span>
                  Nicht vorrätig
                </h2>
              </div>
              <div className="space-y-3">
                {emptyDrinks.map((drink) => (
                  <div key={drink.id} onClick={() => setSelectedDrink(drink)} className="cursor-pointer">
                    <DrinkCard
                      drink={drink}
                      onQuantityChange={handleQuantityChange}
                    />
                  </div>
                ))}
              </div>
            </section>
          )}

          {!drinks || drinks.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              <p className="text-lg">Noch keine Getränke im Kühlschrank.</p>
              <p className="text-sm mt-2">Scannen Sie einen Barcode, um Getränke hinzuzufügen!</p>
            </div>
          ) : null}
        </div>
      </div>

      {/* Floating Action Button */}
      <button
        onClick={() => setIsScannerOpen(true)}
        className="fixed bottom-6 right-6 w-14 h-14 md:w-16 md:h-16 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-lg flex items-center justify-center transition-all hover:scale-110 acti[...]"
        aria-label="Barcode scannen"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          className="w-7 h-7 md:w-8 md:h-8"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3.75 4.875c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5A1.125 1.125 0 013.75 9.375v-4.5zM3.75 14.625c0-.621.504-1.125 1.125-1.12[...]"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6.75 6.75h.75v.75h-.75v-.75zM6.75 16.5h.75v.75h-.75v-.75zM16.5 6.75h.75v.75h-.75v-.75zM13.5 13.5h.75v.75h-.75v-.75zM13.5 19.5h.75v.75h-.75v-.75zM19.5 13.5h.75v.75h-.75v-.75zM19.5 19.5h[...]"
          />
        </svg>
      </button>

      {/* Barcode Scanner Modal */}
      <BarcodeScannerModal
        isOpen={isScannerOpen}
        onClose={() => setIsScannerOpen(false)}
        onScan={handleScan}
      />

      {/* Drink Dialog */}
      {selectedDrink && (
        <DrinkDialog
          drink={selectedDrink}
          isOpen={!!selectedDrink}
          onClose={() => setSelectedDrink(null)}
          onQuantityChange={handleQuantityChange}
          onOpenedQuantityChange={handleOpenedQuantityChange}
        />
      )}

      {/* Create Drink Dialog */}
      <CreateDrinkDialog
        isOpen={isCreateDialogOpen}
        onClose={() => {
          setIsCreateDialogOpen(false);
          setScannedBarcode("");
        }}
        barcode={scannedBarcode}
        onSuccess={handleCreateSuccess}
      />
    </div>
  );
}

"use client";

import { useState } from "react";
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
    isOpened: boolean;
  } | null>(null);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [scannedBarcode, setScannedBarcode] = useState<string>("");

  const { data: drinks, refetch } = api.drink.getAll.useQuery();
  const updateQuantityMutation = api.drink.updateQuantity.useMutation({
    onSuccess: () => {
      void refetch();
    },
  });
  const updateStatusMutation = api.drink.updateStatus.useMutation({
    onSuccess: () => {
      void refetch();
    },
  });

  const openedDrinks = drinks?.filter((d) => d.isOpened && d.quantity > 0) ?? [];
  const closedDrinks = drinks?.filter((d) => !d.isOpened && d.quantity > 0) ?? [];
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

  const handleStatusChange = (id: number, isOpened: boolean) => {
    updateStatusMutation.mutate({
      id,
      isOpened,
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
        <h1 className="text-2xl md:text-3xl font-bold">Smart Fridge</h1>
        <p className="text-blue-100 mt-1 text-sm md:text-base">Manage your drinks inventory</p>
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
                  Opened Drinks
                </h2>
              </div>
              <div className="space-y-3">
                {openedDrinks.map((drink) => (
                  <DrinkCard
                    key={drink.id}
                    drink={drink}
                    onQuantityChange={handleQuantityChange}
                    onStatusChange={handleStatusChange}
                  />
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
                  Closed Drinks
                </h2>
              </div>
              <div className="space-y-3">
                {closedDrinks.map((drink) => (
                  <DrinkCard
                    key={drink.id}
                    drink={drink}
                    onQuantityChange={handleQuantityChange}
                    onStatusChange={handleStatusChange}
                  />
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
                  Out of Stock
                </h2>
              </div>
              <div className="space-y-3">
                {emptyDrinks.map((drink) => (
                  <DrinkCard
                    key={drink.id}
                    drink={drink}
                    onQuantityChange={handleQuantityChange}
                    onStatusChange={handleStatusChange}
                  />
                ))}
              </div>
            </section>
          )}

          {!drinks || drinks.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              <p className="text-lg">No drinks in the fridge yet.</p>
              <p className="text-sm mt-2">Scan a barcode to add drinks!</p>
            </div>
          ) : null}
        </div>
      </div>

      {/* Floating Action Button */}
      <button
        onClick={() => setIsScannerOpen(true)}
        className="fixed bottom-6 right-6 w-14 h-14 md:w-16 md:h-16 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-lg flex items-center justify-center transition-all hover:scale-110 active:scale-95 z-50"
        aria-label="Scan barcode"
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
            d="M3.75 4.875c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5A1.125 1.125 0 013.75 9.375v-4.5zM3.75 14.625c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5a1.125 1.125 0 01-1.125-1.125v-4.5zM13.5 4.875c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5A1.125 1.125 0 0113.5 9.375v-4.5z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6.75 6.75h.75v.75h-.75v-.75zM6.75 16.5h.75v.75h-.75v-.75zM16.5 6.75h.75v.75h-.75v-.75zM13.5 13.5h.75v.75h-.75v-.75zM13.5 19.5h.75v.75h-.75v-.75zM19.5 13.5h.75v.75h-.75v-.75zM19.5 19.5h.75v.75h-.75v-.75zM16.5 16.5h.75v.75h-.75v-.75z"
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
          onStatusChange={handleStatusChange}
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

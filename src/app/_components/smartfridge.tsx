"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { api } from "@/trpc/react";
import { BarcodeScannerModal } from "./barcode-scanner-modal";
import { DrinkCard } from "./drink-card";
import { PfandCard } from "./pfand-card";
import { DrinkDialog } from "./drink-dialog";
import { CreateDrinkDialog } from "./create-drink-dialog";
import { CreateCrateDialog } from "./create-crate-dialog";
import { CrateCard } from "./crate-card";
import { CrateDialog } from "./crate-dialog";
import { PfandDialog } from "./pfand-dialog";
import type { Pfand } from "@/models/pfand.model";

type TabType = "drinks" | "crates";

export function SmartFridge() {
    const [activeTab, setActiveTab] = useState<TabType>("drinks");
    const [isScannerOpen, setIsScannerOpen] = useState(false);
    const [selectedDrink, setSelectedDrink] = useState<{
        id: number;
        barcode: string;
        name: string;
        quantity: number;
        openedQuantity: number;
    } | null>(null);
    const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
    const [isCreateCrateDialogOpen, setIsCreateCrateDialogOpen] =
        useState(false);
    const [selectedPfand, setSelectedPfand] = useState<Pfand | null>(null);
    const [selectedCrate, setSelectedCrate] = useState<{
        id: number;
        barcode: string;
        name: string;
        drinkId: number;
        defaultPfandType: string;
        drink: { id: number; name: string; quantity: number; openedQuantity: number };
    } | null>(null);
    const [scannedBarcode, setScannedBarcode] = useState<string>("");

    const { data: drinks, refetch } = api.drink.getAll.useQuery();
    const updateQuantityMutation = api.drink.updateQuantity.useMutation({
        onSuccess: () => {
            void refetch();
        },
    });

    const updateBaseDataMutation = api.drink.updateBaseData.useMutation({
        onSuccess: () => {
            void refetch();
        },
    });

    const updatePfandQuantityMutation = api.drink.updatePfand.useMutation({
        onSuccess: () => {
            void refetchPfand();
        },
    });

    const updateOpenedQuantityMutation =
        api.drink.updateOpenedQuantity.useMutation({
            onSuccess: () => {
                void refetch();
            },
        });
    const { data: pfandData, refetch: refetchPfand } =
        api.drink.getPfand.useQuery();
    const { data: crates, refetch: refetchCrates } =
        api.drink.getAllCrates.useQuery();

    const addPfandMutation = api.drink.addPfand.useMutation({
        onSuccess: () => {
            void refetchPfand();
        },
    });

    const scanCrateMutation = api.drink.scanCrate.useMutation({
        onSuccess: (crate) => {
            void refetch();
            void refetchCrates();
            // Auto-add pfand based on the crate's default pfand type (no dialog)
            if (pfandData) {
                let pfandId: number | null = null;
                switch (crate.defaultPfandType) {
                    case "EINWEG":
                        pfandId = pfandData.pfand.einweg.id;
                        break;
                    case "MEHRWEG":
                        pfandId = pfandData.pfand.mehrweg.id;
                        break;
                    case "GLAS":
                        pfandId = pfandData.pfand.glas.id;
                        break;
                }
                if (pfandId && pfandId !== 0) {
                    addPfandMutation.mutate({ id: pfandId });
                }
            }
        },
    });

    const einweg: Pfand[] =
        pfandData?.pfand.einweg !== undefined
            ? [pfandData?.pfand.einweg]
            : ([] as Pfand[]);
    const mehrweg: Pfand[] =
        pfandData?.pfand.mehrweg !== undefined
            ? [pfandData?.pfand.mehrweg]
            : ([] as Pfand[]);
    const glas: Pfand[] =
        pfandData?.pfand.glas !== undefined
            ? [pfandData?.pfand.glas]
            : ([] as Pfand[]);

    // Auto-refresh drinks overview every minute
    const refreshDrinks = useCallback(() => {
        void refetch();
        void refetchPfand();
        void refetchCrates();
    }, [refetch, refetchPfand, refetchCrates]);

    useEffect(() => {
        const intervalId = setInterval(refreshDrinks, 60000); // 60000ms = 1 minute
        return () => clearInterval(intervalId);
    }, [refreshDrinks]);

    // Invisible barcode scanner keyboard input handler
    // Real barcode scanners type characters rapidly and press Enter
    const barcodeBufferRef = useRef<string>("");
    const barcodeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(
        null,
    );

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            const target = e.target as HTMLElement;
            if (
                target.tagName === "INPUT" ||
                target.tagName === "TEXTAREA" ||
                target.isContentEditable
            ) {
                return;
            }

            if (e.key === "Enter") {
                const barcode = barcodeBufferRef.current.trim();
                if (barcode.length > 0) {
                    e.preventDefault();
                    barcodeBufferRef.current = "";
                    if (barcodeTimeoutRef.current) {
                        clearTimeout(barcodeTimeoutRef.current);
                        barcodeTimeoutRef.current = null;
                    }
                    void handleScan(barcode);
                }
            } else if (e.key.length === 1) {
                barcodeBufferRef.current += e.key;
                if (barcodeTimeoutRef.current) {
                    clearTimeout(barcodeTimeoutRef.current);
                }
                barcodeTimeoutRef.current = setTimeout(() => {
                    barcodeBufferRef.current = "";
                    barcodeTimeoutRef.current = null;
                }, 500);
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => {
            window.removeEventListener("keydown", handleKeyDown);
            if (barcodeTimeoutRef.current) {
                clearTimeout(barcodeTimeoutRef.current);
            }
        };
    }, [drinks, crates, pfandData]);

    const openedDrinks =
        drinks?.filter((d) => d.openedQuantity > 0 && d.quantity > 0) ?? [];
    const closedDrinks =
        drinks?.filter((d) => d.openedQuantity === 0 && d.quantity > 0) ?? [];
    const emptyDrinks = drinks?.filter((d) => d.quantity === 0) ?? [];

    const handleScan = async (barcode: string) => {
        setIsScannerOpen(false);

        // First, check if it's a crate barcode
        const crate = crates?.find((c) => c.barcode === barcode);
        if (crate) {
            const closedQuantity =
                crate.drink.quantity - crate.drink.openedQuantity;
            if (closedQuantity <= 0) {
                alert(
                    "Keine geschlossenen Flaschen mehr in diesem Kasten verfügbar.",
                );
                return;
            }
            scanCrateMutation.mutate({ crateId: crate.id });
            return;
        }

        // Try to find the drink
        const drink = drinks?.find((d) => d.barcode === barcode);

        if (drink) {
            setSelectedDrink(drink);
        } else {
            // Barcode doesn't exist, open create dialog
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

    const handlePfandQuantityChange = (id: number, newQuantity: number) => {
        if (newQuantity < 0) return;

        updatePfandQuantityMutation.mutate({
            id,
            quantity: newQuantity,
        });
    };

    const handleOpenedQuantityChange = (
        id: number,
        newOpenedQuantity: number,
    ) => {
        if (newOpenedQuantity < 0) return;

        updateOpenedQuantityMutation.mutate({
            id,
            openedQuantity: newOpenedQuantity,
        });
    };

    const handleBaseDataChange = (
        id: number,
        name: string,
        barcode: string,
    ) => {
        if (barcode === "" || name === "") return;

        updateBaseDataMutation.mutate({
            id,
            name: name,
            barcode: barcode,
        });
    };

    const handleCreateSuccess = () => {
        setIsCreateDialogOpen(false);
        setScannedBarcode("");
        void refetch();
    };

    const handleCreateCrateSuccess = () => {
        setIsCreateCrateDialogOpen(false);
        setScannedBarcode("");
        void refetchCrates();
    };

    return (
        <div className="flex flex-col h-screen bg-gradient-to-b from-blue-50 to-blue-100">
            {/* Header */}
            <div className="bg-blue-600 text-white p-4 md:p-6 shadow-lg flex-shrink-0">
                <h1 className="text-2xl md:text-3xl font-bold">
                    Smart Kühlschrank
                </h1>
                <p className="text-blue-100 mt-1 text-sm md:text-base">
                    Verwalten Sie Ihr Getränkeinventar
                </p>
            </div>

            {/* Scrollable Content */}
            <div className="flex-1 overflow-y-auto">
                <div className="container mx-auto p-3 md:p-4 max-w-4xl pb-24">
                    {activeTab === "drinks" && (
                        <>
                            {/* Pfand Section */}
                            {pfandData !== undefined && (
                                <section className="mb-6">
                                    <div className="bg-slate-100 border-l-4 border-green-500 p-3 md:p-4 mb-3 rounded shadow-sm">
                                        <h2 className="text-lg md:text-xl font-semibold text-green-900 flex items-center">
                                            <span className="mr-2">♻</span>
                                            Leergut
                                        </h2>
                                        <p>
                                            Gesamtwert:{" "}
                                            {pfandData.pfandValue.total.toFixed(
                                                2,
                                            )}
                                            €
                                        </p>
                                    </div>
                                    <div className="space-y-3">
                                        {einweg.map((pfand) => (
                                            <div
                                                key={pfand.id}
                                                className="cursor-pointer"
                                                onClick={() =>
                                                    setSelectedPfand(pfand)
                                                }
                                            >
                                                <PfandCard
                                                    pfand={pfand}
                                                    onQuantityChange={
                                                        handlePfandQuantityChange
                                                    }
                                                />
                                            </div>
                                        ))}
                                        {mehrweg.map((pfand) => (
                                            <div
                                                key={pfand.id}
                                                className="cursor-pointer"
                                                onClick={() =>
                                                    setSelectedPfand(pfand)
                                                }
                                            >
                                                <PfandCard
                                                    pfand={pfand}
                                                    onQuantityChange={
                                                        handlePfandQuantityChange
                                                    }
                                                />
                                            </div>
                                        ))}
                                        {glas.map((pfand) => (
                                            <div
                                                key={pfand.id}
                                                className="cursor-pointer"
                                                onClick={() =>
                                                    setSelectedPfand(pfand)
                                                }
                                            >
                                                <PfandCard
                                                    pfand={pfand}
                                                    onQuantityChange={
                                                        handlePfandQuantityChange
                                                    }
                                                />
                                            </div>
                                        ))}
                                    </div>
                                </section>
                            )}

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
                                            <div
                                                key={drink.id}
                                                onClick={() =>
                                                    setSelectedDrink(drink)
                                                }
                                                className="cursor-pointer"
                                            >
                                                <DrinkCard
                                                    drink={drink}
                                                    onQuantityChange={
                                                        handleQuantityChange
                                                    }
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
                                            <div
                                                key={drink.id}
                                                onClick={() =>
                                                    setSelectedDrink(drink)
                                                }
                                                className="cursor-pointer"
                                            >
                                                <DrinkCard
                                                    drink={drink}
                                                    onQuantityChange={
                                                        handleQuantityChange
                                                    }
                                                />
                                            </div>
                                        ))}
                                    </div>
                                </section>
                            )}

                            {!drinks || drinks.length === 0 ? (
                                <div className="text-center py-12 text-gray-500">
                                    <p className="text-lg">
                                        Noch keine Getränke im Kühlschrank.
                                    </p>
                                    <p className="text-sm mt-2">
                                        Scannen Sie einen Barcode, um Getränke
                                        hinzuzufügen!
                                    </p>
                                </div>
                            ) : null}
                        </>
                    )}

                    {activeTab === "crates" && (
                        <>
                            {/* Crates Section */}
                            <section className="mb-6">
                                <div className="bg-amber-100 border-l-4 border-amber-500 p-3 md:p-4 mb-3 rounded shadow-sm">
                                    <h2 className="text-lg md:text-xl font-semibold text-amber-900 flex items-center">
                                        <span className="mr-2">📦</span>
                                        Kästen
                                    </h2>
                                </div>
                                {crates && crates.length > 0 ? (
                                    <div className="space-y-3">
                                        {crates.map((crate) => (
                                            <CrateCard
                                                key={crate.id}
                                                crate={crate}
                                                onClick={() =>
                                                    setSelectedCrate(crate)
                                                }
                                            />
                                        ))}
                                    </div>
                                ) : (
                                    <div className="text-center py-6 text-gray-500">
                                        <p className="text-lg">
                                            Noch keine Kästen registriert.
                                        </p>
                                        <p className="text-sm mt-2">
                                            Scannen Sie einen
                                            Kasten-Barcode, um einen zu
                                            erstellen!
                                        </p>
                                    </div>
                                )}
                            </section>

                            {/* Empty/Unavailable Drinks Section */}
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
                                            <div
                                                key={drink.id}
                                                onClick={() =>
                                                    setSelectedDrink(drink)
                                                }
                                                className="cursor-pointer"
                                            >
                                                <DrinkCard
                                                    drink={drink}
                                                    onQuantityChange={
                                                        handleQuantityChange
                                                    }
                                                />
                                            </div>
                                        ))}
                                    </div>
                                </section>
                            )}
                        </>
                    )}
                </div>
            </div>

            {/* Bottom Tab Bar */}
            <div className="fixed bottom-0 left-0 right-0 bg-white border-t-2 border-gray-200 shadow-lg z-40">
                <div className="flex">
                    <button
                        onClick={() => setActiveTab("drinks")}
                        className={`flex-1 py-3 flex flex-col items-center gap-1 transition-colors ${
                            activeTab === "drinks"
                                ? "text-blue-600 bg-blue-50"
                                : "text-gray-500 hover:text-gray-700 hover:bg-gray-50"
                        }`}
                    >
                        <span className="text-xl">🥤</span>
                        <span className="text-xs font-medium">Getränke</span>
                    </button>
                    <button
                        onClick={() => setActiveTab("crates")}
                        className={`flex-1 py-3 flex flex-col items-center gap-1 transition-colors ${
                            activeTab === "crates"
                                ? "text-blue-600 bg-blue-50"
                                : "text-gray-500 hover:text-gray-700 hover:bg-gray-50"
                        }`}
                    >
                        <span className="text-xl">📦</span>
                        <span className="text-xs font-medium">Kästen</span>
                    </button>
                </div>
            </div>

            {/* Floating Action Button */}
            <button
                onClick={() => setIsScannerOpen(true)}
                className="fixed bottom-16 right-6 w-14 h-14 md:w-16 md:h-16 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-lg flex items-center justify-center transition-all hover:scale-110 active:scale-95 z-50"
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
                        d="M3.75 4.875c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5A1.125 1.125 0 013.75 9.375v-4.5zM3.75 14.625c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5a1.125 1.125 0 01-1.125-1.125v-4.5zM13.5 4.875c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5a1.125 1.125 0 01-1.125-1.125v-4.5z"
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
                    onOpenedQuantityChange={handleOpenedQuantityChange}
                    onBaseDataChange={handleBaseDataChange}
                />
            )}

            {/* Pfand Dialog */}
            {selectedPfand && (
                <PfandDialog
                    pfand={selectedPfand}
                    isOpen={!!selectedPfand}
                    onClose={() => setSelectedPfand(null)}
                    onQuantityChange={handlePfandQuantityChange}
                />
            )}

            {/* Crate Dialog */}
            {selectedCrate && (
                <CrateDialog
                    crate={selectedCrate}
                    isOpen={!!selectedCrate}
                    onClose={() => setSelectedCrate(null)}
                    onSuccess={() => {
                        void refetchCrates();
                        void refetch();
                    }}
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
                onCreateCrate={() => {
                    setIsCreateDialogOpen(false);
                    setIsCreateCrateDialogOpen(true);
                }}
            />

            {/* Create Crate Dialog */}
            <CreateCrateDialog
                isOpen={isCreateCrateDialogOpen}
                onClose={() => {
                    setIsCreateCrateDialogOpen(false);
                    setScannedBarcode("");
                }}
                barcode={scannedBarcode}
                onSuccess={handleCreateCrateSuccess}
            />
        </div>
    );
}

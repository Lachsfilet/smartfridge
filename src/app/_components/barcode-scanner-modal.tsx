"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import type { BarcodeStringFormat } from "react-qr-barcode-scanner/dist/BarcodeStringFormat";

// Dynamically import the scanner to avoid SSR issues
const BarcodeScannerComponent = dynamic(
  () => import("react-qr-barcode-scanner").then((mod) => mod.default),
  { ssr: false }
);

interface BarcodeScannerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onScan: (barcode: string) => void;
}

// Barcode formats to scan (excluding QR codes)
const BARCODE_FORMATS: BarcodeStringFormat[] = [
  "UPC_A",
  "UPC_E",
  "EAN_8",
  "EAN_13",
  "CODE_39",
  "CODE_93",
  "CODE_128",
  "ITF",
  "CODABAR",
  "RSS_14",
  "RSS_EXPANDED",
] as BarcodeStringFormat[];

export function BarcodeScannerModal({
  isOpen,
  onClose,
  onScan,
}: BarcodeScannerModalProps) {
  const [manualBarcode, setManualBarcode] = useState("");
  const [useCameraScanner, setUseCameraScanner] = useState(false);

  // Check camera permission and auto-enable scanner if granted
  useEffect(() => {
    if (!isOpen) return;

    let permissionStatus: PermissionStatus | null = null;

    const checkCameraPermission = async () => {
      try {
        // Check if Permissions API is available
        if (navigator.permissions?.query) {
          permissionStatus = await navigator.permissions.query({
            name: "camera" as PermissionName,
          });
          
          if (permissionStatus.state === "granted") {
            setUseCameraScanner(true);
          }

          // Listen for permission changes
          const handlePermissionChange = () => {
            if (permissionStatus?.state === "granted") {
              setUseCameraScanner(true);
            } else if (permissionStatus?.state === "denied") {
              setUseCameraScanner(false);
            }
          };

          permissionStatus.onchange = handlePermissionChange;
        }
      } catch (error) {
        // Permissions API not supported or error occurred
        // User will need to manually enable camera
        console.log("Camera permission check not available:", error);
      }
    };

    void checkCameraPermission();

    // Cleanup permission listener on unmount
    return () => {
      if (permissionStatus) {
        permissionStatus.onchange = null;
      }
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleScan = (err: unknown, result?: { getText?: () => string }) => {
    if (result?.getText) {
      const text = result.getText();
      if (text) {
        onScan(text);
        setUseCameraScanner(false);
      }
    }
  };

  const handleManualSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (manualBarcode.trim()) {
      onScan(manualBarcode.trim());
      setManualBarcode("");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold text-gray-800">Scan Barcode</h2>
            <button
              onClick={() => {
                onClose();
                setUseCameraScanner(false);
                setManualBarcode("");
              }}
              className="text-gray-500 hover:text-gray-700 text-2xl"
            >
              ×
            </button>
          </div>

          {/* Manual Input */}
          <div className="mb-6">
            <form onSubmit={handleManualSubmit} className="space-y-3">
              <label className="block text-sm font-medium text-gray-700">
                Enter Barcode Manually:
              </label>
              <input
                type="text"
                value={manualBarcode}
                onChange={(e) => setManualBarcode(e.target.value)}
                placeholder="Enter barcode number..."
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors font-medium"
              >
                Submit Barcode
              </button>
            </form>
          </div>

          <div className="flex items-center gap-3 my-6">
            <div className="flex-1 h-px bg-gray-300"></div>
            <span className="text-gray-500 text-sm">OR</span>
            <div className="flex-1 h-px bg-gray-300"></div>
          </div>

          {/* Camera Scanner Toggle */}
          {!useCameraScanner ? (
            <button
              onClick={() => setUseCameraScanner(true)}
              className="w-full bg-green-600 text-white py-3 px-4 rounded-lg hover:bg-green-700 transition-colors font-medium flex items-center justify-center gap-2"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zM18.75 10.5h.008v.008h-.008V10.5z"
                />
              </svg>
              Use Camera Scanner
            </button>
          ) : (
            <div>
              <div className="mb-3">
                <button
                  onClick={() => setUseCameraScanner(false)}
                  className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                >
                  ← Back to manual input
                </button>
              </div>
              <div className="bg-gray-900 rounded-lg overflow-hidden">
                <BarcodeScannerComponent
                  onUpdate={handleScan}
                  width="100%"
                  height={300}
                  formats={BARCODE_FORMATS}
                />
              </div>
              <div className="mt-3 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                <p className="text-sm text-blue-800 text-center">
                  📸 Point your camera at a barcode
                </p>
                <p className="text-xs text-blue-600 text-center mt-1">
                  Allow camera access when prompted by your browser
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

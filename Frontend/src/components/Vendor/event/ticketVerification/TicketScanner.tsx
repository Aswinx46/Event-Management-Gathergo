
// /* eslint-disable @typescript-eslint/no-explicit-any */
// import React, { useEffect, useRef, useState } from "react";
// import { Html5Qrcode, Html5QrcodeScannerState } from "html5-qrcode";
// import { toast } from "sonner";
// import { UseMutationResult } from "@tanstack/react-query";

// interface TicketScannerProps {
//   scanQr: UseMutationResult<
//     any,
//     Error,
//     {
//       ticketId: string;
//       eventId: string;
//     },
//     unknown
//   >;
// }

// interface QrCameraDevice {
//   id: string;
//   label: string;
// }

// const TicketScanner: React.FC<TicketScannerProps> = ({ scanQr }) => {
//   const scannerRef = useRef<Html5Qrcode | null>(null);
//   const [scannedOnce, setScannedOnce] = useState(false);
//   const [showSuccessAnim, setShowSuccessAnim] = useState(false);
//   const successAudio = useRef<HTMLAudioElement | null>(null);
//   const containerRef = useRef<HTMLDivElement | null>(null);

//   useEffect(() => {
//     if (!containerRef.current) return;

//     successAudio.current = new Audio("/success.mp3");

//     const scanner = new Html5Qrcode("qr-reader");
//     scannerRef.current = scanner;

//     Html5Qrcode.getCameras().then((devices: QrCameraDevice[]) => {
//       if (devices && devices.length) {
//         const cameraId = devices[0].id;

//         scanner
//           .start(
//             cameraId,
//             {
//               fps: 10,
//               qrbox: { width: 250, height: 250 },
//             },
//             async (decodedText) => {
//               if (scannedOnce) return;
//               setScannedOnce(true);

//               try {
//                 const url = new URL(decodedText);
//                 const pathParts = url.pathname.split("/"); // ['', 'verifyTicket', 'ticketId', 'eventId']
//                 const ticketId = pathParts[2];
//                 const eventId = pathParts[3];

//                 scanQr.mutate(
//                   { ticketId, eventId },
//                   {
//                     onSuccess: (data) => {
//                       successAudio.current?.play().catch(() => {});
//                       setShowSuccessAnim(true);
//                       setTimeout(() => setShowSuccessAnim(false), 2000);
//                       toast.success(data.message || "Ticket verified!");
//                     },
//                     onError: (err) => {
//                       toast.error(err.message || "Ticket verification failed.");
//                     },
//                   }
//                 );
//               } catch (err: any) {
//                 console.log(err);
//                 toast.error("Invalid QR code format.");
//               }

//               setTimeout(() => setScannedOnce(false), 2500);
//             },
//             (() => {
//               let lastErrorTime = 0;
//               return (errorMessage: string) => {
//                 const now = Date.now();
//                 if (now - lastErrorTime > 3000) {
//                   console.warn("QR Scan error:", errorMessage);
//                   lastErrorTime = now;
//                 }
//               };
//             })()
//           )
//           .catch((err) => {
//             console.error("Failed to start scanner:", err);
//             toast.error("Camera access failed. Please try again.");
//           });
//       } else {
//         toast.error("No camera device found.");
//       }
//     });

//     return () => {
//       const stopScanner = async () => {
//         try {
//           if (
//             scannerRef.current &&
//             scannerRef.current.getState() === Html5QrcodeScannerState.SCANNING
//           ) {
//             await scannerRef.current.stop();
//           }
//           await scannerRef.current?.clear();
//         } catch (error) {
//           console.error("Failed to stop scanner:", error);
//         }
//       };
//       stopScanner();
//     };
//   }, [scannedOnce, scanQr]);

//   return (
//     <div ref={containerRef} className="w-full max-w-md mx-auto mt-6">
//       <h2 className="text-xl font-semibold text-center mb-4">Scan Ticket QR</h2>
//       <div id="qr-reader" className="rounded-md overflow-hidden" />
//       {showSuccessAnim && (
//         <div className="text-green-600 text-2xl font-bold text-center animate-bounce mt-4">
//           ✅ Ticket Verified!
//         </div>
//       )}
//     </div>
//   );
// };

// export default TicketScanner;


/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useRef, useState } from "react";
import { Html5Qrcode, Html5QrcodeScannerState } from "html5-qrcode";
import { toast } from "sonner";
import { UseMutationResult } from "@tanstack/react-query";

interface TicketScannerProps {
  scanQr: UseMutationResult<
    any,
    Error,
    {
      ticketId: string;
      eventId: string;
    },
    unknown
  >;
}

interface QrCameraDevice {
  id: string;
  label: string;
}

const TicketScanner: React.FC<TicketScannerProps> = ({ scanQr }) => {
  const scannerRef = useRef<Html5Qrcode | null>(null);
  const [scannedOnce, setScannedOnce] = useState(false);
  const [showSuccessAnim, setShowSuccessAnim] = useState(false);
  const successAudio = useRef<HTMLAudioElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [isCameraActive, setIsCameraActive] = useState(false); // New state for managing camera

  useEffect(() => {
    if (!containerRef.current) return;

    successAudio.current = new Audio("/success.mp3");

    const scanner = new Html5Qrcode("qr-reader");
    scannerRef.current = scanner;

    Html5Qrcode.getCameras().then((devices: QrCameraDevice[]) => {
      if (devices && devices.length) {
        const cameraId = devices[0].id;

        if (isCameraActive) {
          scanner
            .start(
              cameraId,
              {
                fps: 10,
                qrbox: { width: 250, height: 250 },
              },
              async (decodedText) => {
                if (scannedOnce) return;
                setScannedOnce(true);

                try {
                  const url = new URL(decodedText);
                  const pathParts = url.pathname.split("/"); // ['', 'verifyTicket', 'ticketId', 'eventId']
                  const ticketId = pathParts[2];
                  const eventId = pathParts[3];

                  scanQr.mutate(
                    { ticketId, eventId },
                    {
                      onSuccess: (data) => {
                        successAudio.current?.play().catch(() => {});
                        setShowSuccessAnim(true);
                        setTimeout(() => setShowSuccessAnim(false), 2000);
                        toast.success(data.message || "Ticket verified!");
                      },
                      onError: (err) => {
                        toast.error(err.message || "Ticket verification failed.");
                      },
                    }
                  );
                } catch (err: any) {
                  console.log(err);
                  toast.error("Invalid QR code format.");
                }

                setTimeout(() => setScannedOnce(false), 2500);
              },
              (() => {
                let lastErrorTime = 0;
                return (errorMessage: string) => {
                  const now = Date.now();
                  if (now - lastErrorTime > 3000) {
                    console.warn("QR Scan error:", errorMessage);
                    lastErrorTime = now;
                  }
                };
              })()
            )
            .catch((err) => {
              console.error("Failed to start scanner:", err);
              toast.error("Camera access failed. Please try again.");
            });
        } else {
          stopScanner();
        }
      } else {
        toast.error("No camera device found.");
      }
    });

    return () => {
      stopScanner();
    };
  }, [scannedOnce, scanQr, isCameraActive]);

  const stopScanner = async () => {
    try {
      if (
        scannerRef.current &&
        scannerRef.current.getState() === Html5QrcodeScannerState.SCANNING
      ) {
        await scannerRef.current.stop();
      }
      await scannerRef.current?.clear();
    } catch (error) {
      console.error("Failed to stop scanner:", error);
    }
  };

  const toggleCamera = () => {
    setIsCameraActive((prev) => !prev);
  };

  return (
    <div ref={containerRef} className="w-full max-w-md mx-auto mt-6">
      <h2 className="text-xl font-semibold text-center mb-4">Scan Ticket QR</h2>
      <div id="qr-reader" className="rounded-md overflow-hidden" />
      {showSuccessAnim && (
        <div className="text-green-600 text-2xl font-bold text-center animate-bounce mt-4">
          ✅ Ticket Verified!
        </div>
      )}
      <div className="mt-4 text-center">
        <button
          onClick={toggleCamera}
          className={`px-4 py-2 text-white rounded-md ${
            isCameraActive ? "bg-red-500" : "bg-blue-500"
          }`}
        >
          {isCameraActive ? "Stop Camera" : "Start Camera"}
        </button>
      </div>
    </div>
  );
};

export default TicketScanner;

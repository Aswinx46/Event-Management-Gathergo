
import React, { useEffect, useState } from 'react';
import { Html5QrcodeScanner } from 'html5-qrcode';
import { useVerifyTicket } from '@/hooks/VendorCustomHooks';
import { toast } from 'react-toastify';
import { TicketModal } from './TIcketConfirmationModal';
import { TicketBackendEntity } from '@/types/TicketBackendType';

function TicketScanner() {
  const [scanResult, setScanResult] = useState<string | null>(null);
  const [scannerInstance, setScannerInstance] = useState<Html5QrcodeScanner | null>(null);
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [verifiedTicket, setVerifiedTicket] = useState<TicketBackendEntity | null>(null)
  const ticketVerify = useVerifyTicket()
  const initializeScanner = () => {
    const scanner = new Html5QrcodeScanner(
      'reader',
      {
        fps: 5,
        qrbox: (viewfinderWidth, viewfinderHeight) => {
          const minEdgePercentage = 0.5;
          const edgeLength = Math.floor(
            Math.min(viewfinderWidth, viewfinderHeight) * minEdgePercentage
          );
          return { width: edgeLength, height: edgeLength };
        },
      },
      false
    );

    scanner.render(onScanSuccess, onScanError);
    setScannerInstance(scanner);
  };

  useEffect(() => {
    initializeScanner();

    return () => {
      scannerInstance?.clear().catch(() => { });
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onScanSuccess = async (decodedText: string) => {
    setScanResult(decodedText);

    try {
      const url = new URL(decodedText)
      const pathParts = url.pathname.split("/"); // ['', 'verifyTicket', 'ticketId', 'eventId']
      const ticketId = pathParts[2];
      const eventId = pathParts[3];
      ticketVerify.mutate({ ticketId, eventId }, {
        onSuccess: (data) => {
          toast.success(data.message)
          setVerifiedTicket(data.verifiedTicket)
          setIsOpen(true)
        },
        onError: (err) => {

          toast.error(err.message)
        },
        onSettled: () => {
          setTimeout(() => {
            setScanResult(null);
            initializeScanner(); // or set cooldown to false
          }, 5000);
        }
      })
    } catch (error) {
      console.log('error while decoding the qr', error)
    }
    console.log('Scanner cleared');


  };

  const onScanError = (errorMessage: string) => {
    // Optionally handle errors
    console.log(errorMessage)
  };

  const handleScanAgain = () => {
    setScanResult(null);
    initializeScanner();
  };

  const handleOnCloseModal = () => {
    handleScanAgain()
    setIsOpen(false)
  }

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>QR Ticket Scanner</h2>
      {isOpen && <TicketModal isOpen={isOpen} onClose={handleOnCloseModal} ticket={verifiedTicket!} />}
      {scanResult ? (
        <div style={styles.resultContainer}>
          <p style={styles.resultText}>✅ Scanned Result:</p>
          <div style={styles.resultBox}>{scanResult}</div>
          <button onClick={handleScanAgain} style={styles.scanAgainBtn}>
            Scan Again
          </button>
        </div>
      ) : (
        <div id="reader" style={styles.reader}></div>
      )}
    </div>
  );
}

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    maxWidth: '400px',
    margin: '50px auto',
    padding: '20px',
    borderRadius: '15px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
    textAlign: 'center',
    fontFamily: 'Arial, sans-serif',
    backgroundColor: '#f9f9f9',
  },
  title: {
    marginBottom: '20px',
    fontSize: '24px',
    fontWeight: 'bold',
  },
  reader: {
    width: '100%',
    minHeight: '300px',
    border: '2px dashed #ccc',
    borderRadius: '10px',
  },
  resultContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px',
  },
  resultText: {
    fontSize: '18px',
    fontWeight: 'bold',
  },
  resultBox: {
    padding: '10px 15px',
    backgroundColor: '#e6f7e6',
    borderRadius: '10px',
    border: '1px solid #8bc34a',
    color: '#2e7d32',
    fontSize: '16px',
  },
  scanAgainBtn: {
    marginTop: '10px',
    padding: '10px 20px',
    fontSize: '16px',
    border: 'none',
    borderRadius: '10px',
    backgroundColor: '#007bff',
    color: 'white',
    cursor: 'pointer',
  },
};

export default TicketScanner;

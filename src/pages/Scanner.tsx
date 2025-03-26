
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Scanner = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const initScanner = () => {
      // Using the provided scanner code
      const style = document.createElement('style');
      style.innerHTML = `
          @import url('https://fonts.googleapis.com/css2?family=Lexend+Deca:wght@500&display=swap');
          
          body {
              margin: 0;
              padding: 0;
              height: 100vh;
              width: 100vw;
              overflow: hidden;
          }

          #camera {
              position: fixed;
              top: 0;
              left: 0;
              width: 100vw;
              height: 100vh;
              object-fit: cover;
              z-index: -1;
              display: none;
          }

          .overlay {
              position: fixed;
              top: 0;
              left: 0;
              width: 100vw;
              height: 100vh;
              background-color: rgba(0, 0, 0, 0.2);
              z-index: 1;
          }

          .container {
              display: flex;
              justify-content: center;
              align-items: center;
              position: fixed;
              top: 0;
              left: 0;
              width: 100vw;
              height: 100vh;
              z-index: 2;
          }

          .scanner-frame {
              position: absolute;
              top: 35%;
              left: 50%;
              transform: translate(-50%, -50%);
              width: 50vmin;
              height: 50vmin;
              background-color: transparent;
              border-radius: 10px;
              box-shadow: 0 0 0 100vmax rgba(0, 0, 0, 0.3);
              z-index: 3;
          }

          .top-left, .top-right, .bottom-left, .bottom-right {
              position: absolute;
              width: 15%;
              height: 15%;
              border-radius: 10px;
              border-width: 6px;
              border-style: solid;
          }

          .top-left {
              top: -3%;
              left: -3%;
              border-color: #0066DC transparent transparent #0066DC;
          }

          .top-right {
              top: -3%;
              right: -3%;
              border-color: #0066DC #0066DC transparent transparent;
          }

          .bottom-left {
              bottom: -3%;
              left: -3%;
              border-color: transparent transparent #0066DC #0066DC;
          }

          .bottom-right {
              bottom: -3%;
              right: -3%;
              border-color: transparent #0066DC #0066DC transparent;
          }

          .error-message {
              position: absolute;
              top: 50%;
              left: 50%;
              transform: translate(-50%, -50%);
              width: 80%;
              max-width: 300px;
              text-align: center;
              font-family: 'Lexend Deca', sans-serif;
              color: black;
              font-size: 1.2rem;
              font-weight: 500;
              background-color: white;
              padding: 20px 15px;
              border-radius: 10px;
              z-index: 4;
              display: none;
          }

          .error-message .icon {
              width: 40px;
              height: 40px;
              margin: 0 auto 10px auto;
              background-color: #AD3026;
              border-radius: 50%;
              display: flex;
              justify-content: center;
              align-items: center;
          }

          .error-message .icon::before {
              content: '!';
              font-size: 1.5rem;
              color: white;
              font-weight: bold;
          }

          .error-message .close-btn {
              position: absolute;
              top: 5px;
              right: 5px;
              width: 20px;
              height: 20px;
              background: transparent;
              border: none;
              font-size: 1.5rem;
              color: #969696;
              cursor: pointer;
          }

          @media (max-width: 768px) {
              .scanner-frame {
                  width: 60vmin;
                  height: 60vmin;
              }

              .error-message {
                  font-size: 1rem;
                  width: 70%;
                  max-width: 250px;
              }
          }

          @media (max-width: 480px) {
              .scanner-frame {
                  width: 70vmin;
                  height: 70vmin;
              }

              .error-message {
                  font-size: 0.9rem;
                  width: 80%;
                  max-width: 200px;
              }
          }
          
          .back-button {
              position: fixed;
              top: 20px;
              left: 20px;
              background-color: rgba(255, 255, 255, 0.8);
              border-radius: 50%;
              width: 40px;
              height: 40px;
              display: flex;
              align-items: center;
              justify-content: center;
              z-index: 10;
              cursor: pointer;
          }
      `;
      document.head.appendChild(style);

      // Add a back button
      const backButton = document.createElement('div');
      backButton.className = 'back-button';
      backButton.innerHTML = '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M19 12H5M5 12L12 19M5 12L12 5" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>';
      backButton.addEventListener('click', () => {
        window.history.back();
      });
      document.body.appendChild(backButton);

      const mainContainer = document.createElement('div');
      mainContainer.className = 'scanner-container';
      document.body.appendChild(mainContainer);

      const container = document.createElement('div');
      container.className = 'container';
      mainContainer.appendChild(container);

      const camera = document.createElement('video');
      camera.id = 'camera';
      camera.setAttribute('playsinline', 'true'); // Fixed: boolean to string
      camera.setAttribute('autoplay', 'true');    // Fixed: boolean to string
      camera.style.display = 'none';  // Initially hide the video
      camera.controls = false;
      container.appendChild(camera);

      const overlay = document.createElement('div');
      overlay.className = 'overlay';
      container.appendChild(overlay);

      const scannerFrame = document.createElement('div');
      scannerFrame.className = 'scanner-frame';

      ['top-left', 'top-right', 'bottom-left', 'bottom-right'].forEach((corner) => {
          const cornerElement = document.createElement('div');
          cornerElement.className = corner;
          scannerFrame.appendChild(cornerElement);
      });
      container.appendChild(scannerFrame);

      const errorMessage = document.createElement('div');
      errorMessage.className = 'error-message';
      errorMessage.innerHTML = `
          <button class="close-btn">&times;</button>
          <div class="icon"></div>
          <div class="error-text">Invalid QR Code, Please scan a valid QR code.</div>
      `;
      scannerFrame.appendChild(errorMessage);

      const closeButton = errorMessage.querySelector('.close-btn');
      if (closeButton) {
        closeButton.addEventListener('click', () => {
          errorMessage.style.display = 'none';
        });
      }

      const jsQRScript = document.createElement('script');
      jsQRScript.src = 'https://cdn.jsdelivr.net/npm/jsqr@1.4.0/dist/jsQR.js';
      jsQRScript.async = true;
      document.head.appendChild(jsQRScript);

      function vibrateTwice() {
          if (navigator.vibrate) navigator.vibrate([100, 50, 100]);
      }

      // Flags for permissions status
      let permissionsGranted = false;
      let permissionsDenied = false;
      let hasReloaded = false;  // Flag to track if the page has already reloaded after permissions

      // Reference to the navigate function
      const navigateToPayment = (qrData: string) => {
        // Stop camera and clean up
        stopCamera();
        mainContainer.style.display = 'none';
        
        // Navigate to payment page with QR data
        navigate('/payment', { state: { qrData } });
      };

      async function startCamera() {
          if (hasReloaded) return;  // Skip the reload logic if already reloaded once

          try {
              const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } });
              camera.srcObject = stream;

              camera.oncanplay = () => {
                  camera.style.display = 'block'; // Show the video element when the camera is ready
                  camera.style.visibility = 'visible'; // Make the video visible

                  if (!hasReloaded) {
                      permissionsDenied = false;
                      permissionsGranted = true;
                      hasReloaded = true;  // Set to true to avoid further reloads
                      window.location.reload();  // Reload the page once camera is ready
                  }
              };

              camera.addEventListener('play', scan);
              vibrateTwice();
          } catch (err) {
              console.error('Error accessing camera:', err);
              if (errorMessage.querySelector('.error-text')) {
                (errorMessage.querySelector('.error-text') as HTMLElement).textContent = 'Please allow camera access by navigating to Medibuddy settings app, after allowing close the Medibuddy tab and reopen the link.';
              }
              errorMessage.style.display = 'block';
              permissionsDenied = true;  // Set denied flag when permissions are denied
              permissionsGranted = false; // Reset granted flag
          }
      }

      // Scan function (QR scanning logic)
      function scan() {
          const canvas = document.createElement('canvas');
          const context = canvas.getContext('2d');
          canvas.width = camera.videoWidth;
          canvas.height = camera.videoHeight;

          const checkQRCode = () => {
              if (camera.readyState === HTMLMediaElement.HAVE_ENOUGH_DATA) {
                  if (context) {
                    context.drawImage(camera, 0, 0, canvas.width, canvas.height);
                    const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
                    
                    // Check if jsQR is available before using it
                    if (window.jsQR) {
                        const code = window.jsQR(imageData.data, canvas.width, canvas.height);

                        if (code) {
                            const qrData = code.data.toLowerCase();

                            if (qrData.includes('@paytm')) {
                                errorMessage.style.display = 'flex';
                                if (errorMessage.querySelector('.error-text')) {
                                  (errorMessage.querySelector('.error-text') as HTMLElement).textContent = 'QR code not supported for payment processing';
                                }
                                errorMessage.style.display = 'block';
                                vibrateTwice();
                            } else if (
                                qrData.includes('upi://pay') ||
                                qrData.includes('hdfc') ||
                                qrData.includes('icici') ||
                                qrData.includes('axisbank') ||
                                qrData.includes('idbi')
                            ) {
                                // Fix the style property access with type assertions
                                const topLeft = document.querySelector('.top-left');
                                const topRight = document.querySelector('.top-right');
                                const bottomLeft = document.querySelector('.bottom-left');
                                const bottomRight = document.querySelector('.bottom-right');
                                
                                if (topLeft) (topLeft as HTMLElement).style.borderColor = '#0F7A48 transparent transparent #0F7A48';
                                if (topRight) (topRight as HTMLElement).style.borderColor = '#0F7A48 #0F7A48 transparent transparent';
                                if (bottomLeft) (bottomLeft as HTMLElement).style.borderColor = 'transparent transparent #0F7A48 #0F7A48';
                                if (bottomRight) (bottomRight as HTMLElement).style.borderColor = 'transparent #0F7A48 #0F7A48 transparent';
                                
                                errorMessage.style.display = 'none';
                                vibrateTwice();
                                
                                // Navigate to payment page with QR data
                                setTimeout(() => {
                                    navigateToPayment(qrData);
                                }, 1000);

                                return;
                            } else {
                                vibrateTwice();
                                if (errorMessage.querySelector('.error-text')) {
                                  (errorMessage.querySelector('.error-text') as HTMLElement).textContent = 'Invalid QR Code, Please scan a valid QR code.';
                                }
                                errorMessage.style.display = 'block';
                            }
                        }
                    }
                  }
              }

              requestAnimationFrame(checkQRCode);
          };

          requestAnimationFrame(checkQRCode);
      }

      function stopCamera() {
          const stream = camera.srcObject;
          if (stream instanceof MediaStream) {
              const tracks = stream.getTracks();
              tracks.forEach((track) => track.stop());
          }
          camera.srcObject = null;
      }

      // Start the camera immediately without requiring reload
      startCamera();

      // Function to handle cleanup when component unmounts
      return () => {
          stopCamera();
          if (mainContainer && mainContainer.parentNode) {
              mainContainer.parentNode.removeChild(mainContainer);
          }
          if (style && style.parentNode) {
              style.parentNode.removeChild(style);
          }
          if (jsQRScript && jsQRScript.parentNode) {
              jsQRScript.parentNode.removeChild(jsQRScript);
          }
          if (backButton && backButton.parentNode) {
              backButton.parentNode.removeChild(backButton);
          }
      };
    };

    const cleanup = initScanner();

    return () => {
      if (typeof cleanup === 'function') {
        cleanup();
      }
    };
  }, [navigate]);

  return null; // The UI is created dynamically with vanilla JS
};

export default Scanner;

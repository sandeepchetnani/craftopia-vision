
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Scanner = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const initScanner = () => {
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
            display: none; /* Initially hide the camera */
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
      camera.setAttribute('playsinline', 'true'); 
      camera.setAttribute('autoplay', 'true');
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
          <div class="error-text">Please allow camera access.</div>
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

      // Define the function to navigate to payment page
      const navigateToPayment = (qrData: string) => {
        // Stop camera and clean up
        stopCamera();
        mainContainer.style.display = 'none';
        
        // Navigate to payment page with QR data
        navigate('/payment', { state: { qrData } });
      };

      async function startCamera() {
        try {
          const stream = await navigator.mediaDevices.getUserMedia({
            video: { facingMode: 'environment' }
          });

          if (!stream) {
            throw new Error("Camera stream is null or undefined.");
          }

          camera.srcObject = stream;
          console.log("Camera stream assigned:", stream);

          camera.onloadedmetadata = () => {
            console.log("Camera metadata loaded");
            camera.style.display = 'block';
            camera.style.visibility = 'visible';

            if (errorMessage.querySelector('.error-text')) {
              errorMessage.style.display = 'none';
            }
            vibrateTwice();
            scan();
          };

          camera.onerror = (event) => {
            console.error("Camera video element error:", event);
            showCameraError("Error loading camera feed.");
            stopCamera();
          };

        } catch (err) {
          console.error('Error accessing camera:', err);
          showCameraError('Please allow camera access by navigating to settings and enabling camera permissions.');
          watchCameraPermission();
        }
      }

      function stopCamera() {
        const stream = camera.srcObject;
        if (stream instanceof MediaStream) {
          const tracks = stream.getTracks();
          tracks.forEach((track) => {
            track.stop();
            console.log("Stopping track:", track.kind);
          });
        }
        camera.srcObject = null;
        camera.style.display = 'none';
        console.log("Camera stopped.");
      }

      function scan() {
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');

        if (!context) {
          console.error("Could not get canvas context");
          return;
        }

        const checkQRCode = () => {
          if (!camera || !camera.videoWidth || !camera.videoHeight) {
            console.warn("Camera not initialized or dimensions are zero.");
            requestAnimationFrame(checkQRCode);
            return;
          }
          
          canvas.width = camera.videoWidth;
          canvas.height = camera.videoHeight;

          if (camera.readyState === HTMLMediaElement.HAVE_ENOUGH_DATA) {
            try {
              context.clearRect(0, 0, canvas.width, canvas.height);
              context.drawImage(camera, 0, 0, canvas.width, canvas.height);
              const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
              
              // Check if jsQR is available before using it
              if (window.jsQR) {
                const code = window.jsQR(imageData.data, canvas.width, canvas.height);

                if (code) {
                  handleQRCode(code.data.toLowerCase());
                }
              } else {
                console.warn("jsQR library not loaded yet");
              }
            } catch (error) {
              console.error("Error during QR code scanning:", error);
            }
          }
          requestAnimationFrame(checkQRCode);
        };
        
        requestAnimationFrame(checkQRCode);
      }

      function handleQRCode(qrData: string) {
        if (qrData.includes('@paytm')) {
          showCameraError('QR code not supported for payment processing');
          vibrateTwice();
        } else if (
          qrData.includes('upi://pay') ||
          qrData.includes('hdfc') ||
          qrData.includes('icici') ||
          qrData.includes('axisbank') ||
          qrData.includes('idbi')
        ) {
          // Change scanner frame color to green
          const topLeft = document.querySelector('.top-left');
          const topRight = document.querySelector('.top-right');
          const bottomLeft = document.querySelector('.bottom-left');
          const bottomRight = document.querySelector('.bottom-right');
          
          if (topLeft) (topLeft as HTMLElement).style.borderColor = '#0F7A48 transparent transparent #0F7A48';
          if (topRight) (topRight as HTMLElement).style.borderColor = '#0F7A48 #0F7A48 transparent transparent';
          if (bottomLeft) (bottomLeft as HTMLElement).style.borderColor = 'transparent transparent #0F7A48 #0F7A48';
          if (bottomRight) (bottomRight as HTMLElement).style.borderColor = 'transparent #0F7A48 #0F7A48 transparent';
          
          if (errorMessage) errorMessage.style.display = 'none';
          vibrateTwice();
          
          setTimeout(() => {
            navigateToPayment(qrData);
          }, 1000);
        } else {
          vibrateTwice();
          showCameraError('Invalid QR Code, Please scan a valid QR code.');
        }
      }

      function watchCameraPermission() {
        if (navigator.permissions) {
          navigator.permissions.query({ name: 'camera' as PermissionName }).then(permissionStatus => {
            permissionStatus.onchange = function() {
              if (permissionStatus.state === 'granted') {
                startCamera();
              }
            };
          }).catch(err => {
            console.error('Permission API not supported', err);
          });
        }
      }

      function showCameraError(message: string) {
        const errorTextElement = errorMessage.querySelector('.error-text');
        if (errorTextElement) {
          (errorTextElement as HTMLElement).textContent = message;
          errorMessage.style.display = 'block';
        }
      }

      // Start the camera when the component mounts
      startCamera();

      // Return cleanup function
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

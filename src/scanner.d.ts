
declare namespace jsQR {
  export interface QRCode {
    data: string;
    location: {
      topRightCorner: Point;
      topLeftCorner: Point;
      bottomRightCorner: Point;
      bottomLeftCorner: Point;
    };
  }

  interface Point {
    x: number;
    y: number;
  }
}

declare interface Window {
  jsQR: (data: Uint8ClampedArray, width: number, height: number) => jsQR.QRCode | null;
}

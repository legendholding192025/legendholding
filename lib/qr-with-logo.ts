/**
 * Generate a QR code data URL with the Legend logo in the center.
 * Uses /images/url_logo.png in the center on a white square.
 * Browser-only (uses canvas and document).
 */

const LOGO_IMAGE_URL = "/images/url_logo.png";
/** White square behind the white logo so it’s visible on the QR */
const LOGO_BG_FILL = "#ffffff";
const DEFAULT_QR_SIZE = 320;
const DEFAULT_MARGIN = 2;
/** Logo size as fraction of QR size (keep scannable) */
const LOGO_RATIO = 0.18;

export interface QRWithLogoOptions {
  width?: number;
  margin?: number;
}

/**
 * Draw the logo centered on the QR canvas on a white square background.
 */
function drawLogoInCenter(
  qrCanvas: HTMLCanvasElement,
  logoImage: HTMLImageElement,
  logoSizePx: number
): void {
  const ctx = qrCanvas.getContext("2d");
  if (!ctx) return;
  const size = qrCanvas.width;
  const center = size / 2;
  const padding = 4;
  const halfBg = logoSizePx / 2 + padding;
  // White square behind the logo so QR remains scannable
  ctx.fillStyle = LOGO_BG_FILL;
  ctx.fillRect(center - halfBg, center - halfBg, halfBg * 2, halfBg * 2);
  ctx.drawImage(
    logoImage,
    center - logoSizePx / 2,
    center - logoSizePx / 2,
    logoSizePx,
    logoSizePx
  );
}

/**
 * Generate a QR code data URL with the Legend logo in the center.
 * Must be called in the browser.
 */
export async function generateQRWithLogo(
  text: string,
  options: QRWithLogoOptions = {}
): Promise<string> {
  const width = options.width ?? DEFAULT_QR_SIZE;
  const margin = options.margin ?? DEFAULT_MARGIN;
  const QRCode = (await import("qrcode")).default;

  const canvas = document.createElement("canvas");
  await QRCode.toCanvas(canvas, text, {
    width,
    margin,
    errorCorrectionLevel: "H",
  });

  const logoSizePx = Math.round(width * LOGO_RATIO);
  const logoImg = await new Promise<HTMLImageElement>((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = LOGO_IMAGE_URL;
  });
  drawLogoInCenter(canvas, logoImg, logoSizePx);

  return canvas.toDataURL("image/png");
}

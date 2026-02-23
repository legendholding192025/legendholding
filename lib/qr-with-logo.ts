/**
 * Generate a QR code data URL (plain, no logo).
 * Browser-only (uses dynamic import of qrcode).
 */

const DEFAULT_QR_SIZE = 320;
const DEFAULT_MARGIN = 2;

export interface QRWithLogoOptions {
  width?: number;
  margin?: number;
}

/**
 * Generate a QR code data URL.
 * Must be called in the browser.
 */
export async function generateQRWithLogo(
  text: string,
  options: QRWithLogoOptions = {}
): Promise<string> {
  const width = options.width ?? DEFAULT_QR_SIZE;
  const margin = options.margin ?? DEFAULT_MARGIN;
  const QRCode = (await import("qrcode")).default;
  return QRCode.toDataURL(text, { width, margin });
}

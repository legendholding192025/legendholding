declare module "qrcode" {
  interface QRCodeOptions {
    width?: number;
    margin?: number;
  }
  const qrcode: {
    toDataURL(text: string, options?: QRCodeOptions): Promise<string>;
  };
  export default qrcode;
}

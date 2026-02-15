/**
 * Resize an image and convert to WebP for smaller file size and fast loading.
 * Uses Canvas API; targets ~200–300 KB by adjusting quality if needed.
 */
const DEFAULT_MAX_WIDTH = 1200;
const DEFAULT_QUALITY = 0.85;
const TARGET_MAX_BYTES = 300 * 1024;

export interface ResizeOptions {
  maxWidth?: number;
  maxHeight?: number;
  quality?: number;
  targetMaxBytes?: number;
}

export async function resizeAndConvertToWebP(
  file: File,
  options: ResizeOptions = {}
): Promise<Blob> {
  const maxWidth = options.maxWidth ?? DEFAULT_MAX_WIDTH;
  const maxHeight = options.maxHeight ?? maxWidth;
  const quality = options.quality ?? DEFAULT_QUALITY;
  const targetMaxBytes = options.targetMaxBytes ?? TARGET_MAX_BYTES;

  return new Promise((resolve, reject) => {
    const img = document.createElement('img');
    const url = URL.createObjectURL(file);
    img.onload = () => {
      URL.revokeObjectURL(url);
      const { width, height } = img;
      let w = width;
      let h = height;
      if (w > maxWidth || h > maxHeight) {
        const r = Math.min(maxWidth / w, maxHeight / h);
        w = Math.round(w * r);
        h = Math.round(h * r);
      }
      const canvas = document.createElement('canvas');
      canvas.width = w;
      canvas.height = h;
      const ctx = canvas.getContext('2d');
      if (!ctx) {
        reject(new Error('Canvas 2d not available'));
        return;
      }
      ctx.drawImage(img, 0, 0, w, h);

      const tryQuality = (q: number): void => {
        canvas.toBlob(
          (blob) => {
            if (!blob) {
              reject(new Error('toBlob failed'));
              return;
            }
            if (blob.size <= targetMaxBytes || q <= 0.5) {
              resolve(blob);
              return;
            }
            tryQuality(Math.max(0.5, q - 0.1));
          },
          'image/webp',
          q
        );
      };
      tryQuality(quality);
    };
    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error('Failed to load image'));
    };
    img.src = url;
  });
}

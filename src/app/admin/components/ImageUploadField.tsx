import { useState, useRef } from 'react';
import { Label } from '../../components/ui/label';
import { Input } from '../../components/ui/input';
import { Button } from '../../components/ui/button';
import { resizeAndConvertToWebP } from '../../../lib/imageUtils';
import { uploadImageToStorage } from '../../../lib/upload';

interface ImageUploadFieldProps {
  label?: string;
  value: string;
  onChange: (url: string) => void;
  /** Storage path prefix: "hero" or "projects". For projects, include a unique id (e.g. project id or "new") to avoid collisions. */
  storagePathPrefix: string;
  /** Optional: max width for resize (default 1200 for hero, can use 800 for project thumbnails) */
  maxWidth?: number;
}

export function ImageUploadField({
  label = 'Image',
  value,
  onChange,
  storagePathPrefix,
  maxWidth = 1200,
}: ImageUploadFieldProps) {
  const [uploading, setUploading] = useState(false);
  const [urlMode, setUrlMode] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !file.type.startsWith('image/')) return;
    setUploading(true);
    try {
      const blob = await resizeAndConvertToWebP(file, { maxWidth });
      const ext = 'webp';
      const path = `${storagePathPrefix}/${crypto.randomUUID()}.${ext}`;
      const publicUrl = await uploadImageToStorage(blob, path);
      onChange(publicUrl);
    } catch (err) {
      console.error('Upload failed:', err);
      alert('Upload failed. Try a smaller image or use a URL instead.');
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  return (
    <div className="space-y-2">
      <Label>{label}</Label>
      {value ? (
        <div className="flex flex-col gap-2">
          <div className="w-32 h-32 rounded overflow-hidden border border-gray-200 dark:border-gray-700 bg-gray-100 dark:bg-gray-800">
            <img
              src={value}
              alt="Preview"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex flex-wrap gap-2">
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleFileChange}
              disabled={uploading}
            />
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => fileInputRef.current?.click()}
              disabled={uploading}
            >
              {uploading ? 'Processing…' : 'Replace with upload'}
            </Button>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => setUrlMode(true)}
            >
              Use URL instead
            </Button>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => onChange('')}
            >
              Clear
            </Button>
          </div>
        </div>
      ) : (
        <div className="space-y-2">
          {urlMode ? (
            <div className="flex gap-2">
              <Input
                placeholder="https://..."
                value={value}
                onChange={(e) => onChange(e.target.value)}
              />
              <Button type="button" variant="outline" onClick={() => setUrlMode(false)}>
                Upload file instead
              </Button>
            </div>
          ) : (
            <>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleFileChange}
                disabled={uploading}
              />
              <div className="flex gap-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => fileInputRef.current?.click()}
                  disabled={uploading}
                >
                  {uploading ? 'Processing…' : 'Upload image'}
                </Button>
                <Button type="button" variant="ghost" onClick={() => setUrlMode(true)}>
                  Or paste URL
                </Button>
              </div>
            </>
          )}
        </div>
      )}
      {urlMode && value && (
        <Input
          placeholder="https://..."
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
      )}
    </div>
  );
}

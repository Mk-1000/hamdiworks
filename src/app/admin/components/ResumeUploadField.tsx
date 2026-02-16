import { useState, useRef } from 'react';
import { Label } from '../../components/ui/label';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { uploadFileToStorage } from '../../../lib/upload';
import { FileText } from 'lucide-react';

interface ResumeUploadFieldProps {
  label?: string;
  value: string;
  onChange: (url: string) => void;
  /** Storage path for the file (e.g. "hero/resume"). Will be stored as path + ".pdf" when uploading PDF. */
  storagePath?: string;
}

const DEFAULT_PATH = 'hero/resume';

export function ResumeUploadField({
  label = 'Resume / CV',
  value,
  onChange,
  storagePath = DEFAULT_PATH,
}: ResumeUploadFieldProps) {
  const [uploading, setUploading] = useState(false);
  const [urlMode, setUrlMode] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const isPdf = file.type === 'application/pdf';
    if (!isPdf) {
      alert('Please upload a PDF file.');
      return;
    }
    setUploading(true);
    try {
      const path = storagePath.replace(/\.pdf$/i, '') + '.pdf';
      const publicUrl = await uploadFileToStorage(file, path, { contentType: 'application/pdf' });
      onChange(publicUrl);
    } catch (err) {
      console.error('Resume upload failed:', err);
      alert('Upload failed. Check that the portfolio bucket allows PDF and try again.');
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
          <a
            href={value}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-primary hover:underline"
          >
            <FileText className="w-4 h-4" />
            Current resume (opens in new tab)
          </a>
          <div className="flex flex-wrap gap-2">
            <input
              ref={fileInputRef}
              type="file"
              accept="application/pdf"
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
              {uploading ? 'Uploading…' : 'Replace with new PDF'}
            </Button>
            <Button type="button" variant="outline" size="sm" onClick={() => setUrlMode(true)}>
              Use URL instead
            </Button>
            <Button type="button" variant="ghost" size="sm" onClick={() => onChange('')}>
              Clear
            </Button>
          </div>
        </div>
      ) : (
        <div className="space-y-2">
          {urlMode ? (
            <div className="flex gap-2 items-center flex-wrap">
              <Input
                placeholder="https://... (resume PDF URL)"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className="flex-1 min-w-[200px]"
              />
              <Button type="button" variant="outline" onClick={() => setUrlMode(false)}>
                Upload PDF instead
              </Button>
            </div>
          ) : (
            <>
              <input
                ref={fileInputRef}
                type="file"
                accept="application/pdf"
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
                  {uploading ? 'Uploading…' : 'Upload PDF resume'}
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
          placeholder="https://... (resume PDF URL)"
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
      )}
    </div>
  );
}

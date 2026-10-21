import React, { useState, useRef, useEffect } from 'react';
import { Camera, Upload, Check, RefreshCw, Sparkles, X, Image as ImageIcon } from 'lucide-react';

interface PortraitUploadControlsProps {
  onPhotoUpdated?: (dataUrl: string) => void;
}

export const PortraitUploadControls: React.FC<PortraitUploadControlsProps> = ({ onPhotoUpdated }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [statusMsg, setStatusMsg] = useState<string | null>(null);
  const [hasCustomPhoto, setHasCustomPhoto] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem('deepak_custom_portrait');
    if (saved) {
      setHasCustomPhoto(true);
      setPreviewUrl(saved);
    }

    // Global drag-and-drop listener across the window
    const handleDragOver = (e: DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      if (e.dataTransfer && Array.from(e.dataTransfer.types).includes('Files')) {
        setIsDragging(true);
      }
    };

    const handleDragLeave = (e: DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      // Only set to false if leaving the window
      if (e.clientX <= 0 || e.clientY <= 0 || e.clientX >= window.innerWidth || e.clientY >= window.innerHeight) {
        setIsDragging(false);
      }
    };

    const handleDrop = (e: DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragging(false);
      if (e.dataTransfer?.files && e.dataTransfer.files.length > 0) {
        const file = e.dataTransfer.files[0];
        if (file.type.startsWith('image/')) {
          processImageFile(file);
        } else {
          showStatus('Please drop an image file (PNG, JPG, WEBP)', true);
        }
      }
    };

    window.addEventListener('dragover', handleDragOver);
    window.addEventListener('dragleave', handleDragLeave);
    window.addEventListener('drop', handleDrop);

    return () => {
      window.removeEventListener('dragover', handleDragOver);
      window.removeEventListener('dragleave', handleDragLeave);
      window.removeEventListener('drop', handleDrop);
    };
  }, []);

  const showStatus = (msg: string, isError = false) => {
    setStatusMsg(msg);
    setTimeout(() => {
      setStatusMsg(null);
    }, 4000);
  };

  const processImageFile = (file: File) => {
    setIsProcessing(true);
    setStatusMsg('Processing Deepak\'s portrait...');

    const reader = new FileReader();
    reader.onload = async (e) => {
      const dataUrl = e.target?.result as string;
      if (!dataUrl) {
        setIsProcessing(false);
        showStatus('Failed to read image file', true);
        return;
      }

      try {
        // 1. Save to localStorage for instant client persistence
        localStorage.setItem('deepak_custom_portrait', dataUrl);
        setHasCustomPhoto(true);
        setPreviewUrl(dataUrl);

        // 2. Dispatch event to MosaicHeroCanvas to immediately rebuild particles
        window.dispatchEvent(new CustomEvent('update-deepak-portrait', { detail: { dataUrl } }));
        onPhotoUpdated?.(dataUrl);

        // 3. Try sending to backend endpoint to persist to public/assets/hero_center.png
        try {
          const res = await fetch('/api/save-hero-image', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ dataUrl }),
          });
          if (res.ok) {
            console.log('Successfully saved portrait to public/assets/hero_center.png');
          }
        } catch {
          // If in static environment or dev without proxy, localStorage is already active
        }

        setIsProcessing(false);
        showStatus('✓ Deepak\'s exact face rendered into particles & saved!');
        setIsOpen(false);
      } catch (err: unknown) {
        const message = err instanceof Error ? err.message : 'Unknown error';
        console.error('Error applying portrait:', err);
        setIsProcessing(false);
        showStatus('Error applying portrait: ' + message, true);
      }
    };
    reader.onerror = () => {
      setIsProcessing(false);
      showStatus('Error reading file', true);
    };
    reader.readAsDataURL(file);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      processImageFile(e.target.files[0]);
    }
  };

  const handleResetToDefault = async () => {
    localStorage.removeItem('deepak_custom_portrait');
    setHasCustomPhoto(false);
    setPreviewUrl(null);
    window.dispatchEvent(new CustomEvent('update-deepak-portrait', { detail: { dataUrl: '/assets/hero_center.png' } }));
    showStatus('Reset to default portrait');
    setIsOpen(false);
  };

  return (
    <>
      {/* Global Drag & Drop Overlay */}
      {isDragging && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex flex-col items-center justify-center border-4 border-dashed border-blue-500 pointer-events-none animate-in fade-in duration-200">
          <div className="p-8 rounded-3xl bg-neutral-900/90 border border-white/20 text-center max-w-md shadow-2xl">
            <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center animate-bounce">
              <Upload className="w-10 h-10" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">Drop Deepak's Photo Here</h3>
            <p className="text-gray-400 text-sm">
              Release to instantly rebuild the 45,000+ WebGL particles into Deepak's exact face without a single change.
            </p>
          </div>
        </div>
      )}

      {/* Floating Action Button on the Hero */}
      <div className="fixed top-20 right-6 z-30 flex flex-col items-end gap-2">
        {statusMsg && (
          <div className="px-4 py-2 rounded-full bg-blue-600/90 text-white text-xs font-medium shadow-lg backdrop-blur-md border border-white/20 flex items-center gap-2 animate-in slide-in-from-top duration-300">
            <Check className="w-3.5 h-3.5 text-emerald-300" />
            <span>{statusMsg}</span>
          </div>
        )}

        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`group flex items-center gap-2.5 px-3.5 py-2 rounded-full text-xs font-semibold backdrop-blur-md border transition-all duration-300 shadow-xl cursor-pointer ${
            hasCustomPhoto
              ? 'bg-blue-600/90 hover:bg-blue-500 text-white border-blue-400/50 shadow-blue-500/25'
              : 'bg-white/10 hover:bg-white/20 text-white border-white/20 hover:border-white/40'
          }`}
          title="Upload or Change Deepak's Face"
        >
          {previewUrl ? (
            <img
              src={previewUrl}
              alt="Deepak Preview"
              className="w-5 h-5 rounded-full object-cover ring-1 ring-white/50"
            />
          ) : (
            <Camera className="w-4 h-4 text-blue-400 group-hover:scale-110 transition-transform" />
          )}
          <span>{hasCustomPhoto ? 'Deepak Photo: Active' : 'Set Deepak\'s Photo'}</span>
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
        </button>

        {/* Modal / Popover */}
        {isOpen && (
          <div className="w-80 p-5 rounded-2xl bg-neutral-950/95 border border-white/15 text-white shadow-2xl backdrop-blur-xl animate-in zoom-in-95 duration-200 flex flex-col gap-4">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-blue-400" />
                <h4 className="font-bold text-sm tracking-wide">Deepak's Particle Portrait</h4>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-gray-400 hover:text-white p-1 rounded-lg hover:bg-white/10 transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <p className="text-xs text-gray-400 leading-relaxed">
              Upload Deepak&apos;s picture (or drag and drop anywhere onto this page). The WebGL2 shader maps each particle to his exact facial features, tone, and contours.
            </p>

            {/* Current Active Preview */}
            {previewUrl && (
              <div className="relative rounded-xl overflow-hidden border border-white/20 bg-black/50 aspect-3/4 max-h-48 flex items-center justify-center">
                <img
                  src={previewUrl}
                  alt="Deepak's Active Portrait"
                  className="w-full h-full object-contain"
                />
                <div className="absolute bottom-2 left-2 right-2 px-2.5 py-1 bg-black/80 backdrop-blur-md rounded-lg text-[10px] text-gray-300 flex items-center justify-between border border-white/10">
                  <span className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    Currently active in particles
                  </span>
                </div>
              </div>
            )}

            {/* Hidden native input */}
            <input
              ref={fileInputRef}
              type="file"
              accept="image/png,image/jpeg,image/webp,image/jpg"
              className="hidden"
              onChange={handleFileChange}
            />

            {/* Action buttons */}
            <div className="flex flex-col gap-2">
              <button
                onClick={() => fileInputRef.current?.click()}
                disabled={isProcessing}
                className="w-full py-2.5 px-4 rounded-xl bg-blue-600 hover:bg-blue-500 active:scale-98 text-white font-semibold text-xs flex items-center justify-center gap-2 transition-all shadow-lg shadow-blue-600/30 cursor-pointer disabled:opacity-50"
              >
                {isProcessing ? (
                  <>
                    <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                    <span>Processing Particles...</span>
                  </>
                ) : (
                  <>
                    <Upload className="w-3.5 h-3.5" />
                    <span>Upload Deepak&apos;s Photo</span>
                  </>
                )}
              </button>

              {hasCustomPhoto && (
                <button
                  onClick={handleResetToDefault}
                  className="w-full py-2 px-3 rounded-xl bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white text-[11px] font-medium flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                >
                  <RefreshCw className="w-3 h-3" />
                  <span>Reset to Template Photo</span>
                </button>
              )}
            </div>

            <div className="pt-2 border-t border-white/10 text-[10px] text-gray-400 flex items-center justify-between">
              <span>Tip: Drop any photo on page</span>
              <span className="text-gray-400">JPG, PNG, WEBP</span>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

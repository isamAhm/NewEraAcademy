"use client";

import { useId, useRef, useState, type DragEvent } from "react";
import {
  RESUME_ALLOWED_EXTENSIONS,
  RESUME_MAX_BYTES,
  hasAllowedResumeExtension,
} from "@/lib/validation";

type FileDropzoneProps = {
  name: string;
  required?: boolean;
  error?: string;
  onFileChange: (file: File | null, error: string | null) => void;
};

function formatBytes(bytes: number) {
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

/**
 * Accessible drag-and-drop resume upload. A real, focusable <input
 * type="file"> is layered over the visible drop area so keyboard users and
 * screen readers get the native file-picker experience, while drag/drop
 * is layered on top for pointer users.
 */
export function FileDropzone({ name, required, error, onFileChange }: FileDropzoneProps) {
  const id = useId();
  const inputRef = useRef<HTMLInputElement>(null);
  const [fileName, setFileName] = useState<string | null>(null);
  const [fileSize, setFileSize] = useState<number | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const errorId = error ? `${id}-error` : undefined;

  function validateAndSet(file: File | null) {
    if (!file) {
      setFileName(null);
      setFileSize(null);
      onFileChange(null, null);
      return;
    }

    if (!hasAllowedResumeExtension(file.name)) {
      setFileName(null);
      setFileSize(null);
      onFileChange(null, `Please upload a ${RESUME_ALLOWED_EXTENSIONS.join(", ")} file.`);
      return;
    }

    if (file.size > RESUME_MAX_BYTES) {
      setFileName(null);
      setFileSize(null);
      onFileChange(null, "That file is larger than 10MB. Please upload a smaller file.");
      return;
    }

    setFileName(file.name);
    setFileSize(file.size);
    onFileChange(file, null);
  }

  function handleDrop(event: DragEvent<HTMLDivElement>) {
    event.preventDefault();
    setIsDragging(false);
    const file = event.dataTransfer.files?.[0] ?? null;
    if (file && inputRef.current) {
      // Keep the native input in sync so a real <form> submit (and our
      // FormData read) sees the dropped file too.
      const transfer = new DataTransfer();
      transfer.items.add(file);
      inputRef.current.files = transfer.files;
    }
    validateAndSet(file);
  }

  return (
    <div>
      <label htmlFor={id} className="text-sm font-semibold text-ink">
        Resume upload
        {required && (
          <span className="text-cta" aria-hidden="true">
            {" "}
            *
          </span>
        )}
      </label>

      <div
        onDragOver={(event) => {
          event.preventDefault();
          setIsDragging(true);
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleDrop}
        className={`relative mt-1.5 flex flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed px-4 py-8 text-center transition-colors duration-150 ${
          isDragging
            ? "border-brand-purple bg-brand-purple-light"
            : error
              ? "border-cta"
              : "border-black/20 bg-white"
        }`}
      >
        <input
          ref={inputRef}
          id={id}
          name={name}
          type="file"
          accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
          required={required}
          aria-required={required}
          aria-invalid={Boolean(error)}
          aria-describedby={errorId}
          className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
          onChange={(event) => validateAndSet(event.target.files?.[0] ?? null)}
        />
        <svg
          viewBox="0 0 24 24"
          className="h-8 w-8 text-brand-purple"
          fill="none"
          aria-hidden="true"
        >
          <path
            d="M12 16V4M12 4L7 9M12 4L17 9"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M4 16V18C4 19.1046 4.89543 20 6 20H18C19.1046 20 20 19.1046 20 18V16"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
        {fileName ? (
          <p className="text-sm font-semibold text-ink">
            {fileName}
            {fileSize !== null && (
              <span className="ml-1 font-normal text-ink-soft">
                ({formatBytes(fileSize)})
              </span>
            )}
          </p>
        ) : (
          <p className="text-sm text-ink-soft">
            Drag and drop your resume here, or click to browse
            <br />
            PDF, DOC, or DOCX — max 10MB
          </p>
        )}
      </div>

      {error && (
        <p id={errorId} role="alert" className="mt-1.5 text-xs font-semibold text-cta">
          {error}
        </p>
      )}
    </div>
  );
}

import { useRef, useState } from 'react'
import { Upload, FileText } from 'lucide-react'

export default function ResumeUpload({ onFileSelected, selectedFile }) {
  const inputRef = useRef(null)
  const [isDragging, setIsDragging] = useState(false)

  function handleFiles(files) {
    const file = files?.[0]
    if (file) onFileSelected(file)
  }

  return (
    <div
      className={`flex cursor-pointer flex-col items-center justify-center rounded-lg border border-dashed p-10 text-center transition-colors ${
        isDragging ? 'border-[#00F0FF] bg-[#00F0FF]/5' : 'border-white/20 hover:border-[#00F0FF]/50'
      }`}
      onClick={() => inputRef.current?.click()}
      onDragOver={(e) => {
        e.preventDefault()
        setIsDragging(true)
      }}
      onDragLeave={() => setIsDragging(false)}
      onDrop={(e) => {
        e.preventDefault()
        setIsDragging(false)
        handleFiles(e.dataTransfer.files)
      }}
    >
      <input
        ref={inputRef}
        type="file"
        accept=".pdf,.doc,.docx"
        className="hidden"
        data-testid="resume-upload-input"
        onChange={(e) => handleFiles(e.target.files)}
      />

      {selectedFile ? (
        <>
          <FileText size={28} className="mb-3 text-[#00F0FF]" />
          <div className="text-sm text-white">{selectedFile.name}</div>
          <div className="mt-1 text-xs text-secondary">Click to choose a different file</div>
        </>
      ) : (
        <>
          <Upload size={28} className="mb-3 text-secondary" />
          <div className="text-sm font-medium text-white">Upload Resume</div>
          <div className="mt-1 text-xs tracking-wider text-secondary uppercase">
            PDF / DOCX
          </div>
        </>
      )}
    </div>
  )
}

import { Upload, FileText, X } from "lucide-react";
import { useState } from "react";

function DocumentUpload() {
  const [files, setFiles] = useState<File[]>([]);

  const handleUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) return;
    const selectedFiles = Array.from(event.target.files);
    setFiles([...files, ...selectedFiles]);
  };

  const removeFile = (index: number) => {
    setFiles(files.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-4">
      {/* Drop Zone */}
      <label className="card-hover flex flex-col items-center justify-center py-10 cursor-pointer border-2 border-dashed border-gray-200 hover:border-brand-300 hover:bg-brand-50/30 transition-all duration-200 rounded-xl">
        <div className="w-12 h-12 rounded-xl bg-brand-50 text-brand-500 flex items-center justify-center mb-3">
          <Upload size={22} />
        </div>
        <p className="text-sm font-medium text-gray-700">
          Click to upload documents
        </p>
        <p className="text-xs text-gray-400 mt-1">
          PDF, DOC, XLS, PNG up to 10MB
        </p>
        <input
          type="file"
          multiple
          className="hidden"
          onChange={handleUpload}
        />
      </label>

      {/* File List */}
      {files.length > 0 && (
        <div className="space-y-2">
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
            Uploaded Files ({files.length})
          </p>
          {files.map((file, index) => (
            <div
              key={index}
              className="flex items-center gap-3 p-3 rounded-lg bg-surface-muted border border-gray-100 group animate-slide-up"
            >
              <div className="w-8 h-8 rounded-lg bg-brand-50 text-brand-500 flex items-center justify-center flex-shrink-0">
                <FileText size={16} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-700 truncate">
                  {file.name}
                </p>
                <p className="text-[11px] text-gray-400">
                  {(file.size / 1024).toFixed(1)} KB
                </p>
              </div>
              <button
                onClick={() => removeFile(index)}
                className="p-1 rounded-md text-gray-400 hover:text-red-500 hover:bg-red-50 transition-colors opacity-0 group-hover:opacity-100 cursor-pointer"
              >
                <X size={14} />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default DocumentUpload;
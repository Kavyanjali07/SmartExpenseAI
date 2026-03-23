"use client";

import { useState } from "react";
import { importCsv } from "@/services/api";
import { Upload } from "lucide-react";

export default function CsvImport({ onImported }: any) {

  const [file, setFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const upload = async () => {

    if (!file) return;

    await importCsv(file);
    setFile(null);
    onImported();
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      setFile(files[0]);
    }
  };

  return (
    <div className="glass-card p-6 mt-6 border-2 border-dashed border-cyan-400/30 hover:border-cyan-400/60 transition"
         onDragOver={handleDragOver}
         onDragLeave={handleDragLeave}
         onDrop={handleDrop}>

      <div className="flex gap-4 items-center flex-wrap">
        
        <div className="flex-1 min-w-[250px]">
          <label className="flex items-center gap-3 cursor-pointer group">
            <div className="p-3 rounded-lg bg-gradient-to-br from-cyan-500/20 to-purple-500/20 group-hover:from-cyan-500/40 group-hover:to-purple-500/40 transition">
              <Upload size={20} className="text-cyan-300" />
            </div>
            <div>
              <p className="text-sm font-semibold text-white">
                {file ? file.name : "Upload CSV File"}
              </p>
              <p className="text-xs text-gray-400">
                {file ? "Ready to import" : "Drag and drop or click to select"}
              </p>
            </div>
            <input
              type="file"
              accept=".csv"
              onChange={(e) => setFile(e.target.files?.[0] || null)}
              className="hidden"
            />
          </label>
        </div>

        <button
          onClick={upload}
          disabled={!file}
          className="bg-gradient-to-r from-cyan-500 to-purple-600 px-6 py-3 rounded-lg font-semibold hover:shadow-lg hover:shadow-cyan-500/50 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Import CSV
        </button>

      </div>

    </div>
  );
}
import { useState } from 'react';
import { UploadCloud, FileType, CheckCircle, AlertTriangle } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from '../ui/Button';

export default function BulkUpload({ onUploadComplete }) {
    const [isDragging, setIsDragging] = useState(false);
    const [file, setFile] = useState(null);
    const [isProcessing, setIsProcessing] = useState(false);

    const handleDragOver = (e) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = () => {
        setIsDragging(false);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        setIsDragging(false);
        const droppedFile = e.dataTransfer.files[0];
        if (droppedFile && droppedFile.type === 'text/csv') {
            setFile(droppedFile);
        }
    };

    const simulateProcessing = () => {
        setIsProcessing(true);
        setTimeout(() => {
            setIsProcessing(false);
            onUploadComplete();
        }, 2000);
    };

    return (
        <div className="flex flex-col gap-8 max-w-4xl mx-auto">
            {/* Visual Logic Explorer */}
            <div className="bg-navy-deep/40 border border-white/10 rounded-xl p-6 backdrop-blur-sm">
                <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                    <FileType className="text-neon-cyan" size={20} />
                    Estructura de Datos Requerida
                </h3>
                <div className="flex items-center gap-4 text-sm text-gray-400">
                    <div className="flex-1 p-4 bg-black/20 rounded border border-white/5 relative group">
                        <span className="text-white font-mono block mb-1">Customer_ID</span>
                        <span className="text-xs text-gray-500">Identificador único</span>
                        <div className="absolute -top-2 -right-2 bg-blue-500 text-white text-[10px] px-2 py-0.5 rounded-full">Meta-data</div>
                    </div>

                    <div className="text-xl font-bold text-gray-600">+</div>

                    <div className="flex-[3] p-4 bg-neon-cyan/5 rounded border border-neon-cyan/20 relative">
                        <span className="text-white font-mono block mb-1">19 Variables Predictivas</span>
                        <span className="text-xs text-gray-500">CreditScore, Geography, Gender, Age, Tenure...</span>
                        <div className="absolute -top-2 -right-2 bg-neon-cyan text-navy-deep text-[10px] px-2 py-0.5 rounded-full font-bold">Model Input</div>
                    </div>

                    <div className="text-xl font-bold text-gray-600">=</div>

                    <div className="flex-1 p-4 bg-alert-red/10 rounded border border-alert-red/20 text-center">
                        <span className="text-alert-red font-bold block mb-1">Churn Probability</span>
                    </div>
                </div>
            </div>

            {/* Upload Zone */}
            <motion.div
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                animate={{
                    borderColor: isDragging ? '#64FFDA' : 'rgba(255,255,255,0.1)',
                    backgroundColor: isDragging ? 'rgba(100,255,218,0.05)' : 'rgba(255,255,255,0.02)'
                }}
                className="h-64 border-2 border-dashed rounded-2xl flex flex-col items-center justify-center transition-all cursor-pointer relative overflow-hidden"
            >
                {!file && !isProcessing && (
                    <div className="text-center pointer-events-none">
                        <UploadCloud size={64} className="text-gray-500 mx-auto mb-4" />
                        <p className="text-xl font-medium text-white">Arrastra tu archivo CSV aquí</p>
                        <p className="text-sm text-gray-500 mt-2">Soporta hasta 100MB</p>
                    </div>
                )}

                {file && !isProcessing && (
                    <div className="text-center z-10">
                        <FileSearch size={48} className="text-neon-cyan mx-auto mb-4" />
                        <p className="text-white font-medium text-lg">{file.name}</p>
                        <p className="text-sm text-gray-400">{(file.size / 1024).toFixed(2)} KB</p>
                        <div className="flex gap-4 mt-6">
                            <Button variant="glass" onClick={() => setFile(null)} className="text-sm py-2">Cancelar</Button>
                            <Button onClick={simulateProcessing} className="text-sm py-2">Analizar Dataset</Button>
                        </div>
                    </div>
                )}

                {isProcessing && (
                    <div className="flex flex-col items-center">
                        <div className="w-16 h-16 border-4 border-white/10 border-t-neon-cyan rounded-full animate-spin mb-4" />
                        <p className="text-neon-cyan animate-pulse">Procesando Random Forest...</p>
                    </div>
                )}
            </motion.div>
        </div>
    );
}

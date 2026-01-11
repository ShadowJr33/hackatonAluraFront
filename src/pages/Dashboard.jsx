import { useState } from 'react';
import { Sidebar } from '../components/layout/Sidebar';
import BulkUpload from '../components/dashboard/BulkUpload';
import ResultsTable from '../components/dashboard/ResultsTable';
import InsightPanel from '../components/dashboard/InsightPanel';
import { AnimatePresence } from 'framer-motion';

export default function Dashboard() {
    const [activeTab, setActiveTab] = useState('batch');
    const [viewState, setViewState] = useState('upload'); // 'upload' | 'results'
    const [selectedCustomer, setSelectedCustomer] = useState(null);

    const handleUploadComplete = () => {
        setViewState('results');
    };

    const handleBackToUpload = () => {
        setViewState('upload');
    };

    return (
        <div className="flex h-screen bg-navy-deep text-white overflow-hidden font-sans">
            <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

            <main className="flex-1 relative overflow-hidden flex flex-col">
                {/* Background Gradients */}
                <div className="absolute top-0 left-0 w-full h-full pointer-events-none z-0">
                    <div className="absolute top-[-20%] right-[-10%] w-[800px] h-[800px] bg-blue-900/10 rounded-full blur-[120px]" />
                    <div className="absolute bottom-[-10%] left-[20%] w-[600px] h-[600px] bg-neon-cyan/5 rounded-full blur-[100px]" />
                </div>

                {/* Content Area */}
                <div className="relative z-10 flex-1 p-8 overflow-y-auto">
                    {activeTab === 'batch' && (
                        <>
                            <header className="mb-8 flex items-center justify-between">
                                <div>
                                    <h1 className="text-3xl font-bold flex items-center gap-3">
                                        Carga Masiva de Clientes
                                        {viewState === 'results' && (
                                            <span className="text-sm font-normal text-gray-400 bg-white/5 px-3 py-1 rounded-full border border-white/10">
                                                Resultados del Análisis
                                            </span>
                                        )}
                                    </h1>
                                    <p className="text-gray-400 mt-1">
                                        {viewState === 'upload'
                                            ? 'Arrastra tu dataset para predecir el riesgo de fuga.'
                                            : 'Visualizando predicciones para el lote #BATCH-2026-001'}
                                    </p>
                                </div>

                                {viewState === 'results' && (
                                    <button
                                        onClick={handleBackToUpload}
                                        className="text-neon-cyan hover:text-white underline text-sm"
                                    >
                                        Procesar Nuevo Archivo
                                    </button>
                                )}
                            </header>

                            <div className="w-full max-w-7xl mx-auto">
                                {viewState === 'upload' ? (
                                    <BulkUpload onUploadComplete={handleUploadComplete} />
                                ) : (
                                    <ResultsTable onSelectCustomer={setSelectedCustomer} />
                                )}
                            </div>
                        </>
                    )}

                    {activeTab !== 'batch' && (
                        <div className="flex items-center justify-center h-full text-gray-500">
                            <p>Módulo {activeTab} en construcción</p>
                        </div>
                    )}
                </div>

                {/* Insight Panel Sidebar */}
                <AnimatePresence>
                    {selectedCustomer && (
                        <InsightPanel
                            customer={selectedCustomer}
                            onClose={() => setSelectedCustomer(null)}
                        />
                    )}
                </AnimatePresence>
            </main>
        </div>
    );
}

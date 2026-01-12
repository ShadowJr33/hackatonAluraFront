import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LayoutDashboard, UploadCloud, FileSearch, Settings, ChevronLeft, ChevronRight, LogOut } from 'lucide-react';
import { clsx } from 'clsx';

import logo from '../../assets/Churn Alert Shield.png';

export function Sidebar({ activeTab, setActiveTab, onBack }) {
    const [isCollapsed, setIsCollapsed] = useState(false);

    const menuItems = [
        { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
        { id: 'batch', label: 'Carga Masiva', icon: UploadCloud },
        { id: 'single', label: 'Predicción Única', icon: FileSearch },
        { id: 'settings', label: 'Configuración', icon: Settings },
    ];

    return (
        <motion.aside
            initial={{ width: 250 }}
            animate={{ width: isCollapsed ? 80 : 250 }}
            className="h-screen bg-navy-deep/80 backdrop-blur-xl border-r border-white/10 flex flex-col relative z-20"
        >
            {/* Header */}
            <div className="p-6 flex items-center justify-between">
                {!isCollapsed && (
                    <motion.button
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        onClick={onBack}
                        className="font-bold text-xl tracking-tighter text-white flex items-center gap-2 hover:opacity-80 transition-opacity"
                    >
                        <img src={logo} alt="Logo" className="w-8 h-8 object-contain" />
                        <span>Churn<span className="text-neon-cyan">Alert</span></span>
                    </motion.button>
                )}
                <button
                    onClick={() => setIsCollapsed(!isCollapsed)}
                    className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
                >
                    {isCollapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
                </button>
            </div>

            {/* Menu */}
            <nav className="flex-1 px-4 py-6 flex flex-col gap-2">
                {menuItems.map((item) => {
                    const isActive = activeTab === item.id;
                    const Icon = item.icon;

                    return (
                        <button
                            key={item.id}
                            onClick={() => setActiveTab(item.id)}
                            className={clsx(
                                "flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 relative group overflow-hidden",
                                isActive
                                    ? "bg-neon-cyan/10 text-neon-cyan shadow-[0_0_15px_rgba(100,255,218,0.1)]"
                                    : "text-gray-400 hover:bg-white/5 hover:text-white"
                            )}
                        >
                            {isActive && (
                                <motion.div
                                    layoutId="active-pill"
                                    className="absolute left-0 top-0 bottom-0 w-1 bg-neon-cyan"
                                />
                            )}

                            <Icon size={22} className={clsx(isActive && "drop-shadow-[0_0_5px_rgba(100,255,218,0.5)]")} />

                            {!isCollapsed && (
                                <span className="font-medium whitespace-nowrap">{item.label}</span>
                            )}

                            {/* Hover Glow */}
                            <div className="absolute inset-0 bg-gradient-to-r from-neon-cyan/0 via-neon-cyan/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                        </button>
                    );
                })}
            </nav>

            {/* User / Footer */}
            <div className="p-4 border-t border-white/10">
                <button className="flex items-center gap-3 w-full px-4 py-3 rounded-xl text-alert-red hover:bg-alert-red/10 transition-colors">
                    <LogOut size={20} />
                    {!isCollapsed && <span className="font-medium">Cerrar Sesión</span>}
                </button>
            </div>
        </motion.aside>
    );
}

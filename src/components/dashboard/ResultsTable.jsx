import { useState } from 'react';
import { clsx } from 'clsx';
import { Eye, AlertCircle, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';

const MOCK_DATA = Array.from({ length: 50 }, (_, i) => ({
    id: `CUST-${1000 + i}`,
    creditScore: 600 + Math.floor(Math.random() * 250),
    geography: ['France', 'Spain', 'Germany'][Math.floor(Math.random() * 3)],
    gender: Math.random() > 0.5 ? 'Male' : 'Female',
    age: 20 + Math.floor(Math.random() * 60),
    churnProb: Math.random(),
}));

export default function ResultsTable({ onSelectCustomer }) {
    return (
        <div className="bg-navy-deep/60 border border-white/10 rounded-2xl overflow-hidden backdrop-blur-md">
            <table className="w-full text-left border-collapse">
                <thead className="bg-white/5 text-gray-400 text-sm uppercase font-mono tracking-wider">
                    <tr>
                        <th className="p-4 border-b border-white/10">Customer ID</th>
                        <th className="p-4 border-b border-white/10">Credit Score</th>
                        <th className="p-4 border-b border-white/10">Country</th>
                        <th className="p-4 border-b border-white/10">Age</th>
                        <th className="p-4 border-b border-white/10">Riesgo Churn</th>
                        <th className="p-4 border-b border-white/10">Acción</th>
                    </tr>
                </thead>
                <tbody className="text-sm">
                    {MOCK_DATA.map((row) => {
                        const isHighRisk = row.churnProb > 0.75;
                        const isSafe = row.churnProb < 0.25;

                        return (
                            <motion.tr
                                key={row.id}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="hover:bg-white/5 transition-colors border-b border-white/5"
                            >
                                <td className="p-4 font-mono text-white/80">{row.id}</td>
                                <td className="p-4 text-gray-300">{row.creditScore}</td>
                                <td className="p-4 text-gray-300">{row.geography}</td>
                                <td className="p-4 text-gray-300">{row.age}</td>
                                <td className="p-4">
                                    <span className={clsx(
                                        "px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1 w-fit",
                                        isHighRisk ? "bg-alert-red/20 text-alert-red border border-alert-red/30" :
                                            isSafe ? "bg-neon-cyan/10 text-neon-cyan border border-neon-cyan/20" :
                                                "bg-yellow-500/10 text-yellow-500 border border-yellow-500/20"
                                    )}>
                                        {isHighRisk && <AlertCircle size={12} />}
                                        {isSafe && <CheckCircle size={12} />}
                                        {(row.churnProb * 100).toFixed(1)}%
                                    </span>
                                </td>
                                <td className="p-4">
                                    <button
                                        onClick={() => onSelectCustomer(row)}
                                        className="p-2 rounded-lg bg-white/5 hover:bg-neon-cyan hover:text-navy-deep text-gray-400 transition-all"
                                        title="Ver Insight"
                                    >
                                        <Eye size={16} />
                                    </button>
                                </td>
                            </motion.tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
}

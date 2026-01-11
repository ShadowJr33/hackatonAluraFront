import { motion } from 'framer-motion';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { Activity, ShieldCheck, Zap, ArrowRight } from 'lucide-react';
import insightBot from '../assets/insight-bot.png';

export default function LandingPage({ onLaunch }) {
    return (
        <div className="min-h-screen relative overflow-hidden flex flex-col">
            {/* Background Elements */}
            <div className="absolute top-0 left-0 w-full h-full pointer-events-none z-0">
                <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-neon-cyan/20 rounded-full blur-[100px]" />
                <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-alert-red/10 rounded-full blur-[100px]" />
            </div>

            {/* Navbar */}
            <nav className="relative z-10 p-6 flex justify-between items-center max-w-7xl mx-auto w-full">
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded bg-gradient-to-br from-neon-cyan to-blue-500 flex items-center justify-center">
                        <Activity className="text-navy-deep w-5 h-5" />
                    </div>
                    <span className="text-2xl font-bold tracking-tighter text-white">Churn<span className="text-neon-cyan">Alert</span></span>
                </div>
                <Button variant="glass" className="text-sm px-4 py-2" onClick={onLaunch}>Acceder</Button>
            </nav>

            {/* Hero Section */}
            <main className="relative z-10 flex-1 flex flex-col items-center justify-center p-6 text-center max-w-6xl mx-auto mt-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="flex flex-col items-center gap-6"
                >
                    <div className="inline-block p-1 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm mb-4">
                        <span className="px-3 py-1 text-xs text-neon-cyan font-mono uppercase tracking-widest">IA de Comando Central v2.0</span>
                    </div>

                    <h1 className="text-5xl md:text-7xl font-bold leading-tight bg-clip-text text-transparent bg-gradient-to-b from-white to-white/70">
                        Anticipa el Futuro <br /> de tus Clientes
                    </h1>

                    <p className="text-lg md:text-xl text-gray-400 max-w-2xl">
                        Plataforma de inteligencia predictiva impulsada por modelos Random Forest y XGBoost. Detecta patrones de deserción y actúa antes de que sea tarde.
                    </p>

                    <Button onClick={onLaunch} className="mt-8 text-lg px-10 py-4 shadow-[0_0_30px_rgba(100,255,218,0.3)]">
                        Lanzar Dashboard <ArrowRight className="ml-2 w-5 h-5" />
                    </Button>
                </motion.div>

                {/* Feature Pillars */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-20 w-full">
                    <Pillar
                        icon={<ShieldCheck className="w-8 h-8 text-neon-cyan" />}
                        title="Precisión Extrema"
                        desc="Modelos XGBoost calibrados para reducir falsos positivos y maximizar la retención."
                        delay={0.2}
                    />
                    <Pillar
                        icon={<Zap className="w-8 h-8 text-neon-cyan" />}
                        title="Análisis en Tiempo Real"
                        desc="Procesamiento inmediato de archivos masivos con reporte de riesgo instantáneo."
                        delay={0.4}
                    />
                    <Pillar
                        icon={<Activity className="w-8 h-8 text-neon-cyan" />}
                        title="Explicabilidad Total"
                        desc="Entiende el 'por qué' detrás de cada predicción con Insights detallados."
                        delay={0.6}
                    />
                </div>
            </main>

            {/* Insight Bot Floating */}
            <motion.div
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                className="hidden lg:block absolute bottom-0 right-0 z-0 pointer-events-none"
            >
                <img src={insightBot} alt="Insight Bot" className="w-[500px] h-auto object-contain opacity-80 drop-shadow-[0_0_50px_rgba(100,255,218,0.2)]" />
            </motion.div>
        </div>
    );
}

function Pillar({ icon, title, desc, delay }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay, duration: 0.5 }}
        >
            <Card className="h-full flex flex-col items-start gap-4 hover:-translate-y-2 transition-transform">
                <div className="p-3 bg-neon-cyan/10 rounded-lg">
                    {icon}
                </div>
                <h3 className="text-xl font-bold text-white">{title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                    {desc}
                </p>
            </Card>
        </motion.div>
    )
}

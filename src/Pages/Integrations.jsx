import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Shield, Zap, Globe, Cpu, Database, Server } from "lucide-react";

// Content updated for IT Solutions
const infrastructureNodes = [
  { id: 1, name: "Cloud Migration", status: "Scalable", icon: <Server size={24}/>, color: "#22d3ee" },
  { id: 2, name: "Cyber Security", status: "Encrypted", icon: <Shield size={24}/>, color: "#22d3ee" },
  { id: 3, name: "DevOps Pipeline", status: "Automated", icon: <Zap size={24}/>, color: "#22d3ee" },
  { id: 4, name: "Data Warehousing", status: "Optimized", icon: <Database size={24}/>, color: "#22d3ee" },
  { id: 5, name: "Network Edge", status: "Global", icon: <Globe size={24}/>, color: "#22d3ee" },
  { id: 6, name: "System Audit", status: "Certified", icon: <Cpu size={24}/>, color: "#22d3ee" },
];

export default function ITInfrastructureGrid() {
  const [hovered, setHovered] = useState(null);

  return (
    <section className="relative min-h-screen bg-white py-24 px-8 overflow-hidden font-sans">
      {/* Background Technical Grid */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
           style={{ backgroundImage: `radial-gradient(#000 1px, transparent 1px)`, backgroundSize: '30px 30px' }} />

      {/* Header Section */}
      <div className="max-w-7xl mx-auto mb-20">
        <div className="flex items-center gap-4 mb-4">
          <div className="h-px w-12 bg-black" />
          <span className="text-xs font-black uppercase tracking-[0.3em]">Enterprise IT Solutions</span>
        </div>
        <h2 className="text-7xl font-black uppercase tracking-tighter text-black leading-[0.85]">
          Architecting <br /> <span className="text-transparent" style={{ WebkitTextStroke: '1px black' }}>Digital Resiliency</span>
        </h2>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-[1fr_450px] gap-16 items-center">
        
        {/* LEFT SIDE: The Interactive Grid */}
        <div className="relative grid grid-cols-1 md:grid-cols-2 gap-4">
          {infrastructureNodes.map((item) => (
            <motion.div
              key={item.id}
              onMouseEnter={() => setHovered(item.id)}
              onMouseLeave={() => setHovered(null)}
              className={`relative group p-8 border-2 transition-all duration-300 cursor-crosshair overflow-hidden ${
                hovered === item.id ? "border-black bg-black text-white" : "border-black/10 bg-white text-black"
              }`}
            >
              <div className="relative z-10 flex justify-between items-start">
                <div>
                  <div className={`text-[10px] font-bold uppercase mb-2 tracking-widest ${hovered === item.id ? "text-cyan-400" : "text-black/30"}`}>
                    System_Layer_{item.id.toString().padStart(2, '0')}
                  </div>
                  <h3 className="text-2xl font-black uppercase tracking-tight">{item.name}</h3>
                </div>
                <div className={`transition-colors duration-300 ${hovered === item.id ? "text-cyan-400" : "text-black/20"}`}>
                  {item.icon}
                </div>
              </div>

              <div className="mt-8 flex items-center justify-between">
                <span className="text-xs font-mono opacity-50">Protocol: {item.status}</span>
                <div className={`w-2 h-2 rounded-full ${hovered === item.id ? "bg-cyan-400 animate-pulse shadow-[0_0_10px_#22d3ee]" : "bg-black/10"}`} />
              </div>

              {/* Decorative "Scanning" Line */}
              {hovered === item.id && (
                <motion.div 
                  initial={{ top: "-100%" }}
                  animate={{ top: "100%" }}
                  transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
                  className="absolute left-0 right-0 h-12 bg-gradient-to-b from-transparent via-cyan-400/20 to-transparent pointer-events-none"
                />
              )}
            </motion.div>
          ))}
        </div>

        {/* RIGHT SIDE: The "Mainframe" Reactor */}
        <div className="relative aspect-square flex items-center justify-center">
          {/* Static Outer Frame */}
          <div className="absolute inset-0 border-[12px] border-black/5 rounded-full" />
          
          {/* Rotating Data Ring */}
          <motion.div 
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
            className="absolute inset-8 border border-dashed border-black/20 rounded-full"
          />

          {/* The Core Box */}
          <div className="relative w-64 h-64 bg-white border-4 border-black shadow-[20px_20px_0px_#000] flex flex-col items-center justify-center p-6 transition-all duration-500">
            <AnimatePresence mode="wait">
              {hovered ? (
                <motion.div
                  key="active"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.1 }}
                  className="text-center flex flex-col items-center"
                >
                  <div className="text-cyan-500 mb-4 animate-bounce">
                    <Zap size={48} fill="currentColor" />
                  </div>
                  <div className="text-xs font-black uppercase tracking-[0.2em] mb-1">Tunnel Encrypted</div>
                  <div className="text-xl font-black uppercase text-cyan-500">System_Linked</div>
                </motion.div>
              ) : (
                <motion.div
                  key="idle"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center"
                >
                  <div className="text-xs font-black uppercase tracking-[0.2em] opacity-30">Uptime Nominal</div>
                  <div className="text-4xl font-black mt-2 tracking-tighter">99.9%</div>
                  <div className="text-[10px] font-mono mt-4 text-black/40">Monitoring Core...</div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Corner Brackets */}
            <div className="absolute top-2 left-2 w-4 h-4 border-t-2 border-l-2 border-black" />
            <div className="absolute bottom-2 right-2 w-4 h-4 border-b-2 border-r-2 border-black" />
          </div>

          {/* Connection "Wires" */}
          {hovered && (
            <div className="absolute inset-0 pointer-events-none">
              {[...Array(8)].map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: 0, y: 0 }}
                  animate={{ 
                    opacity: [0, 1, 0],
                    x: (Math.random() - 0.5) * 500,
                    y: (Math.random() - 0.5) * 500
                  }}
                  transition={{ repeat: Infinity, duration: 2.5, delay: i * 0.15 }}
                  className="absolute w-1 h-1 bg-cyan-400 rounded-full"
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Footer Info */}
      <div className="max-w-7xl mx-auto mt-32 flex justify-between items-end border-t-2 border-black pt-8">
        <p className="max-w-md text-sm font-bold leading-tight uppercase">
          Zero-Trust Security Architecture. <br />
          Full-Stack IT Managed Services.
        </p>
        <div className="text-right">
          <div className="text-xs font-mono opacity-40 uppercase">Bandwidth</div>
          <div className="text-2xl font-black tracking-tighter">10.0 Gbps</div>
        </div>
      </div>
    </section>
  );
}
import React, { useState } from "react";
import { 
  ResponsiveContainer, 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip 
} from "recharts";
import { 
  LayoutDashboard, 
  TrendingUp, 
  Users, 
  Settings, 
  Search, 
  Bell, 
  User, 
  RefreshCw 
} from "lucide-react";

// 1. Importación del componente modularizado
import KpiCard from "./components/KpiCard";

const DATOS_TABLA_INICIALES = [
  { nombre: "Registro Alpha", status: "Active", badge: "bg-emerald-50 text-emerald-700 border-emerald-200" },
  { nombre: "Registro Beta", status: "Pending", badge: "bg-amber-50 text-amber-700 border-amber-200" },
  { nombre: "Registro Gamma", status: "Active", badge: "bg-emerald-50 text-emerald-700 border-emerald-200" },
  { nombre: "Registro Delta", status: "Inactive", badge: "bg-neutral-100 text-neutral-600 border-neutral-200" },
  { nombre: "Registro Epsilon", status: "Active", badge: "bg-emerald-50 text-emerald-700 border-emerald-200" },
];

export default function App() {
  const [metricas, setMetricas] = useState([
    { id: "kpi-1", label: "KPI Metric", valor: 24.5, prefijo: "$", sufijo: "k", cambio: "+20%", esPositivo: true },
    { id: "kpi-2", label: "KPI Metric", valor: 12.8, prefijo: "$", sufijo: "k", cambio: "-5%", esPositivo: false },
    { id: "kpi-3", label: "KPI Metric", valor: 340, prefijo: "", sufijo: "+", cambio: "+10%", esPositivo: true },
    { id: "kpi-4", label: "KPI Metric", valor: 1250, prefijo: "", sufijo: "+", cambio: "+30%", esPositivo: true },
  ]);

  const [datosGrafico, setDatosGrafico] = useState([
    { name: "Ene", metricaA: 400, metricaB: 240 },
    { name: "Feb", metricaA: 300, metricaB: 139 },
    { name: "Mar", metricaA: 600, metricaB: 480 },
    { name: "Abr", metricaA: 800, metricaB: 390 },
    { name: "May", metricaA: 700, metricaB: 480 },
    { name: "Jun", metricaA: 1100, metricaB: 680 },
  ]);

  // REQUERIMIENTO 3: Estado de búsqueda en la tabla
  const [busqueda, setBusqueda] = useState("");

  // REQUERIMIENTO 2: Actualización inmutable usando el estado previo (prev => ...)
  const handleActualizarDatos = () => {
    setMetricas(prevMetricas =>
      prevMetricas.map(item => {
        const factor = 0.85 + Math.random() * 0.3;
        const nuevoValor = +(item.valor * factor).toFixed(1);
        const cambioCalculado = Math.floor((factor - 1) * 100);

        return {
          ...item,
          valor: item.sufijo === "+" ? Math.round(nuevoValor) : nuevoValor,
          cambio: `${cambioCalculado >= 0 ? "+" : ""}${cambioCalculado}%`,
          esPositivo: cambioCalculado >= 0,
        };
      })
    );

    setDatosGrafico(prevDatos =>
      prevDatos.map(punto => ({
        ...punto,
        metricaA: Math.floor(punto.metricaA * (0.8 + Math.random() * 0.4)),
        metricaB: Math.floor(punto.metricaB * (0.8 + Math.random() * 0.4)),
      }))
    );
  };

  // REQUERIMIENTO 3: Filtro dinámico con .filter()
  const filasFiltradas = DATOS_TABLA_INICIALES.filter(row =>
    row.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
    row.status.toLowerCase().includes(busqueda.toLowerCase())
  );

  return (
    <div className="flex min-h-screen bg-neutral-100 font-sans text-neutral-800">
      
      {/* SECCIÓN 1: Sidebar */}
      <aside className="w-64 border-r border-neutral-300 bg-white p-6 flex flex-col justify-between">
        <div>
          <div className="flex items-center gap-3 mb-8">
            <div className="h-9 w-9 rounded-lg border-2 border-neutral-800 flex items-center justify-center font-bold">
              ✕
            </div>
            <div className="h-4 w-24 bg-neutral-300 rounded"></div>
          </div>

          <div className="h-4 w-28 bg-neutral-200 rounded mb-6"></div>

          <nav className="flex flex-col gap-2">
            <button className="flex items-center gap-3 px-3 py-2 text-sm font-semibold text-neutral-900 bg-neutral-200/70 rounded-md text-left">
              <LayoutDashboard size={18} />
              Dashboard
            </button>
            <button className="flex items-center gap-3 px-3 py-2 text-sm font-medium text-neutral-600 hover:bg-neutral-100 rounded-md text-left">
              <TrendingUp size={18} />
              Analytics
            </button>
            <button className="flex items-center gap-3 px-3 py-2 text-sm font-medium text-neutral-600 hover:bg-neutral-100 rounded-md text-left">
              <Users size={18} />
              Users
            </button>
            <button className="flex items-center gap-3 px-3 py-2 text-sm font-medium text-neutral-600 hover:bg-neutral-100 rounded-md text-left">
              <Settings size={18} />
              Settings
            </button>
          </nav>
        </div>

        <div className="flex items-center gap-3 pt-4 border-t border-neutral-200">
          <div className="h-8 w-8 rounded border border-neutral-400 flex items-center justify-center text-xs">✕</div>
          <div className="h-3 w-20 bg-neutral-300 rounded"></div>
        </div>
      </aside>

      {/* ÁREA CENTRAL */}
      <div className="flex-1 flex flex-col min-w-0">
        
        {/* SECCIÓN 2: Navbar */}
        <header className="h-16 border-b border-neutral-300 bg-white px-8 flex items-center justify-between">
          <div className="h-4 w-20 bg-neutral-300 rounded"></div>

          <div className="flex items-center gap-4">
            <button
              onClick={handleActualizarDatos}
              className="flex items-center gap-2 bg-neutral-900 hover:bg-neutral-800 text-white text-xs font-medium px-3 py-1.5 rounded shadow-sm transition-colors"
            >
              <RefreshCw size={14} />
              Actualizar Datos
            </button>

            <div className="flex items-center gap-3 text-neutral-600">
              <button className="p-1 hover:text-neutral-900" aria-label="Notificaciones"><Bell size={18} /></button>
              <button className="p-1 hover:text-neutral-900" aria-label="Usuario"><User size={18} /></button>
              <div className="h-3 w-12 bg-neutral-300 rounded"></div>
            </div>
          </div>
        </header>

        {/* SECCIÓN 3: Grid de Contenido */}
        <main className="p-8 flex flex-col gap-6">
          
          {/* REQUERIMIENTO 1: Renderizado del componente KpiCard mediante props (...) */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {metricas.map(kpi => (
              <KpiCard key={kpi.id} {...kpi} />
            ))}
          </div>

          {/* Bento Grid: Gráfico + Tabla */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            
            {/* Gráfica Recharts */}
            <article className="lg:col-span-7 bg-white border border-neutral-300 rounded-xl p-5 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-sm font-bold text-neutral-800">Line Chart</h3>
                  <span className="text-xs text-neutral-400 font-mono">Label: Métricas temporales</span>
                </div>
                <div className="flex items-center gap-2 border border-neutral-300 rounded-md px-2 py-1 w-32">
                  <Search size={14} className="text-neutral-400" />
                  <input type="text" placeholder="Filtrar..." className="w-full text-xs outline-none bg-transparent" />
                </div>
              </div>

              <div className="h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={datosGrafico}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                    <XAxis dataKey="name" tick={{ fontSize: 12 }} stroke="#a3a3a3" />
                    <YAxis tick={{ fontSize: 12 }} stroke="#a3a3a3" />
                    <Tooltip />
                    <Line type="monotone" dataKey="metricaA" stroke="#171717" strokeWidth={2} dot={{ r: 3 }} />
                    <Line type="monotone" dataKey="metricaB" stroke="#737373" strokeWidth={2} dot={{ r: 3 }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
              <p className="text-center text-xs text-neutral-400 mt-2 font-mono">Chart Overview</p>
            </article>

            {/* Tabla de Datos */}
            <article className="lg:col-span-5 bg-white border border-neutral-300 rounded-xl p-5 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-bold text-neutral-800">Data Table</h3>
                
                {/* REQUERIMIENTO 3: Input de búsqueda vinculado a busqueda */}
                <div className="flex items-center gap-2 border border-neutral-300 rounded-md px-2 py-1 w-36">
                  <Search size={14} className="text-neutral-400" />
                  <input 
                    type="text" 
                    placeholder="Buscar..." 
                    value={busqueda}
                    onChange={(e) => setBusqueda(e.target.value)}
                    className="w-full text-xs outline-none bg-transparent" 
                  />
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="border-b border-neutral-200 text-neutral-400 uppercase text-[10px]">
                      <th className="pb-2 font-medium">Elemento</th>
                      <th className="pb-2 font-medium text-right">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-neutral-100">
                    {filasFiltradas.length > 0 ? (
                      filasFiltradas.map((row, idx) => (
                        <tr key={idx} className="hover:bg-neutral-50/50">
                          <td className="py-2.5 font-medium text-neutral-700">{row.nombre}</td>
                          <td className="py-2.5 text-right">
                            <span className={`inline-block px-2 py-0.5 text-[10px] rounded-full border ${row.badge}`}>
                              {row.status}
                            </span>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={2} className="py-4 text-center text-neutral-400 font-medium">
                          No se encontraron resultados
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>

              <div className="flex items-center justify-between pt-4 mt-2 border-t border-neutral-100 text-[11px] text-neutral-400">
                <div className="h-2 w-12 bg-neutral-200 rounded"></div>
                <div className="flex gap-1">
                  <button className="h-5 w-5 border border-neutral-300 rounded flex items-center justify-center hover:bg-neutral-100">&lt;</button>
                  <button className="h-5 w-5 border border-neutral-300 rounded flex items-center justify-center bg-neutral-900 text-white">1</button>
                  <button className="h-5 w-5 border border-neutral-300 rounded flex items-center justify-center hover:bg-neutral-100">&gt;</button>
                </div>
              </div>
            </article>

          </div>
        </main>
      </div>
    </div>
  );
}
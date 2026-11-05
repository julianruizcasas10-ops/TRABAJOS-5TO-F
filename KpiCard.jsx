import React from "react";
import { ArrowUpRight, ArrowDownRight } from "lucide-react";

export default function KpiCard({ label, valor, prefijo, sufijo, cambio, esPositivo }) {
  return (
    <article className="bg-white border border-neutral-300 rounded-xl p-5 shadow-sm flex flex-col justify-between">
      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold text-neutral-500 uppercase tracking-wider">
          {label}
        </span>
        <div className="h-6 w-6 border border-neutral-300 rounded flex items-center justify-center text-xs text-neutral-400">
          ✕
        </div>
      </div>

      <div className="my-2">
        <span className="text-3xl font-extrabold tracking-tight text-neutral-900">
          {prefijo}{valor}{sufijo}
        </span>
      </div>

      <div className="flex items-center justify-between pt-1">
        <div className={`flex items-center gap-1 text-xs font-semibold ${esPositivo ? "text-emerald-600" : "text-rose-600"}`}>
          {esPositivo ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
          <span>{cambio}</span>
        </div>
        <div className="h-5 w-5 border border-neutral-200 rounded flex items-center justify-center text-[10px] text-neutral-400">
          ✕
        </div>
      </div>
    </article>
  );
}
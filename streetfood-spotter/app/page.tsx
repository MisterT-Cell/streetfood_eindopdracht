import Link from "next/link";
import { Search, Compass, Share2, ChevronDown, Plus, ArrowRight } from "lucide-react";

export default function Home() {
  return (
    <div>

      {/* ─── Hero sectie ─── */}
      <section className="relative min-h-screen bg-emerald-950 overflow-hidden flex flex-col items-center justify-center text-white px-6 text-center">

        {/* Mesh blobs */}
        <div className="absolute -top-40 -left-40 w-[700px] h-[700px] bg-teal-500/20 rounded-full blur-[130px] pointer-events-none" />
        <div className="absolute -bottom-40 -right-40 w-[600px] h-[600px] bg-emerald-500/20 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute top-1/3 right-1/4 w-[350px] h-[350px] bg-cyan-400/10 rounded-full blur-[90px] pointer-events-none" />

        <div className="relative max-w-3xl z-10">

          <p className="animate-fade-up anim-delay-1 inline-block text-xs font-semibold uppercase tracking-[0.2em] text-emerald-300 border border-emerald-700 px-4 py-1.5 rounded-full mb-7">
            Ontdek streetfood bij jou in de buurt
          </p>

          <h1 className="animate-fade-up anim-delay-2 text-5xl sm:text-7xl font-extrabold mb-6 leading-[1.1] tracking-tight">
            Vind de beste
            <br />
            <span className="text-transparent bg-clip-text bg-linear-to-r from-emerald-300 to-teal-300">
              streetfood spots!
            </span>
          </h1>

          <p className="animate-fade-up anim-delay-3 text-lg sm:text-xl mb-10 text-slate-300 max-w-xl mx-auto leading-relaxed">
            Van sushi tot taco&apos;s, bubble tea tot bao buns — ontdek verborgen
            eetgelegenheden en voeg jouw favoriete plek toe.
          </p>

          <div className="animate-fade-up anim-delay-4 flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/spots"
              className="inline-flex items-center justify-center gap-2 bg-emerald-500 text-white font-bold text-base px-9 py-4 rounded-full hover:bg-emerald-400 hover:scale-105 hover:shadow-[0_0_40px_rgba(52,211,153,0.4)] transition-all duration-300"
            >
              Bekijk spots
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/add-spot"
              className="inline-flex items-center justify-center gap-2 border border-white/25 bg-white/10 backdrop-blur-sm text-white font-semibold text-base px-9 py-4 rounded-full hover:bg-white/20 hover:border-white/40 transition-all duration-300"
            >
              <Plus className="w-4 h-4" />
              Voeg een spot toe
            </Link>
          </div>

        </div>

        <div className="absolute bottom-8 text-white/30 animate-bounce select-none">
          <ChevronDown className="w-6 h-6" />
        </div>

      </section>

      {/* ─── Hoe werkt het ─── */}
      <section className="bg-white py-24 px-6">
        <div className="max-w-5xl mx-auto">

          <p className="text-center text-xs font-semibold uppercase tracking-widest text-emerald-500 mb-3">
            Simpel en snel
          </p>
          <h2 className="text-4xl font-extrabold text-center text-slate-900 mb-16 tracking-tight">
            Hoe werkt het?
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">

            <div className="p-px rounded-2xl bg-linear-to-br from-emerald-200 to-teal-200">
              <div className="bg-white rounded-2xl p-8 h-full text-center hover:bg-emerald-50/50 transition-colors duration-200">
                <div className="w-14 h-14 bg-emerald-50 rounded-2xl flex items-center justify-center mb-5 mx-auto ring-1 ring-emerald-100">
                  <Search className="w-7 h-7 text-emerald-600" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">Zoek</h3>
                <p className="text-slate-500 text-sm leading-relaxed">
                  Zoek op naam of locatie en vind snel de spot die je zoekt.
                </p>
              </div>
            </div>

            <div className="p-px rounded-2xl bg-linear-to-br from-teal-200 to-cyan-200">
              <div className="bg-white rounded-2xl p-8 h-full text-center hover:bg-teal-50/50 transition-colors duration-200">
                <div className="w-14 h-14 bg-teal-50 rounded-2xl flex items-center justify-center mb-5 mx-auto ring-1 ring-teal-100">
                  <Compass className="w-7 h-7 text-teal-600" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">Ontdek</h3>
                <p className="text-slate-500 text-sm leading-relaxed">
                  Bekijk foto&apos;s, locaties en video&apos;s van de beste streetfood plekken.
                </p>
              </div>
            </div>

            <div className="p-px rounded-2xl bg-linear-to-br from-cyan-200 to-emerald-200">
              <div className="bg-white rounded-2xl p-8 h-full text-center hover:bg-cyan-50/50 transition-colors duration-200">
                <div className="w-14 h-14 bg-cyan-50 rounded-2xl flex items-center justify-center mb-5 mx-auto ring-1 ring-cyan-100">
                  <Share2 className="w-7 h-7 text-cyan-600" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">Deel</h3>
                <p className="text-slate-500 text-sm leading-relaxed">
                  Ken je een geweldige spot? Voeg hem toe zodat anderen hem ook vinden.
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ─── Onderkant CTA ─── */}
      <section className="bg-slate-50 py-20 px-6 border-t border-slate-100">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl font-extrabold text-slate-900 mb-4 tracking-tight">
            Ken jij een verborgen pareltje?
          </h2>
          <p className="text-slate-500 mb-8 leading-relaxed">
            Help de community door jouw favoriete streetfood spot toe te voegen.
          </p>
          <Link
            href="/add-spot"
            className="inline-flex items-center gap-2 bg-emerald-600 text-white font-bold px-10 py-4 rounded-full hover:bg-emerald-500 hover:-translate-y-1 hover:shadow-xl transition-all duration-300"
          >
            <Plus className="w-4 h-4" />
            Spot toevoegen
          </Link>
        </div>
      </section>

    </div>
  );
}

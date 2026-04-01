import db from "@/lib/db";
import { redirect } from "next/navigation";
import { AlertCircle, ArrowRight } from "lucide-react";

async function addSpot(formData: FormData) {
  "use server";

  const naam = formData.get("naam") as string;
  const soort_eten = formData.get("soort_eten") as string;
  const locatie = formData.get("locatie") as string;
  const omschrijving = formData.get("omschrijving") as string;
  const afbeelding = formData.get("afbeelding_url") as string;
  const tiktok_url = formData.get("tiktok_url") as string;
  const google_maps_url = formData.get("google_maps_url") as string;

  if (!tiktok_url && !google_maps_url) {
    redirect("/add-spot?error=media");
  }

  db.prepare(`
    INSERT INTO spots (naam, soort_eten, locatie, omschrijving, afbeelding_url, tiktok_url, google_maps_url)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `).run(naam, soort_eten, locatie, omschrijving, afbeelding, tiktok_url || null, google_maps_url || null);

  redirect("/spots");
}

const inputClass =
  "w-full bg-white border border-slate-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 text-slate-800 px-4 py-3 text-sm rounded-xl focus:outline-none transition-all duration-200 placeholder-slate-400";

export default async function AddSpotPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const { error } = await searchParams;

  return (
    <div className="min-h-screen bg-slate-50">

      {/* ─── Header ─── */}
      <div className="bg-emerald-950 relative overflow-hidden px-6 sm:px-12 lg:px-24 py-16">
        <div className="absolute -top-20 -left-20 w-100 h-100 bg-teal-500/20 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute -bottom-20 -right-20 w-87.5 h-87.5 bg-emerald-500/15 rounded-full blur-[90px] pointer-events-none" />
        <div className="relative z-10">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-300 mb-3">Bijdragen</p>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
            Spot toevoegen
          </h1>
        </div>
      </div>

      {/* ─── Formulier ─── */}
      <div className="max-w-2xl mx-auto px-6 sm:px-12 py-12">

        {error === "media" && (
          <div className="flex items-start gap-3 bg-red-50 border border-red-200 text-red-700 text-sm px-5 py-4 rounded-xl mb-8">
            <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" />
            <span>
              Vul minimaal een <strong>TikTok-URL</strong> of <strong>Google Maps-URL</strong> in.
            </span>
          </div>
        )}

        <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-8 sm:p-10">
          <form action={addSpot} className="space-y-6">

            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-emerald-600 mb-5">
                Basisinformatie
              </p>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2" htmlFor="naam">
                    Naam <span className="text-red-400">*</span>
                  </label>
                  <input id="naam" name="naam" placeholder="bijv. Bao Boys" required className={inputClass} />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2" htmlFor="soort_eten">
                    Soort eten <span className="text-red-400">*</span>
                  </label>
                  <input id="soort_eten" name="soort_eten" placeholder="bijv. Taco's, Sushi, Pizza" required className={inputClass} />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2" htmlFor="locatie">
                    Locatie <span className="text-red-400">*</span>
                  </label>
                  <input id="locatie" name="locatie" placeholder="bijv. Amsterdam, Rotterdam" required className={inputClass} />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2" htmlFor="omschrijving">
                    Omschrijving
                  </label>
                  <textarea
                    id="omschrijving"
                    name="omschrijving"
                    placeholder="Vertel iets over deze spot..."
                    rows={4}
                    className={`${inputClass} resize-none`}
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2" htmlFor="afbeelding_url">
                    Afbeelding URL
                  </label>
                  <input id="afbeelding_url" name="afbeelding_url" placeholder="https://..." className={inputClass} />
                </div>
              </div>
            </div>

            <div className="border-t border-slate-100 pt-6">
              <p className="text-xs font-semibold uppercase tracking-widest text-emerald-600 mb-1">
                Media
              </p>
              <p className="text-xs text-slate-400 mb-5">Vul er minimaal één in</p>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2" htmlFor="tiktok_url">
                    TikTok URL
                  </label>
                  <input id="tiktok_url" name="tiktok_url" placeholder="https://www.tiktok.com/@.../video/..." className={inputClass} />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2" htmlFor="google_maps_url">
                    Google Maps URL
                  </label>
                  <input id="google_maps_url" name="google_maps_url" placeholder="https://maps.google.com/..." className={inputClass} />
                </div>
              </div>
            </div>

            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 bg-emerald-600 text-white font-bold py-4 rounded-2xl text-sm hover:bg-emerald-500 hover:-translate-y-0.5 hover:shadow-lg active:scale-95 transition-all duration-200"
            >
              Spot toevoegen
              <ArrowRight className="w-4 h-4" />
            </button>

          </form>
        </div>
      </div>

    </div>
  );
}

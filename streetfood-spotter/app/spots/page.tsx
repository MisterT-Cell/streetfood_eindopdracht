import db from "@/lib/db";
import Link from "next/link";
import SearchInput from "@/app/components/SearchInput";


function extractVideoId(url: string): string | null {
  const match = url.match(/video\/(\d+)/);
  return match ? match[1] : null;
}

export default async function SpotsPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q } = await searchParams;

  const spots = q
    ? db.prepare("SELECT * FROM spots WHERE naam LIKE ? OR locatie LIKE ?").all(`%${q}%`, `%${q}%`)
    : db.prepare("SELECT * FROM spots").all();

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Alle streetfood spots</h1>

      {/* Zoekbalk — Client Component */}
      <SearchInput defaultValue={q || ""} />

      {spots.length === 0 ? (
        <p className="text-gray-500 text-center mt-12">
          Geen spots gevonden.{" "}
          <Link href="/add-spot" className="text-orange-500 underline">
            Voeg er een toe!
          </Link>
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {spots.map((spot: any) => {
            const videoId = spot.tiktok_url ? extractVideoId(spot.tiktok_url) : null;

            return (
              <div
                key={spot.id}
                className="bg-white rounded-2xl shadow-md overflow-hidden transform transition-transform duration-300 hover:scale-105 hover:rotate-1"
              >
                {/* Afbeelding */}
                {spot.afbeelding_url && (
                  <img
                    src={spot.afbeelding_url}
                    alt={spot.naam}
                    className="w-full h-48 object-cover"
                  />
                )}

                <div className="p-4">
                  <h2 className="text-xl font-bold text-gray-800">{spot.naam}</h2>
                  <p className="text-sm text-orange-500 font-medium">{spot.soort_eten}</p>
                  <p className="text-sm text-gray-500 mt-1">📍 {spot.locatie}</p>

                  {/* Media: TikTok embed OF Google Maps link */}
                  <div className="mt-3">
                    {videoId ? (
                      <iframe
                        src={`https://www.tiktok.com/embed/${videoId}`}
                        className="w-full aspect-[9/16] rounded-lg"
                        allow="autoplay; encrypted-media"
                      />
                    ) : spot.google_maps_url ? (
                      <a
                        href={spot.google_maps_url}
                        target="_blank"
                        className="block text-blue-500 mt-2 underline"
                      >
                        Bekijk op Google Maps
                      </a>
                    ) : (
                      <p className="text-sm text-gray-400">Geen media beschikbaar</p>
                    )}
                  </div>

                  {/* Knop naar detailpagina */}
                  <Link
                    href={`/spots/${spot.id}`}
                    className="mt-4 block text-center bg-orange-500 text-white py-2 rounded-full hover:bg-orange-600 transition"
                  >
                    Meer info
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

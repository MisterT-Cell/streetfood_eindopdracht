import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-400 to-red-500 flex items-center justify-center text-white px-6">
      <div className="text-center max-w-2xl">

        <h1 className="text-5xl font-extrabold mb-6 drop-shadow-lg">
          Vind de beste streetfood spots!
        </h1>

        <p className="text-xl mb-10 opacity-90">
          Ontdek verborgen eetgelegenheden bij jou in de buurt.
          Van sushi tot burgers, bubble tea tot vegan - Alles op één plek!
        </p>

        <Link href="/spots" className="inline-block bg-white text-orange-500 font-bold text-lg px-10 py-4 rounded-full hover:scale-105 hover:shadow-2xl transition-transform duration-300">
          Ontdek de spots
        </Link>

      </div>
    </div>
  )
}
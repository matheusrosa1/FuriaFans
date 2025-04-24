import FanCard, { FanCardProps } from "../../components/FanCard";
import Link from "next/link";


const mockFans: FanCardProps[] = [
  {
    name: "Lucas Matador",
    favoriteGame: "CS:GO",
    fanLevel: "hardcore",
    photoUrl: "https://ui-avatars.com/api/?name=Lucas+Matador&background=random"
  },
  {
    name: "Bia Rush",
    favoriteGame: "Valorant",
    fanLevel: "engaged",
    photoUrl: "https://ui-avatars.com/api/?name=Bia+Rush&background=random"
  },
  {
    name: "João Chill",
    favoriteGame: "League of Legends",
    fanLevel: "casual",
    photoUrl: "https://ui-avatars.com/api/?name=Joao+Chill&background=random"
  },
];

export default function HomePage() {
  return (
    <main className="p-6 bg-gray-100 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Fãs da FURIA 💜</h1>
        <Link
          href="/new"
          className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
        >
          + Novo Fã
        </Link>
      </div>

      <div className="flex flex-wrap gap-4">
        {mockFans.map((fan, index) => (
          <FanCard key={index} {...fan} />
        ))}
      </div>
    </main>
  );
}
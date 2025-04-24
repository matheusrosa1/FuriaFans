import FanCard, { FanCardProps } from "../../components/FanCard";


const mockFans: FanCardProps[] = [
  { name: "Lucas Matador", favoriteGame: "CS:GO", fanLevel: "hardcore" },
  { name: "Bia Rush", favoriteGame: "Valorant", fanLevel: "engaged" },
  { name: "João Chill", favoriteGame: "League of Legends", fanLevel: "casual" },
];

export default function HomePage() {
  return (
    <main className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Fãs da FURIA 💜</h1>
      <div className="flex flex-wrap gap-4">
        {mockFans.map((fan, index) => (
          <FanCard key={index} {...fan} />
        ))}
      </div>
    </main>
  );
}

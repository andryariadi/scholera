import { Ellipsis } from "lucide-react";

const UserCard = ({ type }: { type: string }) => {
  return (
    <div className="min-w-32.5 flex-1 p-3 rounded-2xl space-y-3 odd:bg-scholera-purple even:bg-scholera-yellow">
      <div className="flex justify-between items-center">
        <span className="text-[10px] bg-white px-2 py-1 rounded-full text-green-600">2024/25</span>

        <Ellipsis size={16} />
      </div>

      <h1 className="text-2xl text-gray-900/90 font-semibold">1,234</h1>

      <h2 className="capitalize text-sm font-medium text-gray-500">{type}s</h2>
    </div>
  );
};

export default UserCard;

import { getAnnouncements } from "@/libs/data/fetch-announcement";
import { formatDateISO } from "@/libs/utils";

// const bgVariant: Record<string, string> = {
//   sky: "bg-scholera-sky-light",
//   purple: "bg-scholera-purple-light",
//   yellow: "bg-scholera-yellow-light",
// };

const Announcements = async () => {
  const announcements = await getAnnouncements();

  return (
    <div className="bg-white shadow-xs p-4 rounded-md space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">Announcements</h1>
        <span className="text-xs text-gray-400 cursor-pointer hover:underline">View All</span>
      </div>

      {/* List */}
      <div className="flex flex-col gap-4">
        {announcements.map((item) => (
          <div key={item.id} className={`rounded-md p-4 odd:bg-scholera-sky-light even:bg-scholera-purple-light space-y-2`}>
            <div className="flex items-center justify-between">
              <h2 className="font-medium text-gray-800 text-xs md:text-base">{item.title}</h2>
              <span className="text-[10px] md:text-xs text-gray-400 bg-white rounded-md px-2 py-1">{formatDateISO(item.date)}</span>
            </div>

            <p className="text-xs md:text-sm text-gray-500">{item.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Announcements;

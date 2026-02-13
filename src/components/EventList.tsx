import prisma from "@/libs/config/prisma";

const EventList = async ({ searchParams }: { searchParams: Promise<{ date?: string }> }) => {
  const params = (await searchParams).date;

  const date = params ? new Date(params) : new Date();

  const events = await prisma.event.findMany({
    where: {
      startTime: {
        gte: new Date(date.setHours(0, 0, 0, 0)),
        lte: new Date(date.setHours(23, 59, 59, 999)),
      },
    },
  });

  return (
    <>
      {events.map((event) => (
        <div className="p-5 rounded-md border-2 border-gray-100 border-t-4 odd:border-t-scholera-sky even:border-t-scholera-purple" key={event.id}>
          {/* Event info */}
          <div className="flex items-center justify-between">
            <h1 className="font-semibold text-gray-600 text-sm md:text-base">{event.title}</h1>
            <span className="text-gray-300 text-xs">
              {event.startTime.toLocaleTimeString("en-UK", {
                hour: "2-digit",
                minute: "2-digit",
                hour12: false,
              })}
            </span>
          </div>

          {/* Event description */}
          <p className="mt-2 text-gray-400 text-xs md:text-sm">{event.description}</p>
        </div>
      ))}
    </>
  );
};

export default EventList;

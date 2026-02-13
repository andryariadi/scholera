import prisma from "@/libs/config/prisma";
import { UserRole } from "@/libs/types/prisma-schema";
import { Ellipsis } from "lucide-react";
import { connection } from "next/server";

type PrismaModel = {
  count: () => Promise<number>;
};

const UserCard = async ({ type }: { type: UserRole }) => {
  await connection();

  const modelMap: Record<UserRole, PrismaModel> = {
    admin: prisma.admin,
    teacher: prisma.teacher,
    student: prisma.student,
    parent: prisma.parent,
  };

  const count = await modelMap[type].count();

  return (
    <div className="min-w-32.5 flex-1 p-3 rounded-2xl space-y-3 odd:bg-scholera-purple even:bg-scholera-yellow shadow-xs">
      <div className="flex justify-between items-center">
        <span className="text-[10px] bg-white px-2 py-1 rounded-full text-green-600">2024/25</span>

        <Ellipsis size={16} />
      </div>

      <h1 className="text-2xl text-gray-900/90 font-semibold">{count}</h1>

      <h2 className="capitalize text-sm font-medium text-gray-500">{type}s</h2>
    </div>
  );
};

export default UserCard;

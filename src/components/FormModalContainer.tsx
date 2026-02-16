import prisma from "@/libs/config/prisma";
import FormModal from "./FormModal";

const FormModalContainer = async <T,>({ table, type, data, id }: FormModal<T>) => {
  let relateData = {} as T;

  if (type !== "delete") {
    switch (table) {
      case "subject":
        const subjectTeachers = await prisma.teacher.findMany({
          select: { id: true, name: true, surname: true },
        });
        relateData = { teachers: subjectTeachers } as T;
        break;
      case "class":
        const classGrades = await prisma.grade.findMany({
          select: { id: true, level: true },
        });

        const classTeachers = await prisma.teacher.findMany({
          select: { id: true, name: true, surname: true },
        });

        relateData = { teachers: classTeachers, grades: classGrades } as T;
        break;
      default:
        break;
    }
  }

  return (
    <>
      <FormModal table={table} type={type} data={data} id={id} relateData={relateData} />
    </>
  );
};

export default FormModalContainer;

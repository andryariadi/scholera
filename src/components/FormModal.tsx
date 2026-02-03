"use client";

import { Plus, SquarePen, Trash2, X } from "lucide-react";
import dynamic from "next/dynamic";
import React, { useState } from "react";
// import TeacherForm from "./forms/TeacherFormModal";
// import StudentForm from "./forms/StudentFormModal";

const TeacherForm = dynamic(() => import("./forms/TeacherFormModal"), {
  loading: () => <p>Loading...</p>,
});
const StudentForm = dynamic(() => import("./forms/StudentFormModal"), {
  loading: () => <p>Loading...</p>,
});

const forms: {
  [key: string]: (type: "create" | "update", data?: any) => React.JSX.Element;
} = {
  teacher: (type, data) => <TeacherForm type={type} data={data} />,
  student: (type, data) => <StudentForm type={type} data={data} />,
};

const Form = <T,>({ table, type, data, id }: { type: "create" | "update" | "delete"; table: string; data: T; id?: string | number }) => {
  return type === "delete" && id ? (
    // Form to delete:
    <form className="p-4 flex flex-col gap-4">
      <span className="text-center font-medium">All data will be lost. Are you sure you want to delete this {table}?</span>

      <button className="text-white py-2 px-4 rounded-md border-none w-max self-center">Delete</button>
    </form>
  ) : type === "create" || type === "update" ? (
    forms[table](type, data)
  ) : (
    "Form not found!"
  );
};

const FormModal = <T,>({ table, type, data, id }: FormModal<T>) => {
  const [open, setOpen] = useState(false);

  const size = type === "create" ? "w-8 h-8" : "w-7 h-7";

  const bgColor = type === "create" ? "bg-scholera-yellow" : type === "update" ? "bg-scholera-sky" : "bg-scholera-purple";

  return (
    <>
      {/* Button */}
      <button className={`flex items-center justify-center rounded-full ${size} ${bgColor}`} onClick={() => setOpen(true)}>
        {type === "create" && <Plus size={14} />}
        {type === "update" && <SquarePen size={14} />}
        {type === "delete" && <Trash2 size={14} />}
      </button>

      {/* Modal */}
      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center
  bg-white/5 backdrop-blur-sm backdrop-saturate-150 transition-opacity duration-300 ease-out
    opacity-100"
        >
          <div
            className="bg-white max-h-[90vh]
      overflow-y-auto p-4 rounded-md shadow-lg relative w-[90%] md:w-[70%] lg:w-[60%] xl:w-[50%] 2xl:w-[40%] transform transition-all duration-300 ease-out
      scale-100 opacity-100 sidebar"
          >
            <Form table={table} type={type} data={data} id={id} />

            {/* Close button */}
            <div className="absolute top-2.5 right-4 cursor-pointer" onClick={() => setOpen(false)}>
              <X size={14} />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default FormModal;

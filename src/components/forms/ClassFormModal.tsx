"use client";

import { classInput, classSchema } from "@/libs/validations";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import InputField from "../InputField";
import { Loader } from "lucide-react";
import { toast } from "react-toastify";
import { createClass, updateClass } from "@/libs/actions/class.action";

interface ClassFormProps {
  type: "create" | "update";
  data?: (
    | classInput
    | {
        name: string;
        capacity: number;
        gradeId: string;
        supervisorId?: string;
      }
  ) & { id?: string };
  relateData?: {
    teachers: Array<{ id: string; name: string; surname: string }>;
    grades: Array<{ id: string; level: string }>;
  };
  handleCloseModal?: () => void;
}

const ClassForm = ({ type, data, relateData, handleCloseModal }: ClassFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    control,
  } = useForm<classInput>({
    resolver: zodResolver(classSchema),
    defaultValues: {
      name: data?.name || "",
      capacity: data?.capacity || 0,
      gradeId: data?.gradeId || "",
      supervisorId: data?.supervisorId || "",
    },
  });

  const handleSubmitClass: SubmitHandler<classInput> = async (inputData) => {
    console.log({ inputData });

    try {
      let res;

      if (type === "create") {
        res = await createClass(inputData);
      } else if (type === "update" && data?.id) {
        res = await updateClass(data.id, inputData);
      } else {
        toast.error("Invalid operation");
        return;
      }

      console.log({ res });

      if (res?.success) {
        toast.success(`Class ${res.data.name} ${type === "create" ? "created" : "updated"} successfully`);
        reset();
        handleCloseModal?.();
      } else {
        toast.error(res?.error || "An error occurred");
      }
    } catch (error) {
      console.error("Form submission error:", error);
      toast.error("An unexpected error occurred");
    }
  };

  return (
    <form onSubmit={handleSubmit(handleSubmitClass)} className="flex flex-col gap-5">
      <h1 className="text-xl font-semibold">{type === "create" ? "Create a new class" : "Update class"}</h1>

      <div className="space-y-3">
        <div className="grid grid-cols-1 gap-6">
          {/* Name */}
          <InputField label="Class name" name="name" defaultValue={data?.name} register={register} error={errors?.name} />

          {/* Capacity */}
          <InputField label="Capacity" name="capacity" type="number" defaultValue={data?.capacity} register={register} error={errors?.capacity} registerOptions={{ valueAsNumber: true }} />

          {/* Grade */}
          <div className="w-full flex flex-col gap-2">
            <label className="text-xs text-gray-500">Grade</label>

            {relateData?.grades && relateData.grades.length > 0 ? (
              <Controller
                name="gradeId"
                control={control}
                render={({ field }) => (
                  <>
                    <select
                      className={`ring-[1.5px] ${errors.gradeId ? "ring-red-400" : "ring-gray-300"} p-2 rounded-md text-sm w-full focus:ring-2 focus:ring-blue-400 focus:outline-none`}
                      value={field.value || ""}
                      onChange={(e) => {
                        field.onChange(e.target.value);
                      }}
                    >
                      <option value="" disabled>
                        Select grade
                      </option>
                      {relateData.grades.map((grade) => (
                        <option key={grade.id} value={grade.id}>
                          {grade.level}
                        </option>
                      ))}
                    </select>

                    {errors.gradeId?.message && <p className="text-xs text-red-400">{errors.gradeId.message.toString()}</p>}
                  </>
                )}
              />
            ) : (
              <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-md">
                <p className="text-sm text-yellow-800">⚠️ No grades available. Please add grades first before creating a class.</p>
              </div>
            )}
          </div>

          {/* Supervisor Teacher */}
          <div className="w-full flex flex-col gap-2">
            <label className="text-xs text-gray-500">Supervisor Teacher</label>

            {relateData?.teachers && relateData.teachers.length > 0 ? (
              <Controller
                name="supervisorId"
                control={control}
                render={({ field }) => (
                  <>
                    <select
                      className={`ring-[1.5px] ${errors.supervisorId ? "ring-red-400" : "ring-gray-300"} p-2 rounded-md text-sm w-full focus:ring-2 focus:ring-blue-400 focus:outline-none`}
                      value={field.value || ""}
                      onChange={(e) => field.onChange(e.target.value)}
                    >
                      <option value="" disabled>
                        Select a supervisor teacher
                      </option>
                      {relateData.teachers.map((teacher) => (
                        <option key={teacher.id} value={teacher.id}>
                          {teacher.name} {teacher.surname}
                        </option>
                      ))}
                    </select>

                    {errors.supervisorId?.message && <p className="text-xs text-red-400">{errors.supervisorId.message.toString()}</p>}

                    {/* Display selected teacher info (optional) */}
                    {field.value && (
                      <div className="mt-2">
                        {(() => {
                          const selectedTeacher = relateData.teachers.find((t) => t.id === field.value);
                          return selectedTeacher ? (
                            <div className="text-xs text-gray-600 bg-gray-50 p-2 rounded">
                              Selected:{" "}
                              <span className="font-medium">
                                {selectedTeacher.name} {selectedTeacher.surname}
                              </span>
                            </div>
                          ) : null;
                        })()}
                      </div>
                    )}
                  </>
                )}
              />
            ) : (
              <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-md">
                <p className="text-sm text-yellow-800">⚠️ No teachers available. Please add teachers first before creating a class.</p>
              </div>
            )}
          </div>
        </div>
      </div>

      <button
        type="submit"
        className="bg-blue-400 text-white p-2 rounded-md disabled:bg-blue-200 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        disabled={isSubmitting || !relateData?.teachers || relateData.teachers.length === 0 || !relateData?.grades || relateData.grades.length === 0}
      >
        {isSubmitting ? (
          <>
            <Loader size={14} className="animate-spin" />
            <span>Loading...</span>
          </>
        ) : type === "create" ? (
          "Create"
        ) : (
          "Update"
        )}
      </button>
    </form>
  );
};

export default ClassForm;

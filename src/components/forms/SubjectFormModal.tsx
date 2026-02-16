"use client";

import { subjectInput, subjectSchema } from "@/libs/validations";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader } from "lucide-react";
import { SubmitHandler, useForm, Controller } from "react-hook-form";
import InputField from "../InputField";
import { createSubject, updateSubject } from "@/libs/actions/subject.action";
import { toast } from "react-toastify";

interface SubjectFormProps {
  type: "create" | "update";
  data?: (
    | subjectInput
    | {
        name: string;
        teachers: Array<{ id: string; name: string; surname: string }> | string[];
      }
  ) & { id?: string };
  relateData?: {
    teachers: Array<{ id: string; name: string; surname: string }>;
  };
  handleCloseModal?: () => void;
}

const SubjectForm = ({ type, data, relateData, handleCloseModal }: SubjectFormProps) => {
  const initialTeachers = data?.teachers ? data.teachers.map((teacher) => (typeof teacher === "string" ? teacher : teacher.id)) : [];

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    control,
  } = useForm<subjectInput>({
    resolver: zodResolver(subjectSchema),
    defaultValues: {
      name: data?.name || "",
      teachers: initialTeachers,
    },
  });

  const handleSubmitSubject: SubmitHandler<subjectInput> = async (inputData) => {
    try {
      if (!inputData.teachers || inputData.teachers.length === 0) {
        toast.error("Please select at least one teacher");
        return;
      }

      let res;

      if (type === "create") {
        res = await createSubject(inputData);
      } else if (type === "update" && data?.id) {
        res = await updateSubject(data.id, inputData);
      } else {
        toast.error("Invalid operation");
        return;
      }

      console.log({ res });

      if (res?.success) {
        toast.success(`Subject ${res.data.name} ${type === "create" ? "created" : "updated"} successfully`);
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
    <form onSubmit={handleSubmit(handleSubmitSubject)} className="flex flex-col gap-5">
      <h1 className="text-xl font-semibold">{type === "create" ? "Create a new subject" : "Update subject"}</h1>

      <div className="space-y-3">
        <div className="grid grid-cols-1 gap-6">
          {/* Name */}
          <InputField label="Subject name" name="name" defaultValue={data?.name} register={register} error={errors?.name} />

          {/* Teachers */}
          <div className="w-full flex flex-col gap-2">
            <label className="text-xs text-gray-500">
              Teachers <span className="text-red-500">*</span>
              <span className="text-gray-400 ml-2">(Hold Ctrl/Cmd to select multiple)</span>
            </label>

            {relateData?.teachers && relateData.teachers.length > 0 ? (
              <Controller
                name="teachers"
                control={control}
                render={({ field }) => {
                  return (
                    <>
                      <select
                        multiple
                        className={`ring-[1.5px] ${errors.teachers ? "ring-red-400" : "ring-gray-300"} p-2 rounded-md text-sm w-full min-h-30 focus:ring-2 focus:ring-blue-400 focus:outline-none`}
                        value={field.value || []}
                        onChange={(e) => {
                          const selectedOptions = Array.from(e.target.selectedOptions, (option) => option.value);

                          field.onChange(selectedOptions);
                        }}
                      >
                        {relateData.teachers.map((teacher) => (
                          <option key={teacher.id} value={teacher.id}>
                            {teacher.name} {teacher.surname}
                          </option>
                        ))}
                      </select>

                      {errors.teachers?.message && <p className="text-xs text-red-400">{errors.teachers.message.toString()}</p>}

                      {/* Display selected teachers */}
                      {field.value && field.value.length > 0 ? (
                        <div className="flex flex-wrap gap-2 mt-2">
                          {field.value.map((teacherId) => {
                            const teacher = relateData.teachers.find((t) => t.id === teacherId);

                            return teacher ? (
                              <span key={teacherId} className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full flex items-center gap-1">
                                {teacher.name} {teacher.surname}
                                <button
                                  type="button"
                                  onClick={() => {
                                    const newSelected = field.value.filter((id) => id !== teacherId);

                                    field.onChange(newSelected);
                                  }}
                                  className="ml-1 text-blue-600 hover:text-blue-800"
                                >
                                  ×
                                </button>
                              </span>
                            ) : null;
                          })}
                        </div>
                      ) : (
                        <p className="text-xs text-gray-400 italic">No teachers selected yet</p>
                      )}
                    </>
                  );
                }}
              />
            ) : (
              <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-md">
                <p className="text-sm text-yellow-800">⚠️ No teachers available. Please add teachers first before creating a subject.</p>
              </div>
            )}
          </div>
        </div>
      </div>

      <button
        type="submit"
        className="bg-blue-400 text-white p-2 rounded-md disabled:bg-blue-200 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        disabled={isSubmitting || !relateData?.teachers || relateData.teachers.length === 0}
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

export default SubjectForm;

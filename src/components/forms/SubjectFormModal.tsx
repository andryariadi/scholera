"use client";

import { subjectInput, subjectSchema } from "@/libs/validations";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader } from "lucide-react";
import { SubmitHandler, useForm } from "react-hook-form";
import InputField from "../InputField";
import { createSubject, updateSubject } from "@/libs/actions/subject.action";
import { toast } from "react-toastify";

const SubjectForm = ({ type, data, handleCloseModal }: { data?: subjectInput & { id?: string }; type: "create" | "update"; handleCloseModal?: () => void }) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<subjectInput>({
    resolver: zodResolver(subjectSchema),
    defaultValues: data,
  });

  const handleSubmitSubject: SubmitHandler<subjectInput> = async (inputData) => {
    let res;

    if (type === "create") {
      res = await createSubject(inputData);
    } else if (type === "update") {
      res = await updateSubject(data?.id as string, inputData);
    } else {
      toast.error("Invalid operation");
      return;
    }

    if (res?.success) {
      toast.success(`Subject ${type === "create" ? "created" : "updated"} successfully`);
      reset();
      handleCloseModal?.();
    } else {
      toast.error(res?.error);
    }

    console.log({ data, res }, "<---subjectForm");
  };
  return (
    <form onSubmit={handleSubmit(handleSubmitSubject)} className="flex flex-col gap-5">
      {/* Title */}
      <h1 className="text-xl font-semibold">{type === "create" ? "Create a new subject" : "Update subject"}</h1>

      {/* Input Fields */}
      <div className="space-y-3">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Name */}
          <InputField label="Subject name" name="name" defaultValue={data?.name} register={register} error={errors?.name} />

          {/* Teachers */}
          {/* <InputField label="Teachers" name="teachers" defaultValue={data?.teachers?.[0]} register={register} error={errors?.teachers?.[0]} /> */}
        </div>
      </div>

      {/* Button submit */}
      <button type="submit" className="bg-blue-400 text-white p-2 rounded-md disabled:bg-blue-200 disabled:cursor-not-allowed flex items-center justify-center gap-2" disabled={isSubmitting}>
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

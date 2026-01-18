"use client";

import { teacherInput, teacherSchema } from "@/libs/validations";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm, useWatch } from "react-hook-form";
import InputField from "../InputField";
import { CloudUpload, Loader } from "lucide-react";
import { useEffect, useMemo } from "react";
import Image from "next/image";

const TeacherForm = ({ type, data }: { data?: teacherInput; type: "create" | "update" }) => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<teacherInput>({
    resolver: zodResolver(teacherSchema),
    defaultValues: data,
  });

  const imageFile = useWatch({ control, name: "img" });

  // Generate preview URL using useMemo (most React-friendly):
  const previewImage = useMemo(() => {
    if (typeof imageFile === "string") {
      return imageFile;
    }

    if (imageFile && imageFile instanceof FileList && imageFile.length > 0) {
      return URL.createObjectURL(imageFile[0]);
    }

    if (data?.img) {
      return data.img;
    }

    return null;
  }, [imageFile, data?.img]);

  // Cleanup URL when component unmounts:
  useEffect(() => {
    return () => {
      if (previewImage && previewImage.startsWith("blob:")) {
        URL.revokeObjectURL(previewImage);
      }
    };
  }, [previewImage]);

  const handleSubmitTeacher: SubmitHandler<teacherInput> = async (formData) => {
    console.log({ formData }, "<---formModal1");

    try {
      // Convert FileList to File:
      const imageFile = formData.img instanceof FileList ? formData.img[0] : formData.img;

      const submitData = {
        ...formData,
        img: imageFile,
      };

      console.log({ submitData }, "<---formModal2");
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  console.log({ errors, imageFile, previewImage }, "<---formModalError");

  return (
    <form onSubmit={handleSubmit(handleSubmitTeacher)} className="flex flex-col gap-5">
      {/* Title */}
      <h1 className="text-xl font-semibold">{type === "create" ? "Create a new teacher" : "Update teacher"}</h1>

      {/* Input Fields */}
      <div className="space-y-3">
        <p className="text-xs text-gray-400 font-medium">Authentication Information</p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Username */}
          <InputField label="Username" name="username" defaultValue={data?.username} register={register} error={errors?.username} />

          {/* Email */}
          <InputField label="Email" name="email" type="email" defaultValue={data?.email} register={register} error={errors?.email} />

          {/* Password */}
          <InputField label="Password" name="password" type="password" defaultValue={data?.password} register={register} error={errors?.password} />
        </div>
      </div>

      {/* Input Fields */}
      <div className="space-y-3">
        <p className="text-xs text-gray-400 font-medium">Personal Information</p>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 itemsstart gap-6">
          {/* First Name */}
          <InputField label="First Name" name="firstName" defaultValue={data?.firstName} register={register} error={errors.firstName} className="xl:col-span-2" />

          {/* Last Name */}
          <InputField label="Last Name" name="lastName" defaultValue={data?.lastName} register={register} error={errors.lastName} className="xl:col-span-2" />

          {/* Phone */}
          <InputField label="Phone" name="phone" type="tel" defaultValue={data?.phone} register={register} error={errors.phone} className="xl:col-span-2" />

          {/* Address */}
          <InputField label="Address" name="address" defaultValue={data?.address} register={register} error={errors.address} className="xl:col-span-2" />

          {/* Blood Type */}
          <InputField label="Blood Type" name="bloodType" defaultValue={data?.bloodType} register={register} error={errors.bloodType} className="xl:col-span-2" />

          {/* Birthday */}
          <InputField label="Birthday" name="birthday" defaultValue={data?.birthday} register={register} error={errors.birthday} type="date" className="xl:col-span-2" />

          {/* Sex */}
          <div className="xl:col-span-2 w-full flex flex-col gap-2">
            <label className="text-xs text-gray-500">Sex</label>

            <select className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full" {...register("sex")} defaultValue={data?.sex}>
              <option value="">Select sex</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>

            {errors.sex?.message && <p className="text-xs text-red-400">{errors.sex.message.toString()}</p>}
          </div>

          {/* Image */}
          <div className="xl:col-span-2 w-full flex flex-col items-start gap-5">
            <div className="flex items-start gap-5">
              <label className="text-xs text-gray-500 flex items-center gap-2 cursor-pointer" htmlFor="img">
                <CloudUpload size={28} />
                <span>Upload a photo</span>
              </label>

              {previewImage && (
                <div className="mt-2">
                  <Image src={previewImage} alt="Preview" width={128} height={128} className="w-32 h-32 object-cover rounded-md" />
                </div>
              )}

              <input type="file" id="img" {...register("img")} className="hidden" accept="image/*" />
            </div>

            {errors.img?.message && <p className="text-xs text-red-400">{errors.img.message.toString()}</p>}
          </div>
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

export default TeacherForm;

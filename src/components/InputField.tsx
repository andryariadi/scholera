import { FieldError, FieldValues, Path, UseFormRegister } from "react-hook-form";
import { Eye, EyeClosed } from "lucide-react";
import { useState } from "react";

type InputFieldProps<T extends FieldValues> = {
  label: string;
  type?: string;
  register: UseFormRegister<T>;
  name: Path<T>;
  defaultValue?: string | number | Date;
  error?: FieldError;
  inputProps?: React.InputHTMLAttributes<HTMLInputElement>;
  className?: string;
};

const InputField = <T extends FieldValues>({ label, type = "text", register, name, defaultValue, error, inputProps, className }: InputFieldProps<T>) => {
  const [showPassword, setShowPassword] = useState(false);

  const isPasswordField = type === "password";
  const inputType = isPasswordField ? (showPassword ? "text" : "password") : type;

  // Convert Date to string format YYYY-MM-DD:
  const formatDefaultValue = () => {
    if (defaultValue instanceof Date) {
      return defaultValue.toISOString().split("T")[0];
    }
    return defaultValue;
  };

  return (
    <div className={`w-full flex flex-col gap-2 ${className}`}>
      <label className="text-xs text-gray-500">{label}</label>

      <div className="relative">
        <input
          type={inputType}
          {...register(name)}
          className={`ring-[1.5px] ${error?.message ? "ring-red-400" : "ring-gray-300"} p-2 rounded-md text-sm w-full ${isPasswordField ? "pr-10" : ""}`}
          {...inputProps}
          defaultValue={formatDefaultValue()}
        />

        {isPasswordField && (
          <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700">
            {showPassword ? <Eye size={20} /> : <EyeClosed size={20} />}
          </button>
        )}
      </div>

      {error?.message && <p className="text-xs text-red-400">{error.message.toString()}</p>}
    </div>
  );
};

export default InputField;

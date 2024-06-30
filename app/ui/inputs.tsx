export function TextInput({
  className,
  ...rest
}: {
  id?: string;
  name?: string;
  label?: string;
  required?: boolean;
  defaultValue?: string;
  className?: string;
}) {
  return (
    <input
      type="text"
      {...rest}
      className={`mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-lg h-12 px-4 ${className}`}
    />
  );
}

export function TextArea({
  className,
  ...rest
}: {
  id?: string;
  name?: string;
  rows?: number;
  required?: boolean;
  defaultValue?: string;
  className?: string;
}) {
  return (
    <textarea
      {...rest}
      className={`mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm h-50 px-4 py-2 ${className}`}
    ></textarea>
  );
}

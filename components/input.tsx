interface InputProps {
  label: string
  placeholder?: string
  name: string
  type?: string
  register: any
  options?: object
}

export  function Input({ label, placeholder, name, type = "text", register, options }: InputProps) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-sm text-black font-semibold">{label}</label>
      <input
        type={type}
        placeholder={placeholder}
        {...register(name, options)} // <-- important for RHF
        //@ts-ignore
        step={options?.step || undefined} // <-- forward step to input
        className="bg-white/20  rounded-sm py-2 border border-stone-300 outline-emerald-600  px-4"
      
      />
    </div>
  )
}




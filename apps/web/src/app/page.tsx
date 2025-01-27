import { Form } from "@/shared/ui/form"

export default function Page() {
  return (
    <div className="flex flex-col justify-center items-center gap-2 p-4">
      <h3
        className="text-center text-xl font-semibold"
        children="Be friendly"
      />
      <div className="w-full grid gap-4">
        <Form />
      </div>
    </div>
  )
}

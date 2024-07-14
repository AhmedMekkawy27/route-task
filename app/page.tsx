import Form from "@/components/Form";
import Table from "@/components/Table";

export default function Home() {
  return (
    <main className="w-screen h-screen bg-slate-900 flex justify-center items-center">
      <div className="overflow-y-scroll min-w-[60%] h-[60%] p-5 bg-slate-700/[0.4] rounded-md border-[1px] border-gray-700">
        <div className="flex flex-col">
          <Form />
          <Table />
        </div>
      </div>
    </main>
  );
}

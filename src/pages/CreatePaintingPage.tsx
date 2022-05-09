import CreateForm from "../components/forms/CreateForm";

function CreatePaintingPage() {
  return (
    <>
      <div className="h-10 block" />
      <div className="flex flex-col w-screen items-center">
        <h1 className="text-3xl my-10">Sube una nueva pintura</h1>
        <CreateForm />
      </div>
    </>
  );
}

export default CreatePaintingPage;

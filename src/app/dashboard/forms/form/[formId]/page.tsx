import FormPageContent from "@/app/components/FormPageContent";

function Page({ params }: { params: { formId: string } }) {
  return <FormPageContent formId={params.formId} />;
}

export default Page;

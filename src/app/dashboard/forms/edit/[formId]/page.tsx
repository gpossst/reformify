import FormEdit from "@/app/components/Dashboard/FormEdit";

export default async function EditForm({
  params,
}: {
  params: Promise<{ formId: string }>;
}) {
  const { formId } = await params;
  return <FormEdit params={{ formId }} />;
}

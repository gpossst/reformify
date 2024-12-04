import FormPageContent from "@/app/components/Dashboard/FormPageContent";
import React from "react";

async function Page({ params }: { params: Promise<{ formId: string }> }) {
  const { formId } = await params;
  return <FormPageContent formId={formId} />;
}

export default Page;

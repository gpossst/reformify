import FormPageContent from "@/app/components/Dashboard/FormPageContent";
import React from "react";

function Page({ params }: { params: { formId: string } }) {
  // @ts-expect-error Params works
  const formId = React.use(params).formId;
  return <FormPageContent formId={formId} />;
}

export default Page;

import React from "react";

function page({ params }: { params: { formId: string } }) {
  return <div>{params.formId}</div>;
}

export default page;

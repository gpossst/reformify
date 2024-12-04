import EntryView from "@/app/components/Dashboard/EntryView";

export default async function Page({
  params,
}: {
  params: Promise<{ entryId: string }>;
}) {
  const { entryId } = await params;
  return <EntryView entryId={entryId} />;
}

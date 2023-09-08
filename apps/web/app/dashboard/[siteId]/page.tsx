import { RecordHits } from "@/components/record-hits";
import { SiteHeader } from "@/components/site-header";

export default async function Page({ params }: { params: { siteId: string } }) {
  
  return (
    <div>
      <SiteHeader siteId={params.siteId} />
      <RecordHits siteId={params.siteId} />
    </div>
  );
}

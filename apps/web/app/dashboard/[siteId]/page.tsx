import { SiteHeader } from "@/components/site-header";

export default async function Page({ params }: { params: { siteId: string } }) {
  // const data = await getRecorByHits({
  //   range: TIME_RANGE.SINCE_7_DAYS,
  //   site_id: params.siteId,
  // });

  // console.log(data)
  return (
    <div>
      <SiteHeader siteId={params.siteId} />
    </div>
  );
}

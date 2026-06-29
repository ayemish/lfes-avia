// import Link from "next/link";

// import { Button } from "@/components/ui/button";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Badge } from "@/components/ui/badge";

// /**
//  * Listing / deal detail page.
//  * Milestone 1: structural shell. Milestone 2 fetches the listing by id and
//  * wires the inquiry / concierge CTAs.
//  */
// export default async function ListingDetailPage({ params }: { params: Promise<{ id: string }> }) {
//   const { id } = await params;

//   return (
//     <div className="mx-auto w-full max-w-4xl px-4 py-10">
//       <Link href="/listings" className="text-muted-foreground text-sm hover:underline">
//         ← Back to listings
//       </Link>

//       <div className="mt-4 flex items-start justify-between gap-4">
//         <div>
//           <Badge variant="secondary">Sample category</Badge>
//           <h1 className="mt-2 text-2xl font-semibold">Listing {id}</h1>
//           <p className="text-muted-foreground mt-1">Status: active</p>
//         </div>
//         <Button asChild>
//           <Link href="/requests/new">Express interest</Link>
//         </Button>
//       </div>

//       <Card className="border-border/60 mt-6">
//         <CardHeader>
//           <CardTitle>Details</CardTitle>
//         </CardHeader>
//         <CardContent className="text-muted-foreground text-sm">
//           Full listing details (description, key fields, company connection) will be loaded from the{" "}
//           <code>listings</code> table in Milestone 2.
//         </CardContent>
//       </Card>
//     </div>
//   );
// }

import Link from "next/link";
import { notFound } from "next/navigation";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

import { getListingById } from "@/lib/queries/listing.query";

interface ListingDetailPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function ListingDetailPage({
  params,
}: ListingDetailPageProps) {
  const { id } = await params;

  const listing = await getListingById(id);
  console.log("listings",listing)

  if (!listing) {
    notFound();
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-10">
      <Link
        href="/listings"
        className="text-muted-foreground text-sm hover:underline"
      >
        ← Back to Listings
      </Link>

      <div className="mt-6 flex items-start justify-between gap-6">
        <div>
          <Badge>{listing.categories?.[0]?.name ?? "Uncategorized"}</Badge>

          <h1 className="mt-3 text-3xl font-bold">
            {listing.title}
          </h1>

          <p className="text-muted-foreground mt-2">
            {listing.summary}
          </p>
        </div>

        <Button>
          Express Interest
        </Button>
      </div>

      <Card className="mt-8">
        <CardContent className="space-y-6 pt-6">

          <div>
            <h3 className="font-semibold">
              Description
            </h3>

            <p className="text-muted-foreground mt-2">
              {listing.description || "No description available."}
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2">

            <div>
              <span className="font-medium">
                Company
              </span>

              <p>
                {listing.companies?.[0]?.name}
              </p>
            </div>

            <div>
              <span className="font-medium">
                Location
              </span>

              <p>
                {listing.location ?? "-"}
              </p>
            </div>

            <div>
              <span className="font-medium">
                Price
              </span>

              <p>
                {listing.price_amount
                  ? `${listing.price_currency} ${listing.price_amount}`
                  : "-"}
              </p>
            </div>

            <div>
              <span className="font-medium">
                Status
              </span>

              <p>{listing.status}</p>
            </div>

            <div>
              <span className="font-medium">
                Type
              </span>

              <p>{listing.kind}</p>
            </div>

            <div>
              <span className="font-medium">
                Featured
              </span>

              <p>
                {listing.is_featured ? "Yes" : "No"}
              </p>
            </div>

          </div>

        </CardContent>
      </Card>
    </div>
  );
}

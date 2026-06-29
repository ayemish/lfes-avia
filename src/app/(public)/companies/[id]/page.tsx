// import Link from "next/link";

// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// /** Company profile page (shell — wired to `companies` in Milestone 2). */
// export default async function CompanyDetailPage({ params }: { params: Promise<{ id: string }> }) {
//   const { id } = await params;

//   return (
//     <div className="mx-auto w-full max-w-4xl px-4 py-10">
//       <Link href="/companies" className="text-muted-foreground text-sm hover:underline">
//         ← Back to directory
//       </Link>
//       <h1 className="mt-4 text-2xl font-semibold">Company {id}</h1>
//       <Card className="border-border/60 mt-6">
//         <CardHeader>
//           <CardTitle>Profile</CardTitle>
//         </CardHeader>
//         <CardContent className="text-muted-foreground text-sm">
//           Company profile details will be loaded from the <code>companies</code> table in Milestone
//           2.
//         </CardContent>
//       </Card>
//     </div>
//   );
// }

import { notFound } from "next/navigation";
import Link from "next/link";
import { getCompanyListings } from "@/lib/queries/company.query";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { getCompanyById } from "@/lib/queries/company.query";

interface CompanyDetailPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function CompanyDetailPage({
  params,
}: CompanyDetailPageProps) {
  const { id } = await params;

  const company = await getCompanyById(id);


  if (!company) {
    notFound();
  }
  const listings = await getCompanyListings(company.id);
  return (
    <div className="mx-auto max-w-5xl px-4 py-10">
      <Link
        href="/companies"
        className="text-muted-foreground text-sm hover:underline"
      >
        ← Back to Companies
      </Link>

      <div className="mt-6 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">{company.name}</h1>

          {company.is_verified && (
            <Badge className="mt-3">
              Verified Company
            </Badge>
          )}
        </div>
      </div>

      <Card className="mt-8">
        <CardHeader>
          <CardTitle>Company Information</CardTitle>
        </CardHeader>

        <CardContent className="space-y-4">
          <p>
            <strong>Description:</strong>{" "}
            {company.description ?? "-"}
          </p>

          <p>
            <strong>Country:</strong>{" "}
            {company.country ?? "-"}
          </p>

          <p>
            <strong>Service:</strong>{" "}
            {company.service_type ?? "-"}
          </p>

          <p>
            <strong>Email:</strong>{" "}
            {company.email ?? "-"}
          </p>

          <p>
            <strong>Phone:</strong>{" "}
            {company.phone ?? "-"}
          </p>

          <p>
            <strong>Website:</strong>{" "}
            {company.website ? (
              <a
                href={company.website}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary underline"
              >
                {company.website}
              </a>
            ) : (
              "-"
            )}
          </p>
        </CardContent>
      </Card>

      <div className="mt-10">
        <h2 className="text-xl font-semibold">
          Listings by {company.name}
        </h2>

        <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {listings.length === 0 ? (
            <Card>
              <CardContent className="py-8 text-center">
                No active listings found.
              </CardContent>
            </Card>
          ) : (
            listings.map((listing: any) => (
              <Card key={listing.id}>
                <CardHeader>
                  <Badge>
                    {listing.categories?.name ?? "Listing"}
                  </Badge>

                  <CardTitle className="mt-2 text-base">
                    {listing.title}
                  </CardTitle>
                </CardHeader>

                <CardContent className="space-y-2">
                  <p className="text-sm text-muted-foreground">
                    {listing.summary}
                  </p>

                  {listing.location && (
                    <p className="text-sm">
                      📍 {listing.location}
                    </p>
                  )}

                  {listing.price_amount && (
                    <p className="text-sm font-medium">
                      {listing.price_currency} {listing.price_amount}
                    </p>
                  )}

                  <Link
                    href={`/listings/${listing.id}`}
                    className="text-primary text-sm hover:underline"
                  >
                    View Listing →
                  </Link>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>


    </div>
  );
}
// import type { Metadata } from "next";

// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// export const metadata: Metadata = { title: "Company directory" };

// /**
//  * Company directory base.
//  * Milestone 1: shell. Milestone 2 wires to the `companies` table.
//  */
// export default function CompaniesPage() {
//   return (
//     <div className="mx-auto w-full max-w-6xl px-4 py-10">
//       <h1 className="text-2xl font-semibold">Company Directory</h1>
//       <p className="text-muted-foreground mt-1">
//         Aviation companies and service providers on LFES Avia.
//       </p>

//       <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
//         {Array.from({ length: 3 }).map((_, i) => (
//           <Card key={i} className="border-border/60">
//             <CardHeader>
//               <CardTitle className="text-base">Sample company #{i + 1}</CardTitle>
//             </CardHeader>
//             <CardContent className="text-muted-foreground text-sm">
//               Company records will be loaded from Supabase in Milestone 2.
//             </CardContent>
//           </Card>
//         ))}
//       </div>
//     </div>
//   );
// }

import type { Metadata } from "next";
import Link from "next/link";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

import { getCompanies } from "@/lib/queries/company.query";

export const metadata: Metadata = {
  title: "Company Directory",
};

interface CompaniesPageProps {
  searchParams: Promise<{
    search?: string;
  }>;
}

export default async function CompaniesPage({
  searchParams,
}: CompaniesPageProps) {
  const params = await searchParams;

  const companies = await getCompanies({
    search: params.search,
  });

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-10">
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-semibold">Company Directory</h1>

        <p className="text-muted-foreground">
          Aviation companies and service providers on LFES Avia.
        </p>
      </div>

      {/* Search bar next step */}

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {companies.length === 0 ? (
          <Card className="col-span-full">
            <CardContent className="py-10 text-center">
              <h3 className="text-lg font-semibold">
                No Companies Found
              </h3>

              <p className="text-muted-foreground mt-2">
                Companies will appear here once they are added.
              </p>
            </CardContent>
          </Card>
        ) : (
          companies.map((company: any) => (
            <Card key={company.id}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base">
                    {company.name}
                  </CardTitle>

                  {company.is_verified && (
                    <Badge>Verified</Badge>
                  )}
                </div>
              </CardHeader>

              <CardContent className="space-y-3">
                <p className="text-muted-foreground text-sm">
                  {company.description ??
                    "No description available."}
                </p>

                <div className="space-y-1 text-sm">
                  {company.country && (
                    <p>
                      <span className="font-medium">
                        Country:
                      </span>{" "}
                      {company.country}
                    </p>
                  )}

                  {company.service_type && (
                    <p>
                      <span className="font-medium">
                        Service:
                      </span>{" "}
                      {company.service_type}
                    </p>
                  )}
                </div>

                <Link
                  href={`/companies/${company.id}`}
                  className="text-primary text-sm font-medium hover:underline"
                >
                  View Company →
                </Link>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}

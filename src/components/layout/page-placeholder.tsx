import { Card, CardContent } from "@/components/ui/card";

/**
 * Standard header + "coming soon" body for Milestone 1 shell pages.
 * Each page that uses this gets wired to real data in a later milestone.
 */
export function PagePlaceholder({
  title,
  description,
  milestone = "Milestone 2",
  children,
}: {
  title: string;
  description?: string;
  milestone?: string;
  children?: React.ReactNode;
}) {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">{title}</h1>
        {description && <p className="text-muted-foreground mt-1">{description}</p>}
      </div>
      {children ?? (
        <Card className="border-border/60 border-dashed">
          <CardContent className="text-muted-foreground py-10 text-center text-sm">
            This area is scaffolded and will be connected to the database in {milestone}.
          </CardContent>
        </Card>
      )}
    </div>
  );
}

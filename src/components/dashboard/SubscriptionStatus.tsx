import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface SubscriptionStatusProps {
  user: {
    subscription: string;
    expireDate: string;
  };
}

export const SubscriptionStatus = ({ user }: SubscriptionStatusProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Subscription Status</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-muted-foreground">Package</span>
            <span>{user?.subscription || "None"}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-muted-foreground">Expiration Date</span>
            <span>{user?.expireDate || "N/A"}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
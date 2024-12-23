import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface SubscriptionStatusProps {
  user: {
    subscription: string;
    expireDate: string;
  };
}

const getSubscriptionStatus = (subscription: string) => {
  const subs = subscription.toLowerCase().split('-');
  const hasSupreme = subs.includes('supreme');
  const hasEssential = subs.includes('essential');
  const hasLegit = subs.includes('legit');
  
  return hasSupreme && hasEssential && hasLegit;
};

const SubscriptionIndicator = ({ isActive }: { isActive: boolean }) => (
  <div 
    className={`w-3 h-3 rounded-full ${
      isActive ? 'bg-green-500' : 'bg-red-500'
    }`}
  />
);

export const SubscriptionStatus = ({ user }: SubscriptionStatusProps) => {
  const subscriptions = [
    { name: "Stream", active: false },
    { name: "Supreme", active: user.subscription.toLowerCase().includes('supreme') },
    { name: "Essential", active: user.subscription.toLowerCase().includes('essential') },
    { name: "Legit", active: user.subscription.toLowerCase().includes('legit') },
    { name: "PC Clean App", active: false }
  ];

  const isFullSubscription = getSubscriptionStatus(user.subscription);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-center text-muted-foreground">Subscription Status</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6 pt-6">
          {subscriptions.map((sub) => (
            <div 
              key={sub.name}
              className="flex justify-between items-center border-l-4 pl-4"
            >
              <span className="text-sm text-muted-foreground">{sub.name}</span>
              <div className="flex items-center gap-8">
                <SubscriptionIndicator isActive={sub.active} />
                <span className="text-sm text-muted-foreground">
                  {user.expireDate || "Expired date"}
                </span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
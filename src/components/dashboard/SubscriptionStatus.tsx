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
  
  // Return true if subscription has all three components
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
    <Card className="bg-[#1A1F2C] border-gray-800">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-white">Subscription Status</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {subscriptions.map((sub, index) => (
            <div 
              key={sub.name}
              className={`flex items-center justify-between ${
                isFullSubscription && sub.active ? 'border-l-4 border-green-500 pl-4' : 
                sub.active ? 'border-l-4 border-red-500 pl-4' : 'pl-5'
              }`}
            >
              <span className="text-xl text-white">{sub.name}</span>
              <div className="flex items-center gap-8">
                <SubscriptionIndicator isActive={sub.active} />
                <span className="text-xl text-white">
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
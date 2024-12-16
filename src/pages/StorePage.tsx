import { Header } from "@/components/Header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const StorePage = () => {
  const products = [
    {
      name: "MATRIX STREAMER,SUPREME & ESSENTIAL",
      monthlyPrice: "₹ 4,085.00",
      monthlyUSDT: "45.13 USDT",
      lifetimePrice: "₹ 7,885.00",
      lifetimeUSDT: "89.95 USDT",
      image: "/lovable-uploads/a7791a0b-af30-495e-a791-eb0441d527e2.png"
    },
    {
      name: "MATRIX SUPREME",
      monthlyPrice: "₹ 900.00",
      monthlyUSDT: "9.50 USDT",
      lifetimePrice: "₹ 2,500.00",
      lifetimeUSDT: "28.50 USDT",
      image: "/lovable-uploads/a7791a0b-af30-495e-a791-eb0441d527e2.png"
    },
    {
      name: "MATRIX ESSENTIAL",
      monthlyPrice: "₹ 900.00",
      monthlyUSDT: "9.50 USDT",
      lifetimePrice: "₹ 2,500.00",
      lifetimeUSDT: "28.50 USDT",
      image: "/lovable-uploads/a7791a0b-af30-495e-a791-eb0441d527e2.png"
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 container py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <Card key={product.name} className="overflow-hidden">
              <img src={product.image} alt={product.name} className="w-full h-48 object-cover bg-gray-700" />
              <CardHeader>
                <CardTitle className="text-lg">{product.name}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-sm text-gray-400">Monthly Price: {product.monthlyPrice} [{product.monthlyUSDT}]</p>
                  <p className="text-sm text-gray-400">Lifetime Price: {product.lifetimePrice} [{product.lifetimeUSDT}]</p>
                </div>
                <Button className="w-full">View Details</Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
};

export default StorePage;
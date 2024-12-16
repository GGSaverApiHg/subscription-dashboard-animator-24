import { Header } from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const RedeemPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 container py-8">
        <div className="space-y-8">
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-center">Redeem License Key</h2>
            <div className="max-w-md mx-auto">
              <Input type="text" placeholder="License Key" className="mb-4" />
              <Button className="w-full">Redeem</Button>
            </div>
          </div>

          <div className="space-y-4">
            <Input type="text" placeholder="Type a keyword..." className="max-w-sm" />
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>License Key</TableHead>
                    <TableHead>Product Name</TableHead>
                    <TableHead>Validity</TableHead>
                    <TableHead>Redeemed By</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell colSpan={4} className="text-center py-4">
                      No matching records found
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default RedeemPage;
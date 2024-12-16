import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RotateCw, Shield } from "lucide-react";

interface HWIDResetProps {
  hwidResets: number;
  maxResets: number;
  onReset: () => void;
}

export const HWIDReset = ({ hwidResets, maxResets, onReset }: HWIDResetProps) => {
  return (
    <Card className="mt-6">
      <CardHeader className="bg-secondary">
        <CardTitle className="text-center">Reset Device ID</CardTitle>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="space-y-6 text-center">
          <p className="text-muted-foreground">
            If you want to reset your windows or if you see "Please login from registered device" then click the reset button below
          </p>
          <p className="text-red-500 flex items-center justify-center gap-2">
            <Shield className="h-4 w-4" />
            Warning: If you try to use the panel in a different pc, then your account will be suspended.
          </p>
          <div className="flex flex-col items-center gap-2">
            <Button 
              variant="default"
              onClick={onReset}
              disabled={hwidResets >= maxResets}
              className="bg-cyan-500 hover:bg-cyan-600"
            >
              <RotateCw className="mr-2 h-4 w-4" />
              Reset Device ID ({hwidResets || 0}/{maxResets})
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
}

export const Logo = ({ className }: LogoProps) => {
  return (
    <div className={cn("flex items-center gap-2", className)}>
      <img src="/lovable-uploads/a5fa357f-46b0-4c81-9213-2eac001bcdac.png" alt="Matrix" className="w-8 h-8" />
      <span className="font-semibold text-lg">Matrix Regedit</span>
    </div>
  );
};
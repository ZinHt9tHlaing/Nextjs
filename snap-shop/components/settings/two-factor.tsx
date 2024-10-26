import { Check, X } from "lucide-react";
import { Button } from "../ui/button";
import SettingsCard from "./settings-card";
import { auth } from "@/server/auth";

const TwoFactor = async () => {
  const session = await auth();

  return (
    <SettingsCard>
      <div className="flex justify-between items-center">
        <p className="text-sm font-medium">Two Factor Authentication</p>
        {session?.user.isTwoFactorEnabled ? (
          <Button
            className="bg-green-600 text-white hover:bg-green-500 active:scale-95 duration-200"
            size={"sm"}
          >
            <Check className="size-4 me-2" /> On
          </Button>
        ) : (
          <Button
            className="bg-red-600 text-white hover:bg-red-500 active:scale-95 duration-200"
            size={"sm"}
          >
            <X className="size-4 me-2" /> Off
          </Button>
        )}
      </div>
    </SettingsCard>
  );
};

export default TwoFactor;

import { KeyRound } from "lucide-react";
import SettingsCard from "./settings-card";

const ChangePassword = () => {
  return (
    <SettingsCard>
      <div className="flex justify-between items-center">
        <p className="text-sm font-medium">Change Password</p>
        <KeyRound className="size-5" />
      </div>
    </SettingsCard>
  );
};

export default ChangePassword;

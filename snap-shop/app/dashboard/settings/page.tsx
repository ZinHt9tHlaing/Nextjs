import {
  ChangePassword,
  ProfileCard,
  SettingsCard,
  TwoFactor,
} from "@/components/settings";
import LogOutBtn from "@/components/settings/log-out";
import { auth } from "@/server/auth";

import { redirect } from "next/navigation";

const Settings = async () => {
  const session = await auth();
  if (!session?.user) return redirect("/");
  // console.log(session);

  return (
    <>
      <h2 className="text-2xl font-bold mb-4">Account Settings</h2>
      <SettingsCard title="Settings" description="Manage your account settings">
        <main className=" flex flex-col gap-4">
          <ProfileCard session={session} />
          {!session.user.isOauth && (
            <>
              <ChangePassword email={session.user.email!} />
              <TwoFactor
                isTwoFactorEnabled={session.user.isTwoFactorEnabled}
                email={session.user.email!}
              />
            </>
          )}
          <LogOutBtn />
        </main>
      </SettingsCard>
    </>
  );
};

export default Settings;

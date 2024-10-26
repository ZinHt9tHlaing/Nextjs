import {
  ChangePassword,
  ProfileCard,
  SettingsCard,
  TwoFactor,
} from "@/components/settings";
import { auth } from "@/server/auth";
import { redirect } from "next/navigation";

const Settings = async () => {
  const session = await auth();
  if (!session?.user) return redirect("/");
  console.log(session);

  return (
    <SettingsCard title="Settings" description="Manage your account settings">
      <main className="flex flex-1 flex-col lg:flex-row gap-4">
        <div className="flex-1">
          <ProfileCard session={session} />
        </div>
        <div className="space-y-4 flex-1">
          {!session.user.isOauth && (
            <>
              <ChangePassword email={session.user.email!} />
              <TwoFactor />
            </>
          )}
        </div>
      </main>
    </SettingsCard>
  );
};

export default Settings;

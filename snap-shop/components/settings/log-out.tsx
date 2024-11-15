"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import { signOut } from "next-auth/react";
import SettingsCard from "./settings-card";

const LogOutBtn = () => {
  return (
    <div>
      <SettingsCard>
        <h2 className="text-sm font-semibold mb-2 text-red-600">Danger Zone</h2>
        <Button variant={"destructive"}>
          <LogOut
            className="me-2 active:scale-95 duration-200"
            onClick={() => signOut()}
          />{" "}
          Logout
        </Button>
      </SettingsCard>
    </div>
  );
};

export default LogOutBtn;

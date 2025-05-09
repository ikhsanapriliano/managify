"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { signOut } from "next-auth/react";
import { useState } from "react";

const LogoutDialog = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button>Logout</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Heading Out?</DialogTitle>
          <DialogDescription>
            You'll be logged out, but don’t worry — everything’s saved. See you
            again soon!
          </DialogDescription>
          <div className="mt-4 flex items-center justify-end gap-2">
            <Button
              variant={"outline"}
              onClick={() => {
                setIsOpen(false);
              }}
            >
              Cancel
            </Button>
            <Button
              onClick={async () => {
                await signOut();
              }}
            >
              Logout
            </Button>
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default LogoutDialog;

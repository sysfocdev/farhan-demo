"use client";
import { changeUserVerificationStatus } from "@/actions/admin.action";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export const UserStatusBtn = ({
  userStatus,
  userId,
}: {
  userStatus: boolean;
  userId: string;
}) => {
  const [isPending, setIsPending] = useState(false);

  const hanldeUserVerificationStatus = async () => {
    try {
      setIsPending(true);

      await changeUserVerificationStatus(!userStatus, userId);
    } catch (error) {
      console.log("Error Updating status", error);
    } finally {
      setIsPending(false);
    }
  };

  return (
    <Button
      className="w-28"
      disabled={isPending}
      onClick={hanldeUserVerificationStatus}
    >
      {userStatus ? "Approved" : "Unapproved"}
    </Button>
  );
};

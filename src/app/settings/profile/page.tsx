"use client";
import React, { useState } from "react";

import useUserStore from "@/lib/store/userStore";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getUser, updateUser } from "@/lib/api/profile";
import { User } from "@/lib/types/user.type";
import AccountInfo from "@/components/MyAccountComponents/AccountInfo";
import EditProfileDialog from "@/components/RegisterDialogs/EditUserDialog";

function MyProfilePage() {
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const setUser = useUserStore((state) => state.setUser);
  const userStore = useUserStore((state) => state.user);

  const { data, isLoading, refetch, error } = useQuery({
    queryKey: ["profile"],
    queryFn: () => getUser(),
  });

  const user = data?.data;

  // Mutation for updating user profile
  const mutation = useMutation({
    mutationFn: updateUser,
    onSuccess: (updatedUserData) => {
      // Update Zustand store
      setUser({
        ...userStore!,
        email: updatedUserData?.data.email!,
        mobile_no: updatedUserData?.data.mobile_no!,
        profile_details: {
          first_name: updatedUserData?.data.first_name!,
          last_name: updatedUserData?.data.last_name!,
          customer_details: {
            nationality: updatedUserData?.data.nationality.country_name!,
            salutation: updatedUserData?.data.salutation!,
            customer_name: updatedUserData?.data.first_name!,
          },
        },
      });
      // Refetch user data
      refetch();
      // Close dialog
      setIsEditDialogOpen(false);
    },
  });

  const handleEdit = (updatedUserInfo: {
    salutation: string;
    first_name: string;
    last_name: string;
    email: string;
    nationality: string;
  }) => {
    mutation.mutate(updatedUserInfo);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-full">Loading...</div>
    );
  }

  if (error || !user) {
    return (
      <div className="flex justify-center items-center h-full">
        Error loading user data.
      </div>
    );
  }

  return (
    <div className="w-full">
      <AccountInfo user={user} onEdit={() => setIsEditDialogOpen(true)} />

      {isEditDialogOpen && (
        <EditProfileDialog
          isOpen={isEditDialogOpen}
          onClose={() => setIsEditDialogOpen(false)}
          user={user}
          onSubmit={handleEdit}
          isSubmitting={mutation.isPending}
          errorMessage={
            mutation.isError
              ? mutation.error?.message ||
                "An error occurred during profile update."
              : ""
          }
        />
      )}
    </div>
  );
}

export default MyProfilePage;

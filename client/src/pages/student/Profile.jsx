import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useLoadUserQuery, useUpdateUserMutation } from "@/slices/api/AuthApi";
import { toast } from "sonner";
import { useSelector } from "react-redux";
import Course from "./Course";

const Profile = () => {
  const [name, setName] = useState("");
  const [profilePhoto, setProfilePhoto] = useState(null);
  const { user } = useSelector((store) => store.auth);
  const { data, isLoading, refetch } = useLoadUserQuery();
  const [
    updateUser,
    { isLoading: isUpdating, isError, error, isSuccess },
  ] = useUpdateUserMutation();

  const onChangeHandler = (e) => {
    const file = e.target.files[0];
    if (file && file.size <= 5 * 1024 * 1024) {
      setProfilePhoto(file);
    } else {
      toast.error("Please select a file smaller than 5MB.");
    }
  };

  const updateUserHandler = async () => {
    const formData = new FormData();
    formData.append("name", name);
    if (profilePhoto) {
      formData.append("profilePhoto", profilePhoto);
    }
    await updateUser(formData);
  };

  useEffect(() => {
    if (isSuccess) {
      refetch();
      toast.success("Profile updated successfully!");
    }
    if (isError) {
      toast.error(error.message || "Failed to update profile.");
    }
  }, [isSuccess, isError, error, refetch]);

  if (isLoading) {
    return <h1>Loading profile...</h1>;
  }

  return (
    <div className="max-w-4xl mx-auto px-4 my-10">
      <h1 className="font-bold text-2xl text-center md:text-left">PROFILE</h1>
      <div className="flex flex-col md:flex-row items-center md:items-start gap-8 my-5">
        <div className="flex flex-col items-center">
          <Avatar className="h-24 w-24 md:h-32 md:w-32 mb-4">
            <AvatarImage
              src={user?.photoUrl || "https://github.com/shadcn.png"}
              alt={user?.name || "User"}
            />
            <AvatarFallback>
              {user?.name?.charAt(0).toUpperCase() || "U"}
            </AvatarFallback>
          </Avatar>
        </div>
        <div>
          <div className="mb-2">
            <h1 className="font-semibold text-gray-900 dark:text-gray-100">
              Name:
              <span className="font-normal text-gray-700 dark:text-gray-300 ml-2">
                {user?.name || "N/A"}
              </span>
            </h1>
          </div>
          <div className="mb-2">
            <h1 className="font-semibold text-gray-900 dark:text-gray-100">
              Email:
              <span className="font-normal text-gray-700 dark:text-gray-300 ml-2">
                {user?.email || "N/A"}
              </span>
            </h1>
          </div>
          <div className="mb-2">
            <h1 className="font-semibold text-gray-900 dark:text-gray-100">
              Role:
              <span className="font-normal text-gray-700 dark:text-gray-300 ml-2">
                {user?.role?.toUpperCase() || "USER"}
              </span>
            </h1>
          </div>
          <Dialog>
            <DialogTrigger asChild>
              <Button size="sm" className="mt-2">
                Edit Profile
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Edit Profile</DialogTitle>
                <DialogDescription>
                  Make changes to your profile. Click save when done.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label>Name</Label>
                  <Input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter new name"
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label>Profile Photo</Label>
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={onChangeHandler}
                    className="col-span-3"
                  />
                </div>
              </div>
              <DialogFooter>
                <Button
                  disabled={isUpdating}
                  onClick={updateUserHandler}
                >
                  {isUpdating ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    "Save Changes"
                  )}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>
      <div>
        <h1 className="font-medium text-lg">Courses you're enrolled in</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 my-5">
          {
            [1,2,3,4,5].map((course,index) => (
              <Course key={index}/>
            ))
          }
        </div>
      </div>
    </div>
  );
};
export default Profile;

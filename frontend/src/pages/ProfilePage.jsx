import { updateProfile, removeProfilePic } from "../features/authSlice.js";
import { useDispatch, useSelector } from "react-redux";
import { Camera, Mail, User } from "lucide-react";

function ProfilePage() {
    const isUpdatingProfile = useSelector(
        (state) => state.auth.isUpdatingProfile
    );
    const authUser = useSelector((state) => state.auth.authUser);
    const dispatch = useDispatch();

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const data = new FormData();
        data.append("profilePic", file);

        dispatch(updateProfile(data));
    };

    return (
        <div className="min-h-screen pt-20">
            <div className="max-w-2xl mx-auto p-4 py-8">
                <div className="bg-base-300 rounded-xl p-6 space-y-8">
                    <div className="text-center">
                        <h1 className="text-2xl font-semibold">Profile</h1>
                        <p className="mt-2">Your profile information</p>
                    </div>

                    {/* user avatar section */}
                    <div className="flex flex-col items-center gap-4">
                        <div className="relative">
                            <img
                                src={authUser.profilePic || "/avatar.png"}
                                alt="Profile"
                                className="size-32 rounded-full object-cover border-4 "
                            />
                            <label
                                htmlFor="avatar-upload"
                                className={`absolute bottom-0 right-0 bg-base-content hover:scale-105 p-2 rounded-full cursor-pointer transition-all duration-200 ${isUpdatingProfile ? "animate-pulse pointer-events-none": ""}`}
                            >
                                <Camera className="w-5 h-5 text-base-200" />
                                <input
                                    type="file"
                                    id="avatar-upload"
                                    className="hidden"
                                    accept="image/*"
                                    onChange={handleImageUpload}
                                    disabled={isUpdatingProfile}
                                />
                            </label>
                        </div>
                        <p className="text-sm text-zinc-400">
                            {isUpdatingProfile
                                ? "Uploading..."
                                : "Click the camera icon to update your photo"}
                        </p>
                        {/* remove profile pic btn */}
                        {authUser.profilePic && (
                            <button
                                onClick={() => dispatch(removeProfilePic())}
                                disabled={isUpdatingProfile}
                                className="text-sm px-3 py-1.5 rounded-md border border-red-500 text-red-400 hover:bg-red-400 hover:text-white transition-all duration-200"
                            >
                                Remove Profile Pic
                            </button>
                        )}
                    </div>

                    <div className="space-y-6">
                        <div className="space-y-1.5">
                            <div className="text-sm text-zinc-400 flex items-center gap-2">
                                <User className="w-4 h-4" />
                                Full Name
                            </div>
                            <p className="px-4 py-2.5 bg-base-200 rounded-lg border">
                                {authUser?.fullName}
                            </p>
                        </div>

                        <div className="space-y-1.5">
                            <div className="text-sm text-zinc-400 flex items-center gap-2">
                                <Mail className="w-4 h-4" />
                                Email Address
                            </div>
                            <p className="px-4 py-2.5 bg-base-200 rounded-lg border">
                                {authUser?.email}
                            </p>
                        </div>
                    </div>

                    <div className="mt-6 bg-base-300 rounded-xl p-6">
                        <h2 className="text-lg font-medium  mb-4">
                            Account Information
                        </h2>
                        <div className="space-y-3 text-sm">
                            <div className="flex items-center justify-between py-2 border-b border-zinc-700">
                                <span>Member Since</span>
                                <span>{authUser.createdAt?.split("T")[0]}</span>
                            </div>
                            <div className="flex items-center justify-between py-2">
                                <span>Account Status</span>
                                <span className="text-green-500">Active</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProfilePage;

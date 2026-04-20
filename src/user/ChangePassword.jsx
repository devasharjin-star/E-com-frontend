import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import PageTitle from "../components/PageTitle";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { passwordUpdate, removeErrors, removeSuccess } from "../features/user/userSlice";


const ChangePassword = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const { error, loading, success } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    dispatch(passwordUpdate({ oldPassword, newPassword, confirmPassword }));
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(removeErrors());
    }
    if (success) {
      navigate("/profile");
      dispatch(removeSuccess());
    }
  }, [dispatch, error, success]);

  return (
    <div className="min-h-screen bg-blue-50 flex flex-col">
      <Navbar />
      <PageTitle title="Change Password" />

      <div className="flex flex-1 items-center justify-center px-4">
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-sm bg-white rounded-2xl shadow-sm p-6 space-y-5"
        >
          {/* Title */}
          <div className="text-center space-y-1">
            <h2 className="text-xl font-semibold text-blue-600">
              Update Password
            </h2>
            <p className="text-xs text-gray-400">
              Keep your account secure
            </p>
          </div>

          {/* Inputs */}
          <div className="space-y-4">
            {/* Old Password */}
            <div className="space-y-1">
              <label className="text-xs font-medium text-gray-500">
                Old Password
              </label>
              <input
                type="password"
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
                required
                placeholder="Enter old password"
                className="w-full px-3 py-2.5 rounded-lg border border-gray-200 text-sm text-gray-700 placeholder-gray-400 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-200 transition"
              />
            </div>

            {/* New Password */}
            <div className="space-y-1">
              <label className="text-xs font-medium text-gray-500">
                New Password
              </label>
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
                placeholder="Enter new password"
                className="w-full px-3 py-2.5 rounded-lg border border-gray-200 text-sm text-gray-700 placeholder-gray-400 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-200 transition"
              />
            </div>

            {/* Confirm Password */}
            <div className="space-y-1">
              <label className="text-xs font-medium text-gray-500">
                Confirm Password
              </label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                placeholder="Confirm password"
                className="w-full px-3 py-2.5 rounded-lg border border-gray-200 text-sm text-gray-700 placeholder-gray-400 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-200 transition"
              />
            </div>
          </div>

          {/* Button */}
          <button
            disabled={loading}
            className="w-full bg-blue-600 text-white py-2.5 rounded-lg text-sm font-medium hover:bg-blue-700 transition"
          >
            {loading ? "Updating..." : "Update Password"}
          </button>
        </form>
      </div>
    </div>
  );
};
export default ChangePassword;
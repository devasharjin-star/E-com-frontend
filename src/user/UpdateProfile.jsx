import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import PageTitle from "../components/PageTitle";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { updateProfile } from "../features/user/userSlice";

const UpdateProfile = () => {
    const { user, loading } = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [avatar, setAvatar] = useState("");
    const [preview, setPreview] = useState("/default-avatar.png");

    // Load user data
    useEffect(() => {
        if (user) {
            setName(user.name || "");
            setEmail(user.email || "");
            setPreview(user.avatar?.url || "/default-avatar.png");
        }
    }, [user]);

    // Handle file input
    const handleFileChange = (e) => {
        const file = e.target.files[0];

        if (!file) return;

        const reader = new FileReader();

        reader.onloadend = () => {
            setPreview(reader.result);
            setAvatar(reader.result); // base64 string
        };

        reader.readAsDataURL(file);
    };

    // Submit form
    const handleSubmit = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.set("name", name);
        formData.set("email", email);
        formData.set("avatar", avatar);

        dispatch(updateProfile(formData));
        navigate("/profile");
    };

    return (
        <div className="h-screen flex flex-col overflow-hidden">
            <Navbar />
            <PageTitle title="Update Profile" />

            <div className="flex-1 flex items-center justify-center bg-gray-100 px-4">
                <form
                    onSubmit={handleSubmit}
                    className="w-full max-w-sm bg-white rounded-2xl shadow-sm p-6"
                >
                    <h2 className="text-xl font-semibold text-center text-gray-800 mb-6">
                        Update Profile
                    </h2>

                    {/* Avatar */}
                    <div className="flex flex-col items-center mb-6">
                        <img
                            className="h-20 w-20 object-cover rounded-full border-2 border-gray-200"
                            src={preview}
                            alt="profile"
                        />

                        <input
                            type="file"
                            id="profile"
                            className="hidden"
                            onChange={handleFileChange}
                        />

                        <label
                            htmlFor="profile"
                            className="mt-3 cursor-pointer text-sm bg-blue-600 text-white px-4 py-1 rounded-md hover:bg-blue-700 transition"
                        >
                            Change Photo
                        </label>
                    </div>

                    {/* Name */}
                    <div className="bg-gray-50 rounded-lg px-4 py-3 mb-4">
                        <p className="text-xs text-gray-500 mb-1">Full Name</p>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full bg-transparent outline-none"
                            required
                        />
                    </div>

                    {/* Email */}
                    <div className="bg-gray-50 rounded-lg px-4 py-3 mb-4">
                        <p className="text-xs text-gray-500 mb-1">Email</p>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full bg-transparent outline-none"
                            required
                        />
                    </div>

                    {/* Submit */}
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-blue-600 text-white py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition"
                    >
                        {loading ? "Updating..." : "Update Profile"}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default UpdateProfile;
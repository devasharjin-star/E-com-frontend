import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import PageTitle from "../components/PageTitle";
import Loader from "../components/Loader";

const Profile = () => {
    const { user, isAuthenticated, loading } = useSelector((state) => state.user);
    const navigate = useNavigate();

    useEffect(() => {
        if (isAuthenticated === false) {
            navigate('/login');
        }
    }, [isAuthenticated, navigate]);

    if (loading) {
        return <Loader />
    }



    return (
        <>
            <div className="h-screen flex flex-col overflow-hidden">
                <Navbar />
                <PageTitle title="Profile" />

                <div className="flex-1 flex items-center justify-center bg-gray-100 px-4">

                    <div className="w-full max-w-sm bg-white rounded-2xl shadow-sm p-6">

                        <h2 className="text-xl font-semibold text-center text-gray-800 mb-6">
                            My Profile
                        </h2>

                        <div className="flex justify-center mb-6">
                            <img
                                className="h-20 w-20 object-cover rounded-full border-2 border-gray-200"
                                src={user?.avatar?.url || "/default-avatar.png"}
                                alt="profile"
                            />
                        </div>

                        <div className="space-y-4">
                            <div className="bg-gray-50 rounded-lg px-4 py-3">
                                <p className="text-xs text-gray-500 mb-1">Full Name</p>
                                <p className="text-gray-800 font-medium">{user?.name}</p>
                            </div>

                            <div className="bg-gray-50 rounded-lg px-4 py-3">
                                <p className="text-xs text-gray-500 mb-1">Email</p>
                                <p className="text-gray-800 font-medium">{user?.email}</p>
                            </div>
                        </div>

                        <div className="flex space-x-4" >
                            <Link
                                to="/profile/update"
                                className="flex w-full mt-6 text-center justify-center bg-blue-600 text-white py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition"
                            >
                                Edit Profile
                            </Link>
                            <Link to="/profile/password/update"
                                className="flex mt-6 w-full justify-center text-center bg-blue-600 text-white py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition"
                            >
                                Change Password
                            </Link>
                        </div>

                    </div>

                </div>
            </div>
        </>
    );
};

export default Profile;
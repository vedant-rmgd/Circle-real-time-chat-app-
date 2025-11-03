import { useState, useId } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
    Eye,
    EyeOff,
    Loader2,
    Lock,
    Mail,
    MessageSquare,
    User,
} from "lucide-react";
import AuthImagePattern from "../components/AuthImagePattern";
import toast from "react-hot-toast";
import { signup } from "../features/authSlice.js";
import { useNavigate } from "react-router-dom";

function SignupPage() {
    const [showPassword, setShowPassword] = useState(false);
    const inputId1 = useId();
    const inputId2 = useId();
    const inputId3 = useId();
    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        password: "",
    });
    const isSigningUp = useSelector((state) => state.isSigningUp);
    const dispatch = useDispatch();
    // const navigate = useNavigate()

    const validateForm = () => {
      if (!formData.fullName.trim() ) return toast.error("Full Name is required")
      if (!formData.email.trim() ) return toast.error("Email is required")
      if (!/\S+@\S+\.\S+/.test(formData.email)) return toast.error("Invalid email format");
      if (!formData.password) return toast.error("Password is required");
      if (formData.password.length < 6) return toast.error("Password must be at least 6 characters");

      return true
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const success = validateForm()

        if (success===true) dispatch(signup(formData))

        // navigate("/")
    };

    return (
        <div className="min-h-screen grid lg:grid-cols-2">
            {/* left side */}
            <div className="flex flex-col justify-center items-center p-6 sm:p-12">
                <div className="w-full max-w-md space-y-8">
                    {/* logo */}
                    <div className="text-center mb-8">
                        <div className="flex flex-col items-center gap-2 group">
                            <div
                                className="size-12 rounded-xl bg-primary/10 flex items-center justify-center 
                                group-hover:bg-primary/20 transition-colors"
                            >
                                <MessageSquare className="size-6 text-primary" />
                            </div>
                            <h1 className="text-2xl font-bold mt-2">
                                Create Account
                            </h1>
                            <p className="text-base-content/60">
                                Get started with your free account
                            </p>
                        </div>
                    </div>

                    {/* form */}
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="form-control">
                            <label htmlFor={inputId1} className="label">
                                <span className="label-text font-medium">
                                    Full Name
                                </span>
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <User className="size-5 text-base-content/40" />
                                </div>
                                <input
                                    id={inputId1}
                                    type="text"
                                    className={`input input-bordered w-full pl-10`}
                                    placeholder="Full Name"
                                    value={formData.fullName}
                                    onChange={(e) =>
                                        setFormData({
                                            ...formData,
                                            fullName: e.target.value,
                                        })
                                    }
                                />
                            </div>
                        </div>

                        <div className="form-control">
                            <label htmlFor={inputId2} className="label">
                                <span className="label-text font-medium">
                                    Email
                                </span>
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Mail className="size-5 text-base-content/40" />
                                </div>
                                <input
                                    id={inputId2}
                                    type="email"
                                    className={`input input-bordered w-full pl-10`}
                                    placeholder="Email"
                                    value={formData.email}
                                    onChange={(e) =>
                                        setFormData({
                                            ...formData,
                                            email: e.target.value,
                                        })
                                    }
                                />
                            </div>
                        </div>

                        <div className="form-control">
                            <label htmlFor={inputId3} className="label">
                                <span className="label-text font-medium">
                                    Password
                                </span>
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Lock className="size-5 text-base-content/40" />
                                </div>
                                <input
                                    id={inputId3}
                                    type={showPassword ? "text" : "password"}
                                    className={`input input-bordered w-full pl-10`}
                                    placeholder="Password"
                                    value={formData.password}
                                    onChange={(e) =>
                                        setFormData({
                                            ...formData,
                                            password: e.target.value,
                                        })
                                    }
                                />
                                <button
                                    type="button"
                                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                                    onClick={() =>
                                        setShowPassword(!showPassword)
                                    }
                                >
                                    {showPassword ? (
                                        <EyeOff className="size-5 text-base-content/40" />
                                    ) : (
                                        <Eye className="size-5 text-base-content/40" />
                                    )}
                                </button>
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="btn btn-primary w-full"
                            disabled={isSigningUp}
                        >
                            {isSigningUp ? (
                                <>
                                    <Loader2 className="size-5 animate-spin" />
                                    Loading...
                                </>
                            ) : (
                                "Create Account"
                            )}
                        </button>
                    </form>

                    <div className="text-center">
                        <p className="text-base-content/60">
                            Already have an account?{" "}
                            <Link to="/login" className="link link-primary">
                                Sign in
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
            {/* right side */}
            <AuthImagePattern
                title="Join our community"
                subtitle="Connect with friends, share moments, and stay in touch with your loved ones."
            />
        </div>
    );
}

export default SignupPage;

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Eye, EyeOff, Check, X, ShieldCheck, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { toast } from "react-toastify";

interface PasswordChangeProps {
  changePasswordMutation: {
    mutate: (data: { userId: string; oldPassword: string; newPassword: string }, options: {
      onSuccess: () => void;
      onError: (err: { message: string }) => void;
    }) => void;
  },
  userId: string
}

interface PasswordStrengthIndicatorProps {
  password: string;
}

const PasswordStrengthIndicator: React.FC<PasswordStrengthIndicatorProps> = ({ password }) => {
  // Calculate password strength
  const calculateStrength = (password: string): number => {
    if (!password) return 0;

    let strength = 0;

    // Length check
    if (password.length >= 8) strength += 1;
    if (password.length >= 12) strength += 1;

    // Character variety checks
    if (/[A-Z]/.test(password)) strength += 1;
    if (/[a-z]/.test(password)) strength += 1;
    if (/[0-9]/.test(password)) strength += 1;
    if (/[^A-Za-z0-9]/.test(password)) strength += 1;

    return Math.min(strength, 5);
  };

  const strength = calculateStrength(password);

  const getStrengthText = (): string => {
    if (strength === 0) return "Too weak";
    if (strength === 1) return "Weak";
    if (strength === 2) return "Fair";
    if (strength === 3) return "Good";
    if (strength === 4) return "Strong";
    return "Very strong";
  };

  const getStrengthColor = (): string => {
    if (strength === 0) return "bg-gray-500";
    if (strength === 1) return "bg-gray-400";
    if (strength === 2) return "bg-gray-300";
    if (strength === 3) return "bg-gray-200";
    if (strength === 4) return "bg-white";
    return "bg-white";
  };

  return (
    <div className="mb-4">
      <div className="flex items-center justify-between mb-1">
        <span className="text-sm text-gray-400">Password strength: </span>
        <span className="text-sm font-medium text-gray-200">{getStrengthText()}</span>
      </div>
      <div className="h-2 w-full bg-gray-800 rounded-full overflow-hidden">
        <motion.div
          className={`h-full ${getStrengthColor()}`}
          initial={{ width: "0%" }}
          animate={{ width: `${(strength / 5) * 100}%` }}
          transition={{ duration: 0.5 }}
        />
      </div>
    </div>
  );
};

// Alert component to replace toast
const Alert: React.FC<{
  title: string;
  description?: string;
  variant: "success" | "error";
  onClose: () => void;
}> = ({ title, description, variant, onClose }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className={`p-4 rounded-md mb-4 flex items-start justify-between ${variant === "success" ? "bg-white text-black" : "bg-gray-800 text-white border border-gray-600"
        }`}
    >
      <div className="flex items-start">
        <div className="mr-3 mt-0.5">
          {variant === "success" ? (
            <Check className="h-5 w-5 text-black" />
          ) : (
            <AlertTriangle className="h-5 w-5 text-white" />
          )}
        </div>
        <div>
          <h4 className="font-medium">{title}</h4>
          {description && <p className="text-sm opacity-80">{description}</p>}
        </div>
      </div>
      <button onClick={onClose} className="text-gray-400 hover:text-gray-300">
        <X className="h-4 w-4" />
      </button>
    </motion.div>
  );
};

const PasswordChange: React.FC<PasswordChangeProps> = ({ changePasswordMutation, userId }) => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [alert, setAlert] = useState<{
    show: boolean;
    title: string;
    description?: string;
    variant: "success" | "error";
  }>({
    show: false,
    title: "",
    description: "",
    variant: "error",
  });


  const showAlert = (title: string, description?: string, variant: "success" | "error" = "error") => {
    setAlert({
      show: true,
      title,
      description,
      variant,
    });

    setTimeout(() => {
      setAlert(prev => ({ ...prev, show: false }));
    }, 4000);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!currentPassword) {
      showAlert("Current password is required");
      return;
    }

    if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/.test(newPassword)) {
      showAlert(
        "Weak Password",
        "Password must be at least 8 characters and include a capital letter, number, and special character."
      );
      return;
    }

    if (newPassword !== confirmPassword) {
      showAlert("Passwords don't match", "New password and confirmation must match");
      return;
    }

    console.log(currentPassword, newPassword, confirmPassword)
    if (userId) {
      setLoading(true);
      changePasswordMutation.mutate({ userId, oldPassword: currentPassword, newPassword: newPassword }, {
        onSuccess: () => {
          setSuccess(true);
          showAlert("Success!", "Your password has been updated", "success");
          setCurrentPassword("");
          setNewPassword("");
          setConfirmPassword("");
          setSuccess(false);
          setLoading(false);
        },
        onError: (err) => {
          toast.error(err.message)
          setLoading(false);
        }
      })

    }

  };

  const formVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 }
  };

  return (
    <motion.div
      className=" w-full md:w-1/3 mx-auto p-8 mt-20 md:mt-30 rounded-2xl shadow-lg bg-black bg-opacity-80 backdrop-blur-sm border border-gray-800"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
    >
      {alert.show && (
        <Alert
          title={alert.title}
          description={alert.description}
          variant={alert.variant}
          onClose={() => setAlert(prev => ({ ...prev, show: false }))}
        />
      )}

      <div className="text-center mb-6">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="w-16 h-16 rounded-full bg-white flex items-center justify-center mx-auto mb-4"
        >
          <ShieldCheck className="text-black" size={28} />
        </motion.div>
        <h2 className="text-2xl font-bold text-white mb-1">Change Password</h2>
        <p className="text-gray-400">Update your password to keep your account secure</p>
      </div>

      {success ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center p-6"
        >
          <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center mx-auto mb-4">
            <Check className="text-black" size={32} />
          </div>
          <h3 className="text-xl font-medium text-white mb-2">Password Updated!</h3>
          <p className="text-gray-400">Your password has been changed successfully.</p>
        </motion.div>
      ) : (
        <motion.form
          onSubmit={handleSubmit}
          variants={formVariants}
          initial="hidden"
          animate="visible"
          className="space-y-5"
        >
          <motion.div variants={itemVariants} className="space-y-1">
            <label htmlFor="current-password" className="text-sm font-medium text-gray-300 block">
              Current Password
            </label>
            <div className="relative">
              <Input
                id="current-password"
                type={showCurrentPassword ? "text" : "password"}
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                className="pr-10 border-gray-700 bg-gray-900 text-white focus:ring-white focus:border-white"
                placeholder="Enter current password"
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-300"
                onClick={() => setShowCurrentPassword(!showCurrentPassword)}
              >
                {showCurrentPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </motion.div>

          <motion.div variants={itemVariants} className="space-y-1">
            <label htmlFor="new-password" className="text-sm font-medium text-gray-300 block">
              New Password
            </label>
            <div className="relative">
              <Input
                id="new-password"
                type={showNewPassword ? "text" : "password"}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="pr-10 border-gray-700 bg-gray-900 text-white focus:ring-white focus:border-white"
                placeholder="Enter new password"
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-300"
                onClick={() => setShowNewPassword(!showNewPassword)}
              >
                {showNewPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            {newPassword && <PasswordStrengthIndicator password={newPassword} />}
          </motion.div>

          <motion.div variants={itemVariants} className="space-y-1">
            <label htmlFor="confirm-password" className="text-sm font-medium text-gray-300 block">
              Confirm New Password
            </label>
            <div className="relative">
              <Input
                id="confirm-password"
                type={showConfirmPassword ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="pr-10 border-gray-700 bg-gray-900 text-white focus:ring-white focus:border-white"
                placeholder="Confirm new password"
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-300"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            {confirmPassword && newPassword !== confirmPassword && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-red-400 text-sm mt-1"
              >
                Passwords don't match
              </motion.p>
            )}
          </motion.div>

          <motion.div variants={itemVariants}>
            <Button
              type="submit"
              className="w-full bg-white hover:bg-gray-200 text-black py-2 px-4 rounded-md font-medium transition-all duration-300 flex items-center justify-center"
              disabled={loading}
            >
              {loading ? (
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                  className="mr-2 h-4 w-4 border-2 border-t-transparent border-black rounded-full"
                />
              ) : null}
              {loading ? "Updating..." : "Update Password"}
            </Button>
          </motion.div>
        </motion.form>
      )}
    </motion.div>
  );
};

export default PasswordChange;

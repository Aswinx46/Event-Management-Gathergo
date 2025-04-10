
import { useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Edit, Mail, Phone, Save, X, CheckCircle, XCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { RootState } from "@/store/store";
import { useSelector } from "react-redux";
import ImageCropper from "@/components/other components/ImageCropper";

export interface User {
    _id?: string;
    clientId: string;
    role: string;
    status: string;
    name: string;
    email: string;
    phone: number;
    profileImage?: string
}




const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: (i: number) => ({
        opacity: 1,
        y: 0,
        transition: { delay: i * 0.1, duration: 0.3 }
    })
};

const formVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
            delayChildren: 0.1
        }
    }
};

const toastVariants = {
    hidden: { opacity: 0, y: -20, scale: 0.95 },
    visible: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: { type: "spring", stiffness: 400, damping: 20 }
    },
    exit: {
        opacity: 0,
        y: -20,
        scale: 0.95,
        transition: { duration: 0.2 }
    }
};


export const UserProfile = () => {
    const client = useSelector((state: RootState) => state.clientSlice.client)
    useEffect(() => {
        setUser(client!)
    }, [client])
    const [user, setUser] = useState<User>();
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState<User>({ ...user! });
    const [imageUrl, setImageUrl] = useState(client?.profileImage);
    const [showCropper, setShowCropper] = useState<boolean>(false)
    const [croppedImage, setCroppedImage] = useState<File | null>(null);
    const [rezisedImage, setRezisedImage] = useState<string>('')
    const [toast, setToast] = useState<{
        visible: boolean;
        title: string;
        description: string;
        type: "success" | "error";
    } | null>(null);

    useEffect(() => {
        if (croppedImage) {
            const resizedImage = URL.createObjectURL(croppedImage);
            setRezisedImage(resizedImage);
            setFormData((prev) => ({ ...prev, profileImage: resizedImage }));

            return () => {
                URL.revokeObjectURL(resizedImage);
            };
        }
    }, [croppedImage]);

    const handleEditToggle = () => {
        // Reset form data when toggling edit mode

        if (!isEditing) {
            setFormData({ ...user! });
            setImageUrl(user?.profileImage);
        }
        setIsEditing(!isEditing);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                const result = reader.result as string;
                setImageUrl(result);
                setShowCropper(true);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // Basic validation
        if (!formData.name.trim()) {
            showToast({
                title: "Error",
                description: "Name is required",
                type: "error"
            });
            return;
        }

 

        // Update user data and exit edit mode
        setUser(formData);
        setIsEditing(false);

        // Show success toast
        showToast({
            title: "Profile updated",
            description: "Your profile information has been updated successfully",
            type: "success"
        });

        // In a real application, you would save this to a database or API
        console.log("User updated:", formData);
    };

    const showToast = ({
        title,
        description,
        type = "success"
    }: {
        title: string;
        description: string;
        type: "success" | "error";
    }) => {
        setToast({ visible: true, title, description, type });

        // Auto-hide toast after 3 seconds
        setTimeout(() => {
            setToast(prev => prev ? { ...prev, visible: false } : null);

            // Remove from DOM after animation completes
            setTimeout(() => {
                setToast(null);
            }, 300);
        }, 3000);
    };

    const getInitials = (name: string) => {
        return name
            .split(" ")
            .map((part) => part.charAt(0))
            .join("")
            .toUpperCase();
    };



    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="w-full max-w-md mx-auto px-4 py-6"
        >
            <motion.div
                initial="hidden"
                animate="visible"
                variants={containerVariants}
                className="relative"
            >
                {/* Custom Toast Notification */}
                {showCropper && <ImageCropper image={imageUrl ?? ''} showCropper={setShowCropper} onCropComplete={setCroppedImage} />}
                <AnimatePresence>
                    {toast?.visible && (
                        <motion.div
                            key="toast"
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                            variants={toastVariants}
                            className={cn(
                                "fixed top-4 right-4 z-50 flex items-center gap-3 p-4 rounded-lg shadow-lg max-w-md",
                                toast.type === "success"
                                    ? "bg-gradient-to-r from-green-500 to-green-600 text-white"
                                    : "bg-gradient-to-r from-red-500 to-red-600 text-white"
                            )}
                        >
                            <div className="shrink-0">
                                {toast.type === "success" ? (
                                    <CheckCircle className="h-5 w-5" />
                                ) : (
                                    <XCircle className="h-5 w-5" />
                                )}
                            </div>
                            <div className="flex-1">
                                <h4 className="font-medium text-sm">{toast.title}</h4>
                                <p className="text-xs opacity-90">{toast.description}</p>
                            </div>
                            <button
                                onClick={() => setToast(prev => prev ? { ...prev, visible: false } : null)}
                                className="p-1 rounded-full hover:bg-black/10"
                            >
                                <XCircle className="h-4 w-4" />
                            </button>
                        </motion.div>
                    )}
                </AnimatePresence>

                <Card className="max-w-md w-full mx-auto overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                    <CardHeader className="relative pb-0">
                        <motion.div
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="absolute top-2 right-2 z-10"
                        >
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={handleEditToggle}
                                aria-label={isEditing ? "Cancel editing" : "Edit profile"}
                                className="bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200"
                            >
                                <Edit className="h-4 w-4" />
                            </Button>
                        </motion.div>
                        <div className="flex flex-col items-center">
                            <motion.div
                                whileHover={{ scale: 1.05 }}
                                transition={{ type: "spring", stiffness: 300 }}
                            >
                                <Avatar className="h-28 w-28 mb-3 border-4 border-white dark:border-slate-800 shadow-md">
                                    <AvatarImage src={isEditing ? imageUrl : user?.profileImage} alt={user?.name} className="object-cover" />
                                    <AvatarFallback className="text-xl bg-gradient-to-br from-indigo-500 to-purple-600 text-white">
                                        {user && getInitials(user?.name)}
                                    </AvatarFallback>
                                </Avatar>
                            </motion.div>
                            {!isEditing && (
                                <motion.div
                                    initial="hidden"
                                    animate="visible"
                                    variants={itemVariants}
                                    custom={0}
                                >
                                    <h3 className="text-center text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400">
                                        {user?.name}
                                    </h3>
                                </motion.div>
                            )}
                        </div>
                    </CardHeader>
                    <CardContent className={cn("pt-6", isEditing ? "px-2 sm:px-6" : "")}>
                        {isEditing ? (
                            <motion.form
                                initial="hidden"
                                animate="visible"
                                variants={formVariants}
                                onSubmit={handleSubmit}
                                className="space-y-5"
                            >
                                <motion.div
                                    className="flex justify-center mb-4"
                                    variants={itemVariants}
                                >
                                    <div className="relative">
                                        <motion.div
                                            whileHover={{ scale: 1.05 }}
                                            transition={{ type: "spring", stiffness: 300 }}
                                        >
                                            <img
                                                src={rezisedImage ?? imageUrl}
                                                alt="Profile Preview"
                                                className="rounded-full w-28 h-28 object-cover border-4 border-white shadow-md"
                                            />
                                        </motion.div>
                                        <div className="absolute bottom-0 right-0">
                                            <Label
                                                htmlFor="profile-image"
                                                className="cursor-pointer bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-full p-2 inline-flex shadow-md hover:shadow-lg transition-all"
                                            >
                                                <Edit className="h-4 w-4" />
                                            </Label>
                                            <Input
                                                id="profile-image"
                                                type="file"
                                                accept="image/*"
                                                className="hidden"
                                                onChange={handleImageChange}
                                            />
                                        </div>
                                    </div>
                                </motion.div>

                                <motion.div className="space-y-2" variants={itemVariants}>
                                    <Label htmlFor="name" className="text-sm font-medium text-slate-700 dark:text-slate-300">
                                        Name
                                    </Label>
                                    <Input
                                        id="name"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        placeholder="Enter your name"
                                        className="bg-slate-50 border-slate-200 focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md"
                                    />
                                </motion.div>

                                {/* <motion.div className="space-y-2" variants={itemVariants}>
                                    <Label htmlFor="email" className="text-sm font-medium text-slate-700 dark:text-slate-300">
                                        Email
                                    </Label>
                                    <Input
                                        id="email"
                                        name="email"
                                        type="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        placeholder="Enter your email"
                                        className="bg-slate-50 border-slate-200 focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md"
                                    />
                                </motion.div> */}

                                <motion.div className="space-y-2" variants={itemVariants}>
                                    <Label htmlFor="phone" className="text-sm font-medium text-slate-700 dark:text-slate-300">
                                        Phone
                                    </Label>
                                    <Input
                                        id="phone"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        placeholder="Enter your phone number"
                                        className="bg-slate-50 border-slate-200 focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md"
                                    />
                                </motion.div>

                                <motion.div
                                    className="flex justify-end gap-2 pt-3"
                                    variants={itemVariants}
                                >
                                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                        <Button
                                            type="button"
                                            variant="outline"
                                            onClick={handleEditToggle}
                                            className="gap-1 border-slate-200 hover:bg-slate-100 hover:text-slate-900"
                                        >
                                            <X className="h-4 w-4" />
                                            Cancel
                                        </Button>
                                    </motion.div>
                                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                        <Button
                                            type="submit"
                                            className="gap-1 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700"
                                        >
                                            <Save className="h-4 w-4" />
                                            Save Changes
                                        </Button>
                                    </motion.div>
                                </motion.div>
                            </motion.form>
                        ) : (
                            <div className="space-y-5">
                                <motion.div
                                    className="flex items-center gap-3 p-3 rounded-lg bg-slate-50 dark:bg-slate-800/50"
                                    variants={itemVariants}
                                    custom={1}
                                >
                                    <div className="bg-indigo-100 dark:bg-indigo-900/30 p-2 rounded-full">
                                        <Mail className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
                                    </div>
                                    <div className="flex-1">
                                        <p className="text-xs font-medium text-slate-500 dark:text-slate-400">Email</p>
                                        <p className="text-sm font-medium text-slate-700 dark:text-slate-200 truncate">{user?.email}</p>
                                    </div>
                                </motion.div>

                                <motion.div
                                    className="flex items-center gap-3 p-3 rounded-lg bg-slate-50 dark:bg-slate-800/50"
                                    variants={itemVariants}
                                    custom={2}
                                >
                                    <div className="bg-purple-100 dark:bg-purple-900/30 p-2 rounded-full">
                                        <Phone className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                                    </div>
                                    <div className="flex-1">
                                        <p className="text-xs font-medium text-slate-500 dark:text-slate-400">Phone</p>
                                        <p className="text-sm font-medium text-slate-700 dark:text-slate-200">{user?.phone}</p>
                                    </div>
                                </motion.div>
                            </div>
                        )}
                    </CardContent>
                </Card>
            </motion.div>
        </motion.div>
    );
};

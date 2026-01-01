"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { useState, useEffect } from "react";
import { registerUser } from "@/lib/authClient";
import { 
  User, 
  Mail, 
  Lock, 
  Eye, 
  EyeOff, 
  CheckCircle, 
  Sparkles, 
  ArrowRight,
  Shield,
  KeyRound,
  Briefcase,
  UserPlus
} from "lucide-react";
import { cn } from "@/lib/utils";

export default function SignUp() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [isAnimating, setIsAnimating] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    setIsAnimating(true);
  }, []);

  useEffect(() => {
    if (formData.password) {
      const strength = calculatePasswordStrength(formData.password);
      setPasswordStrength(strength);
    } else {
      setPasswordStrength(0);
    }
  }, [formData.password]);

  const calculatePasswordStrength = (password: string) => {
    let strength = 0;
    if (password.length >= 8) strength += 25;
    if (/[A-Z]/.test(password)) strength += 25;
    if (/[0-9]/.test(password)) strength += 25;
    if (/[^A-Za-z0-9]/.test(password)) strength += 25;
    return strength;
  };

  const getPasswordStrengthColor = (strength: number) => {
    if (strength < 50) return "bg-red-500";
    if (strength < 75) return "bg-yellow-500";
    return "bg-emerald-500";
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error for this field
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }
    
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }
    
    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    }
    
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsLoading(true);
    
    try {
      await registerUser(formData.name, formData.email, formData.password);
      setFormData({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
      });
      alert("Account created successfully! Please check your email to verify.");
    } catch (error) {
      console.error("Sign up error:", error);
      setErrors(prev => ({ ...prev, form: "Something went wrong. Please try again." }));
    } finally {
      setIsLoading(false);
    }
  };

  const passwordRequirements = [
    { text: "At least 8 characters", met: formData.password.length >= 8 },
    { text: "One uppercase letter", met: /[A-Z]/.test(formData.password) },
    { text: "One number", met: /[0-9]/.test(formData.password) },
    { text: "One special character", met: /[^A-Za-z0-9]/.test(formData.password) },
  ];

  return (
    <div className={`w-full max-w-md mx-auto transition-all duration-700 ${isAnimating ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
      {/* Background decorative elements */}
      <div className="relative">
        <div className="absolute -right-6 w-32 h-32 bg-blue-400/10 rounded-full blur-3xl" />
        <div className="absolute bg-yellow-400/5 rounded-full blur-3xl" />
        
        <Card className="relative bg-gradient-to-br from-white to-blue-50/50 backdrop-blur-sm border-2 border-blue-100/50 shadow-2xl shadow-blue-200/20 overflow-hidden group">
          {/* Animated header border */}
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-yellow-400 to-blue-500 animate-pulse" />
          
          <CardHeader className="pb-6 relative">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2.5 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl shadow-lg group-hover:scale-105 transition-transform duration-300">
                <UserPlus className="h-6 w-6 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-700 to-blue-900 bg-clip-text text-transparent">
                  Join Our Community
                </h2>
                <p className="text-muted-foreground mt-1 flex items-center gap-2">
                  <Sparkles className="h-4 w-4 text-yellow-500" />
                  Start your journey with us
                </p>
              </div>
            </div>
          </CardHeader>
          
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name Field */}
              <div className="space-y-2 group">
                <div className="flex items-center justify-between">
                  <Label htmlFor="name" className="text-sm font-medium text-blue-800/80 flex items-center gap-2">
                    <User className="h-4 w-4" />
                    Full Name
                  </Label>
                  {errors.name && (
                    <span className="text-xs text-rose-600 font-medium">{errors.name}</span>
                  )}
                </div>
                <div className="relative">
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    placeholder="John Doe"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className={cn(
                      "border-2 border-blue-100 bg-white text-gray-900 focus:border-blue-400 focus:ring-2 focus:ring-blue-200 transition-all duration-300 group-hover:border-blue-300 rounded-xl px-4 py-3 pl-10",
                      errors.name && "border-rose-300 focus:border-rose-400 focus:ring-rose-200"
                    )}
                  />
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-blue-400" />
                </div>
              </div>
              
              {/* Email Field */}
              <div className="space-y-2 group">
                <div className="flex items-center justify-between">
                  <Label htmlFor="email" className="text-sm font-medium text-blue-800/80 flex items-center gap-2">
                    <Mail className="h-4 w-4" />
                    Email Address
                  </Label>
                  {errors.email && (
                    <span className="text-xs text-rose-600 font-medium">{errors.email}</span>
                  )}
                </div>
                <div className="relative">
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="you@example.com"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className={cn(
                      "border-2 border-blue-100 bg-white text-gray-900 focus:border-blue-400 focus:ring-2 focus:ring-blue-200 transition-all duration-300 group-hover:border-blue-300 rounded-xl px-4 py-3 pl-10",
                      errors.email && "border-rose-300 focus:border-rose-400 focus:ring-rose-200"
                    )}
                  />
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-blue-400" />
                </div>
              </div>
              
              {/* Password Field */}
              <div className="space-y-3 group">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password" className="text-sm font-medium text-blue-800/80 flex items-center gap-2">
                    <KeyRound className="h-4 w-4" />
                    Password
                  </Label>
                  {errors.password && (
                    <span className="text-xs text-rose-600 font-medium">{errors.password}</span>
                  )}
                </div>
                <div className="relative">
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Create a strong password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    className={cn(
                      "border-2 border-blue-100 bg-white text-gray-900 focus:border-blue-400 focus:ring-2 focus:ring-blue-200 transition-all duration-300 group-hover:border-blue-300 rounded-xl px-4 py-3 pl-10 pr-10",
                      errors.password && "border-rose-300 focus:border-rose-400 focus:ring-rose-200"
                    )}
                  />
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-blue-400" />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>
                
                {/* Password Strength Indicator */}
                {formData.password && (
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-gray-600">Password strength</span>
                      <span className="font-medium" style={{ color: getPasswordStrengthColor(passwordStrength) }}>
                        {passwordStrength < 50 ? "Weak" : passwordStrength < 75 ? "Fair" : "Strong"}
                      </span>
                    </div>
                    <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div 
                        className={`h-full rounded-full transition-all duration-300 ${getPasswordStrengthColor(passwordStrength)}`}
                        style={{ width: `${passwordStrength}%` }}
                      />
                    </div>
                  </div>
                )}
                
              </div>
              
              {/* Confirm Password Field */}
              <div className="space-y-2 group">
                <div className="flex items-center justify-between">
                  <Label htmlFor="confirmPassword" className="text-sm font-medium text-blue-800/80 flex items-center gap-2">
                    <Shield className="h-4 w-4" />
                    Confirm Password
                  </Label>
                  {errors.confirmPassword && (
                    <span className="text-xs text-rose-600 font-medium">{errors.confirmPassword}</span>
                  )}
                </div>
                <div className="relative">
                  <Input
                    id="confirmPassword"
                    name="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Confirm your password"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    required
                    className={cn(
                      "border-2 border-blue-100 bg-white text-gray-900 focus:border-blue-400 focus:ring-2 focus:ring-blue-200 transition-all duration-300 group-hover:border-blue-300 rounded-xl px-4 py-3 pl-10 pr-10",
                      errors.confirmPassword && "border-rose-300 focus:border-rose-400 focus:ring-rose-200"
                    )}
                  />
                  <Shield className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-blue-400" />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>
              </div>
              
              
              {/* Error Message */}
              {errors.form && (
                <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl">
                  <p className="text-sm text-rose-700 font-medium">{errors.form}</p>
                </div>
              )}
              
              {/* Submit Button */}
              <Button
                type="submit"
                disabled={isLoading}
                className={cn(
                  "w-full py-6 rounded-xl text-base font-semibold",
                  "bg-gradient-to-r from-blue-600 to-blue-700",
                  "hover:from-blue-700 hover:to-blue-800",
                  "active:scale-[0.98] transition-all duration-300",
                  "shadow-lg shadow-blue-500/25 hover:shadow-blue-600/30",
                  "border-2 border-blue-500/20",
                  "relative overflow-hidden group/btn"
                )}
              >
                <div className="flex items-center justify-center gap-3 relative z-10">
                  {isLoading ? (
                    <>
                      <div className="h-5 w-5 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                      <span>Creating Account...</span>
                    </>
                  ) : (
                    <>
                      <span>Create Account</span>
                      <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover/btn:translate-x-1" />
                    </>
                  )}
                </div>
                
                {/* Button shimmer effect */}
                <div className="absolute inset-0 -translate-x-full group-hover/btn:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
              </Button>
            </form>
          </CardContent>
          
          <CardFooter className="pt-0">
            <div className="w-full text-center">
              <p className="text-sm text-gray-600">
                Already have an account?{" "}
                <a href="/login" className="text-blue-600 hover:text-blue-700 font-semibold">
                  Sign in
                </a>
              </p>
            </div>
          </CardFooter>
          
          {/* Bottom accent */}
          <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-yellow-400/50 to-transparent" />
        </Card>
        
        {/* Floating decoration */}
        <div className="absolute -z-10 top-1/2 right-4 w-4 h-4 bg-yellow-400 rounded-full animate-bounce delay-300" />
        <div className="absolute -z-10 bottom-8 left-4 w-3 h-3 bg-blue-400 rounded-full animate-bounce delay-700" />
      </div>
      
    </div>
  );
}
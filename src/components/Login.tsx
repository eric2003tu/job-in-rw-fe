"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { useState, useEffect } from "react";
import { loginUser } from "@/lib/authClient";
import { 
  Mail, 
  Lock, 
  Eye, 
  EyeOff, 
  LogIn, 
  Sparkles, 
  ArrowRight,
  KeyRound,
  Fingerprint,
  Shield,
  UserCircle,
  AlertCircle,
  CheckCircle
} from "lucide-react";
import { cn } from "@/lib/utils";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });
  const [isAnimating, setIsAnimating] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loginAttempts, setLoginAttempts] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    setIsAnimating(true);
    
    // Check for saved credentials
    const savedEmail = localStorage.getItem("rememberedEmail");
    if (savedEmail) {
      setFormData(prev => ({ ...prev, email: savedEmail, rememberMe: true }));
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({ 
      ...prev, 
      [name]: type === "checkbox" ? checked : value 
    }));
    
    // Clear error for this field
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }
    
    if (!formData.password) {
      newErrors.password = "Password is required";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const simulateLogin = async () => {
    // In a real app, this would be an API call
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Mock authentication
        const validEmail = "user@example.com";
        const validPassword = "password123";
        
        if (formData.email === validEmail && formData.password === validPassword) {
          resolve({ success: true, token: "mock-jwt-token" });
        } else {
          reject(new Error("Invalid credentials"));
        }
      }, 1200);
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsLoading(true);
    setLoginAttempts(prev => prev + 1);
    
    try {
      const result = await loginUser(formData.email, formData.password);
      // Save email if "Remember me" is checked
      if (formData.rememberMe) {
        localStorage.setItem("rememberedEmail", formData.email);
      } else {
        localStorage.removeItem("rememberedEmail");
      }
      setErrors(prev => ({ ...prev, success: "Login successful! Redirecting..." }));
      setTimeout(() => {
        window.location.href = "/dashboard";
      }, 1500);
    } catch (error) {
      console.error("Login error:", error);
      setErrors(prev => ({ 
        ...prev, 
        form: `Invalid credentials. Attempt ${loginAttempts + 1} of 5.`
      }));
    } finally {
      setIsLoading(false);
    }
  };

  const handleForgotPassword = () => {
    // In real app, this would trigger password reset flow
    alert("Password reset link sent to your email!");
  };

  const socialLogins = [
    { provider: "Google", icon: "🔐", color: "bg-white border-gray-300 hover:bg-gray-50" },
    { provider: "GitHub", icon: "💻", color: "bg-gray-900 text-white hover:bg-gray-800 border-gray-900" },
    { provider: "LinkedIn", icon: "💼", color: "bg-blue-700 text-white hover:bg-blue-800 border-blue-700" },
  ];

  return (
    <div className={`w-full max-w-md mx-auto transition-all duration-700 ${isAnimating ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
      {/* Background decorative elements */}
      <div className="relative">
        <div className="absolute -top-6 -right-6 w-32 h-32 bg-blue-400/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-6 -left-6 w-40 h-40 bg-yellow-400/5 rounded-full blur-3xl" />
        
        <Card className="relative bg-gradient-to-br from-white to-blue-50/50 backdrop-blur-sm border-2 border-blue-100/50 shadow-2xl shadow-blue-200/20 overflow-hidden group">
          {/* Animated header border */}
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-yellow-400 to-blue-500 animate-pulse" />
          
          <CardHeader className="pb-6 relative">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2.5 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl shadow-lg group-hover:scale-105 transition-transform duration-300">
                <LogIn className="h-6 w-6 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-700 to-blue-900 bg-clip-text text-transparent">
                  Welcome Back
                </h2>
                <p className="text-muted-foreground mt-1 flex items-center gap-2">
                  <Sparkles className="h-4 w-4 text-yellow-500" />
                  Sign in to continue your journey
                </p>
              </div>
            </div>
          </CardHeader>
          
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Email Field */}
              <div className="space-y-2 group">
                <div className="flex items-center justify-between">
                  <Label htmlFor="email" className="text-sm font-medium text-blue-800/80 flex items-center gap-2">
                    <Mail className="h-4 w-4" />
                    Email Address
                  </Label>
                  {errors.email && (
                    <span className="text-xs text-rose-600 font-medium flex items-center gap-1">
                      <AlertCircle className="h-3 w-3" />
                      {errors.email}
                    </span>
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
                      errors.email && "border-rose-300 focus:border-rose-400 focus:ring-rose-200",
                      !errors.email && formData.email && "border-emerald-200"
                    )}
                  />
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-blue-400" />
                  {!errors.email && formData.email && (
                    <CheckCircle className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-emerald-500" />
                  )}
                </div>
              </div>
              
              {/* Password Field */}
              <div className="space-y-2 group">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password" className="text-sm font-medium text-blue-800/80 flex items-center gap-2">
                    <KeyRound className="h-4 w-4" />
                    Password
                  </Label>
                  {errors.password && (
                    <span className="text-xs text-rose-600 font-medium flex items-center gap-1">
                      <AlertCircle className="h-3 w-3" />
                      {errors.password}
                    </span>
                  )}
                </div>
                <div className="relative">
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    className={cn(
                      "border-2 border-blue-100 bg-white text-gray-900 focus:border-blue-400 focus:ring-2 focus:ring-blue-200 transition-all duration-300 group-hover:border-blue-300 rounded-xl px-4 py-3 pl-10 pr-10",
                      errors.password && "border-rose-300 focus:border-rose-400 focus:ring-rose-200",
                      !errors.password && formData.password && "border-emerald-200"
                    )}
                  />
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-blue-400" />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>
                
                {/* Forgot Password */}
                <div className="flex justify-end">
                  <button
                    type="button"
                    onClick={handleForgotPassword}
                    className="text-sm text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1"
                  >
                    <KeyRound className="h-3 w-3" />
                    Forgot password?
                  </button>
                </div>
              </div>
              
              {/* Remember Me & Security */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="rememberMe"
                    name="rememberMe"
                    checked={formData.rememberMe}
                    onChange={handleChange}
                    className="h-4 w-4 text-blue-600 border-blue-300 rounded focus:ring-blue-500"
                  />
                  <Label htmlFor="rememberMe" className="text-sm text-gray-700">
                    Remember me
                  </Label>
                </div>
                
                <div className="flex items-center gap-1 text-xs text-gray-500">
                  <Shield className="h-3 w-3 text-emerald-500" />
                  <span>Secure connection</span>
                </div>
              </div>
              
              {/* Error/Success Message */}
              {(errors.form || errors.success) && (
                <div className={cn(
                  "p-3 rounded-xl border",
                  errors.success 
                    ? "bg-emerald-50 border-emerald-200" 
                    : "bg-rose-50 border-rose-200"
                )}>
                  <div className="flex items-start gap-2">
                    {errors.success ? (
                      <CheckCircle className="h-4 w-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                    ) : (
                      <AlertCircle className="h-4 w-4 text-rose-500 mt-0.5 flex-shrink-0" />
                    )}
                    <p className={cn(
                      "text-sm font-medium",
                      errors.success ? "text-emerald-700" : "text-rose-700"
                    )}>
                      {errors.success || errors.form}
                    </p>
                  </div>
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
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
              >
                <div className="flex items-center justify-center gap-3 relative z-10">
                  {isLoading ? (
                    <>
                      <div className="h-5 w-5 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                      <span>Signing In...</span>
                    </>
                  ) : (
                    <>
                      <span>Sign In</span>
                      <ArrowRight className={`h-5 w-5 transition-transform duration-300 ${isHovered ? 'translate-x-1' : ''}`} />
                    </>
                  )}
                </div>
                
                {/* Button shimmer effect */}
                <div className="absolute inset-0 -translate-x-full group-hover/btn:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
              </Button>
            </form>
            
          </CardContent>
          
          <CardFooter className="pt-0">
            <div className="w-full text-center space-y-2">
              <p className="text-sm text-gray-600">
                Don't have an account?{" "}
                <a href="/signup" className="text-blue-600 hover:text-blue-700 font-semibold">
                  Sign up
                </a>
              </p>
              <div className="flex items-center justify-center gap-2 text-xs text-gray-500">
                <Fingerprint className="h-3 w-3 text-blue-500" />
                <span>Two-factor authentication available</span>
              </div>
            </div>
          </CardFooter>
          
          {/* Bottom accent */}
          <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-yellow-400/50 to-transparent" />
        </Card>
        
        {/* Floating decoration */}
        <div className="absolute -z-10 top-1/3 right-4 w-3 h-3 bg-blue-400 rounded-full animate-bounce delay-200" />
        <div className="absolute -z-10 bottom-1/4 left-4 w-2 h-2 bg-yellow-400 rounded-full animate-bounce delay-500" />
        <div className="absolute -z-10 top-2/3 right-8 w-4 h-4 bg-purple-400/30 rounded-full animate-pulse" />
      </div>
      
    </div>
  );
}
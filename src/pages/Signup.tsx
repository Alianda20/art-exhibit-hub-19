
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { Loader2, Building } from "lucide-react";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { toast } = useToast();
  const { signup } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    
    // Validation
    if (!name || !email || !phone || !password || !confirmPassword) {
      setError("Please fill in all fields");
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }
    
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      toast({
        title: "Error",
        description: "Passwords do not match",
        variant: "destructive",
      });
      return;
    }
    
    setLoading(true);
    
    try {
      console.log("Attempting signup with:", { name, email });
      const success = await signup(name, email, password, phone);
      
      console.log("Signup result:", success);
      
      if (success) {
        toast({
          title: "Success",
          description: "Account created successfully! You are now logged in.",
        });
        navigate("/");
      } else {
        setError("Failed to create account. This email may already be registered.");
        toast({
          title: "Error",
          description: "Failed to create account. This email may already be registered.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Signup error:", error);
      setError("Connection error. Please try again later.");
      toast({
        title: "Connection Error",
        description: "Could not reach the server. Please check if the server is running.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen py-12 px-4 flex items-center justify-center bg-secondary">
      <Card className="w-full max-w-md animate-fade-in">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-serif text-center">Create an Account</CardTitle>
          <CardDescription className="text-center">
            Enter your details to create your personal account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                placeholder="John Kamau"
                value={name}
                onChange={(e) => setName(e.target.value)}
                disabled={loading}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={loading}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                placeholder="+254 712 345 678"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                disabled={loading}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={loading}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <Input
                id="confirmPassword"
                type="password"
                placeholder="••••••••"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                disabled={loading}
              />
            </div>
            {error && (
              <div className="text-red-500 text-sm py-2">{error}</div>
            )}
            <Button 
              type="submit" 
              className="w-full bg-gold hover:bg-gold-dark text-white"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" /> 
                  Creating account...
                </>
              ) : (
                "Create Account"
              )}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col space-y-2">
          <div className="text-center text-sm w-full">
            Already have an account?{" "}
            <Link to="/login" className="text-gold hover:underline">
              Sign in
            </Link>
          </div>
          <div className="text-center text-sm w-full border-t border-gray-200 pt-4 mt-2">
            <Button 
              variant="outline" 
              className="w-full flex items-center justify-center" 
              onClick={() => navigate('/corporate-signup')}
            >
              <Building className="mr-2 h-4 w-4" />
              Register as a Business
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Signup;

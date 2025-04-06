import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import axios from "axios";
import { toast } from "sonner";
import { Link, useNavigate } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();
  const [signupInput, setSignupInput] = useState({
    name: "",
    email: "",
    password: "",
    role: "student",
  });

  const [loading, setLoading] = useState(false);

  // Handle input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSignupInput((prev) => ({ ...prev, [name]: value }));
  };

  // Handle role selection
  const handleRoleChange = (role) => {
    setSignupInput((prev) => ({ ...prev, role }));
  };

  // Handle signup submission
  const handleSignup = async () => {
    const { name, email, password, role } = signupInput;

    // Form validation
    if (!name || !email || !password) {
      toast.error("All fields are required!");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post("http://localhost:5000/api/v1/auth/registration", { name, email, password, role }, { withCredentials: true });

      toast.success(response.data.message || "Signup successful.");
      setSignupInput({ name: "", email: "", password: "", role: "student" }); // Reset form
      navigate("/login"); // Redirect to login after successful signup
    } catch (error) {
      toast.error(error.response?.data?.message || "Signup failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center w-full justify-center mt-10">
      <Card className="w-[400px]">
        <CardHeader>
          <CardTitle className="text-center text-xl font-semibold">Create Your Account</CardTitle>
        </CardHeader>

        <CardContent className="space-y-4">
          {/* Role Selection */}
          <Tabs defaultValue="student" onValueChange={handleRoleChange}>
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="student">Student</TabsTrigger>
              <TabsTrigger value="instructor">Instructor</TabsTrigger>
            </TabsList>
          </Tabs>

          {/* Form Inputs */}
          <div>
            <Label>Name</Label>
            <Input type="text" name="name" value={signupInput.name} onChange={handleInputChange} placeholder="Enter your name" required />
          </div>

          <div>
            <Label>Email</Label>
            <Input type="email" name="email" value={signupInput.email} onChange={handleInputChange} placeholder="Enter your email" required />
          </div>

          <div>
            <Label>Password</Label>
            <Input type="password" name="password" value={signupInput.password} onChange={handleInputChange} placeholder="Enter your password" required />
          </div>
        </CardContent>

        <CardFooter className="flex flex-col gap-3">
          <Button disabled={loading} onClick={handleSignup} className="w-full">
            {loading ? "Creating Account..." : "Create Account"}
          </Button>

          <p className="text-sm text-center text-gray-600">
            Already have an account? <Link to="/login" className="text-blue-600 hover:underline">Login</Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Signup;

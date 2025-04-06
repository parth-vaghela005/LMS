import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import axios from "axios";
import { toast } from "sonner";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { userLoggedIn } from "@/slices/AuthSlice";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loginInput, setLoginInput] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);

  // Handle input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setLoginInput((prev) => ({ ...prev, [name]: value }));
  };

  // Handle Login submission
  const handleLogin = async () => {
    const { email, password } = loginInput;

    if (!email || !password) {
      toast.error("All fields are required!");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post("http://localhost:5000/api/v1/auth/login", { email, password }, { withCredentials: true });

      toast.success(response.data.message || "Login successful.");
      dispatch(userLoggedIn({ user: response.data.user }));

      if (response.data.user.role === "student") navigate("/");
      else if (response.data.user.role === "instructor") navigate("/admin/dashboard");
    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center w-full justify-center mt-10">
      <Card className="w-[400px]">
        <CardHeader>
          <CardTitle className="text-center text-xl font-semibold">Welcome Back</CardTitle>
        </CardHeader>

        <CardContent className="space-y-4">
          <div>
            <Label>Email</Label>
            <Input type="email" name="email" value={loginInput.email} onChange={handleInputChange} placeholder="Enter your email" required />
          </div>

          <div>
            <Label>Password</Label>
            <Input type="password" name="password" value={loginInput.password} onChange={handleInputChange} placeholder="Enter your password" required />
          </div>
        </CardContent>

        <CardFooter className="flex flex-col gap-3">
          <Button disabled={loading} onClick={handleLogin} className="w-full">
            {loading ? "Logging in..." : "Login"}
          </Button>

          <p className="text-sm text-center text-gray-600">
            Don't have an account? <Link to="/signup" className="text-blue-600 hover:underline">Sign up</Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Login;

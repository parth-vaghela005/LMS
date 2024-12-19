import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useSelector } from "react-redux";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useLoginUserMutation, useRegisterUserMutation } from "@/slices/api/AuthApi.js";
import { Loader2 } from "lucide-react";

const Login = () => {
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  const [signupInput, setsignupInput] = useState({ name: "", email: "", password: "" });
  const [loginInput, setLoginInput] = useState({ email: "", password: "" });

  const [
    registerUser,
    { data: registerData, error: registerError, isLoading: registerIsLoading, isSuccess: registerIsSuccess },
  ] = useRegisterUserMutation();


  const [
    loginUser,
    { data: loginData, error: loginError, isLoading: loginIsLoading, isSuccess: loginIsSuccess },
  ] = useLoginUserMutation();


  const InputHandler = (e, type) => {
    const { name, value } = e.target;
    if (type === "signup") {
      setsignupInput((prevState) => ({ ...prevState, [name]: value }));
    } else if (type === "login") {
      setLoginInput((prevState) => ({ ...prevState, [name]: value }));
    }
  };

  const handleRegistration = async (type) => {
    const data = type === "signup" ? signupInput : loginInput;
    if (!data.email || !data.password || (type === "signup" && !data.name)) {
      toast.error("All fields are required!");
      return;
    }

    const action = type === "signup" ? registerUser : loginUser;
    try {
      await action(data);
    } catch (error) {
      console.error("Error during action:", error);
    }
  };

  useEffect(() => {
    if (registerIsSuccess && registerData) {
      toast.success(registerData.message || "Signup successful.");
    }
    if (registerError) {
      toast.error(registerError.data?.message || "Signup failed.");
    }
    if (loginIsSuccess && loginData) {
      toast.success(loginData.message || "Login successful.");

    }
    if (loginError) {
      toast.error(loginError.data?.message || "Login failed.");
    }
  }, [registerIsSuccess, registerError, loginIsSuccess, loginError]);

  return (
    <div className="flex items-center w-full justify-center mt-20">
      <Tabs defaultValue="login" className="w-[400px]">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="signup">Signup</TabsTrigger>
          <TabsTrigger value="login">Login</TabsTrigger>
        </TabsList>


        <TabsContent value="signup">
          <Card>
            <CardHeader>
              <CardTitle>Signup</CardTitle>
              <CardDescription>Create a new account and click signup when you're done.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="space-y-1">
                <Label htmlFor="name">Name</Label>
                <Input
                  type="text"
                  name="name"
                  value={signupInput.name}
                  onChange={(e) => InputHandler(e, "signup")}
                  placeholder="Eg. John Doe"
                  required
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="email">Email</Label>
                <Input
                  type="email"
                  name="email"
                  value={signupInput.email}
                  onChange={(e) => InputHandler(e, "signup")}
                  placeholder="Email"
                  required
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="password">Password</Label>
                <Input
                  type="password"
                  name="password"
                  value={signupInput.password}
                  onChange={(e) => InputHandler(e, "signup")}
                  placeholder="Password"
                  required
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button
                disabled={registerIsLoading}
                onClick={() => handleRegistration("signup")}
              >
                {registerIsLoading ? "Please wait..." : "Signup"}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="login">
          <Card>
            <CardHeader>
              <CardTitle>Login</CardTitle>
              <CardDescription>Login with your email and password.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="space-y-1">
                <Label htmlFor="email">Email</Label>
                <Input
                  type="email"
                  name="email"
                  value={loginInput.email}
                  onChange={(e) => InputHandler(e, "login")}
                  placeholder="Email"
                  required
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="password">Password</Label>
                <Input
                  type="password"
                  name="password"
                  value={loginInput.password}
                  onChange={(e) => InputHandler(e, "login")}
                  placeholder="Password"
                  required
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button
                disabled={loginIsLoading}
                onClick={() => handleRegistration("login")}
              >
                {loginIsLoading ? <Loader2 className="mr-2 animate-spin" /> : "Login"}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Login;

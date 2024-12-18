import React from 'react'
import { Button } from "@/components/ui/button";
import { useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LOGIN } from './comm';
const Login = () => {
  const [signupInput, setsignupInput] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [loginInput, setLoginInput] = useState({
    email: '',
    password: '',
  });
 const InputHandler = (e, type) => {
  const { name, value } = e.target;
  
  if (type === "signup") {
    setsignupInput(prevState => ({
      ...prevState, 
      [name]: value
    }));
  }
  if (type === "login") {
    setLoginInput(prevState => ({
      ...prevState, 
      [name]: value
    }));
  }
};

const handleRegistration  = (type) =>{
  const data  = type ===  "signup"?(signupInput):(loginInput)
  console.log(data);
}
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
              <CardDescription>
                Create a new account and click signup when you're done.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="space-y-1">
                <Label htmlFor="name">Name</Label>
                <Input
                  type="text"
                  name="name"
                  value={signupInput.name}
                  onChange={(e) => InputHandler(e, "signup")}
                  placeholder="Eg. parth"
                  required="true"
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="username">Email</Label>
                <Input
                  type="email"
                  name={LOGIN.EMAIL}
                  value={signupInput.email}
                  onChange={(e) => InputHandler(e, "signup")}
                  placeholder={LOGIN.EMAIL}
                  required="true"
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="username">Password</Label>
                <Input
                  type="password"
                  name="password"
                  value={signupInput.password}
                  onChange={(e) => InputHandler(e, "signup")}
                  placeholder="Eg. xyz"
                  required="true"
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button
                // disabled={registerIsLoading}
                onClick={() => handleRegistration("signup")}
              >
                {/* {registerIsLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please
                    wait
                  </>
                ) : (
                  "Signup"
                )} */}
                Signup
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        <TabsContent value="login">
          <Card>
            <CardHeader>
              <CardTitle>Login</CardTitle>
              <CardDescription>
                Login your password here. After signup, you'll be logged in.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="space-y-1">
                <Label htmlFor="current">Email</Label>
                <Input
                  type="email"
                  name="email"
                  value={loginInput.email}
                  onChange={(e) => InputHandler(e, "login")}
                  placeholder="Eg. parthl@gmail.com"
                  required="true"
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="new">Password</Label>
                <Input
                  type="password"
                  name="password"
                  value={loginInput.password}
                  onChange={(e) => InputHandler(e, "login")}
                  placeholder="Eg. xyz"
                  required="true"
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button
                // disabled={loginIsLoading}
                onClick={() => handleRegistration("login")}
              >
                {/* {loginIsLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please
                    wait
                  </>
                ) : (
                  "Login"
                )} */}
                Login
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
export default Login

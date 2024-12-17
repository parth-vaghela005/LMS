import React from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

function Create() {
  return (
    <div>
    <Tabs defaultValue="account" className="w-[400px]">
  <TabsList>
    <TabsTrigger value="parth">Account</TabsTrigger>
    <TabsTrigger value="nandu">Password</TabsTrigger>
  </TabsList>
  <TabsContent value="parth">Make changes to your account here.</TabsContent>
  <TabsContent value="nandu">Change your password here.</TabsContent>
</Tabs>

    </div>
  )
}

export default Create

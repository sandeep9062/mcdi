"use client";

import React, { useState } from "react";
import { 
  User, 
  Lock, 
  Bell, 
  Camera, 
  Save
} from "lucide-react";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";

export default function StudentSettingsPage() {
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = () => {
    setIsSaving(true);
    // Simulate API call
    setTimeout(() => {
      setIsSaving(false);
      toast.success("Settings updated successfully!");
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-12">
      <div className="bg-white border-b border-gray-200 py-10">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
          <p className="text-gray-500 mt-1">Manage your professional profile and account preferences.</p>
        </div>
      </div>

      <div className="container mx-auto px-4 mt-8">
        <Tabs defaultValue="profile" className="flex flex-col lg:flex-row gap-8">
          
          {/* Settings Navigation */}
          <TabsList className="flex lg:flex-col h-auto bg-transparent gap-2 p-0 lg:w-64">
            <SettingsTrigger value="profile" icon={<User size={18} />} label="Public Profile" />
            <SettingsTrigger value="account" icon={<Lock size={18} />} label="Security" />
            <SettingsTrigger value="notifications" icon={<Bell size={18} />} label="Notifications" />
          </TabsList>

          {/* Settings Content */}
          <div className="flex-1">
            
            {/* PROFILE TAB */}
            <TabsContent value="profile" className="mt-0 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Professional Profile</CardTitle>
                  <CardDescription>This information will be used for your course certificates.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center gap-6">
                    <div className="relative group">
                      <div className="h-24 w-24 rounded-full bg-teal-100 border-2 border-white shadow-md overflow-hidden">
                        <User className="h-full w-full p-4 text-teal-600" />
                      </div>
                      <button className="absolute inset-0 bg-black/40 rounded-full opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white">
                        <Camera size={20} />
                      </button>
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900">Profile Picture</h4>
                      <p className="text-sm text-gray-500">JPG, GIF or PNG. Max size of 2MB.</p>
                      <div className="flex gap-2 mt-2">
                        <Button size="sm" variant="outline">Upload New</Button>
                        <Button size="sm" variant="ghost" className="text-red-500">Remove</Button>
                      </div>
                    </div>
                  </div>

                  <Separator />

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Full Name</label>
                      <Input placeholder="Sandeep Saini" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Email Address</label>
                      <Input placeholder="email@maldonite.com" disabled />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Dental Reg. Number</label>
                      <Input placeholder="DCI-XXXXX" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Specialization</label>
                      <Input placeholder="Endodontics / General Dentistry" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="flex justify-end">
                <Button onClick={handleSave} disabled={isSaving} className="bg-teal-600 hover:bg-teal-700">
                  {isSaving ? "Saving..." : "Save Changes"}
                  <Save className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </TabsContent>

            {/* SECURITY TAB */}
            <TabsContent value="account" className="mt-0 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Password Management</CardTitle>
                  <CardDescription>Keep your account secure with a strong password.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Current Password</label>
                    <Input type="password" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">New Password</label>
                    <Input type="password" />
                  </div>
                  <Button variant="outline">Update Password</Button>
                </CardContent>
              </Card>

              <Card className="border-red-100">
                <CardHeader>
                  <CardTitle className="text-red-600">Danger Zone</CardTitle>
                  <CardDescription>Permanently delete your account and all learning data.</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button variant="destructive">Delete Account</Button>
                </CardContent>
              </Card>
            </TabsContent>

            {/* NOTIFICATIONS TAB */}
            <TabsContent value="notifications" className="mt-0 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Email Preferences</CardTitle>
                  <CardDescription>Control which updates you receive via email.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <NotificationToggle 
                    title="Course Announcements" 
                    desc="Updates regarding new lessons or schedule changes." 
                    defaultChecked 
                  />
                  <NotificationToggle 
                    title="Exam Results" 
                    desc="Receive a summary of your mock test scores immediately." 
                    defaultChecked 
                  />
                  <NotificationToggle 
                    title="Promotional Offers" 
                    desc="Discounts on new clinical workshops or test series." 
                  />
                </CardContent>
              </Card>
            </TabsContent>

          </div>
        </Tabs>
      </div>
    </div>
  );
}

// Sub-components
function SettingsTrigger({ value, icon, label }: { value: string; icon: React.ReactNode; label: string }) {
  return (
    <TabsTrigger 
      value={value} 
      className="w-full justify-start gap-3 px-4 py-3 data-[state=active]:bg-teal-50 data-[state=active]:text-teal-700 data-[state=active]:shadow-none transition-all rounded-lg"
    >
      {icon}
      <span className="font-medium">{label}</span>
    </TabsTrigger>
  );
}

function NotificationToggle({ title, desc, defaultChecked = false }: { title: string; desc: string; defaultChecked?: boolean }) {
  return (
    <div className="flex items-center justify-between gap-4">
      <div>
        <h4 className="text-sm font-bold text-gray-900">{title}</h4>
        <p className="text-xs text-gray-500">{desc}</p>
      </div>
      <Switch defaultChecked={defaultChecked} />
    </div>
  );
}
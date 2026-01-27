"use client";

import React, { useState } from "react";
import { 
  Settings, 
  ShieldAlert, 
  Globe, 
  Database, 
  CreditCard, 
  Mail, 
  Search,
  Save,
  RefreshCcw
} from "lucide-react";
import { motion } from "framer-motion";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle, 
  CardDescription 
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";

export default function AdminSettingsPage() {
  const [isUpdating, setIsUpdating] = useState(false);

  const handleUpdate = (section: string) => {
    setIsUpdating(true);
    setTimeout(() => {
      setIsUpdating(false);
      toast.success(`${section} settings updated successfully!`);
    }, 1200);
  };

  return (
    <div className="p-6 space-y-8 bg-[#F8F9FC] min-h-screen">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">System Configuration</h1>
          <p className="text-gray-500">Global controls and environment settings for Maldonite.</p>
        </div>
        <Button variant="outline" className="bg-white">
          <RefreshCcw className="mr-2 h-4 w-4" /> Clear System Cache
        </Button>
      </div>

      <Tabs defaultValue="general" className="space-y-6">
        <TabsList className="bg-white border border-gray-200 p-1 h-auto flex flex-wrap lg:inline-flex">
          <TabsTrigger value="general" className="px-6 py-2">General</TabsTrigger>
          <TabsTrigger value="payments" className="px-6 py-2">Payments</TabsTrigger>
          <TabsTrigger value="auth" className="px-6 py-2">Security & Auth</TabsTrigger>
          <TabsTrigger value="seo" className="px-6 py-2">SEO & Social</TabsTrigger>
        </TabsList>

        {/* GENERAL SETTINGS */}
        <TabsContent value="general" className="space-y-6">
          <Card className="border-none shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Globe className="h-5 w-5 text-teal-600" /> Site Metadata
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <SettingInput label="Platform Name" placeholder="MCDI" />
                <SettingInput label="Support Email" placeholder="support@mcdi.com" />
                <div className="space-y-2 md:col-span-2">
                  <label className="text-sm font-semibold">Maintenance Mode</label>
                  <div className="flex items-center justify-between p-4 bg-orange-50 rounded-lg border border-orange-100">
                    <p className="text-sm text-orange-800">Disable public access to the platform while updating.</p>
                    <Switch />
                  </div>
                </div>
              </div>
              <Button onClick={() => handleUpdate("General")} className="bg-teal-600">Save General Settings</Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* PAYMENTS SETTINGS */}
        <TabsContent value="payments" className="space-y-6">
          <Card className="border-none shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CreditCard className="h-5 w-5 text-blue-600" /> Payment Gateways
              </CardTitle>
              <CardDescription>Configure Razorpay and Stripe credentials for Maldonite transactions.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h4 className="text-sm font-bold uppercase tracking-wider text-gray-400">Razorpay (Primary)</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <SettingInput label="Key ID" type="password" placeholder="rzp_live_..." />
                  <SettingInput label="Key Secret" type="password" placeholder="••••••••••••" />
                </div>
              </div>
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 bg-white rounded border flex items-center justify-center font-bold text-xs">TEST</div>
                  <p className="text-sm font-medium">Enable Sandbox Mode</p>
                </div>
                <Switch />
              </div>
              <Button onClick={() => handleUpdate("Payment")} className="bg-teal-600">Update Gateway Keys</Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* SECURITY SETTINGS */}
        <TabsContent value="auth" className="space-y-6">
          <Card className="border-none shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-red-600">
                <ShieldAlert className="h-5 w-5" /> Access Control
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <ToggleSection title="Two-Factor Authentication" description="Require 2FA for all admin accounts." />
              <ToggleSection title="New Registrations" description="Allow new students to create accounts." defaultChecked />
              <ToggleSection title="Password Expiry" description="Force admins to change passwords every 90 days." />
              <Button variant="outline" className="border-red-200 text-red-600 hover:bg-red-50">Manage Admin Permissions</Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

// Reusable Helper Components
function SettingInput({ label, ...props }: any) {
  return (
    <div className="space-y-2">
      <label className="text-sm font-semibold text-gray-700">{label}</label>
      <Input className="bg-white" {...props} />
    </div>
  );
}

function ToggleSection({ title, description, defaultChecked = false }: any) {
  return (
    <div className="flex items-center justify-between p-4 rounded-xl border border-gray-100 bg-white">
      <div>
        <p className="text-sm font-bold text-gray-900">{title}</p>
        <p className="text-xs text-gray-500">{description}</p>
      </div>
      <Switch defaultChecked={defaultChecked} />
    </div>
  );
}
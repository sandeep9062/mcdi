import React from 'react'
import Link from 'next/link'
import { SidebarTrigger } from '@/components/ui/sidebar'
import { Separator } from '@/components/ui/separator'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
  Users,
  BookOpen,
  ShoppingCart,
  MessageSquare,
  TrendingUp,
  Star,
  IndianRupee,
  Eye
} from 'lucide-react'
import { courses } from '@/data/courses'
import { reviews } from '@/data/reviews'

// Mock data for demonstration - in a real app, this would come from APIs
const mockStats = {
  totalUsers: 1247,
  totalCourses: courses.length,
  totalRevenue: 2847500, // ₹28.47 lakhs
  totalReviews: reviews.length,
  averageRating: 4.7,
  recentEnrollments: 89
}

const recentReviews = reviews.slice(0, 3)

const page = () => {
  return (
    <>
      <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
        <div className="flex items-center gap-2 px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem className="hidden md:block">
                <BreadcrumbLink href="/admin-dashboard">
                  Admin Dashboard
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="hidden md:block" />
              <BreadcrumbItem>
                <BreadcrumbPage>Overview</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </header>

      <div className="flex flex-1 flex-col gap-6 p-4 pt-0">
        {/* Welcome Section */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Dashboard Overview</h1>
            <p className="text-muted-foreground">
              Welcome back! Here's what's happening with Master Clinic Dental Institute.
            </p>
          </div>
          <div className="flex gap-2">
            <Button asChild variant="outline">
              <Link href="/admin-dashboard/analytics">
                <TrendingUp className="mr-2 h-4 w-4" />
                View Analytics
              </Link>
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Users</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{mockStats.totalUsers.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">
                +{mockStats.recentEnrollments} new this month
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Courses</CardTitle>
              <BookOpen className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{mockStats.totalCourses}</div>
              <p className="text-xs text-muted-foreground">
                Active dental education programs
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
              <IndianRupee className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                ₹{(mockStats.totalRevenue / 100000).toFixed(2)}L
              </div>
              <p className="text-xs text-muted-foreground">
                +12% from last month
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Average Rating</CardTitle>
              <Star className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{mockStats.averageRating}</div>
              <p className="text-xs text-muted-foreground">
                Based on {mockStats.totalReviews} reviews
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Grid */}
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Recent Reviews */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageSquare className="h-5 w-5" />
                Recent Reviews
              </CardTitle>
              <CardDescription>
                Latest feedback from our students
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {recentReviews.map((review) => (
                <div key={review.id} className="flex gap-4">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={review.avatar} alt={review.name} />
                    <AvatarFallback>{review.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-medium">{review.name}</p>
                      <Badge variant="secondary" className="text-xs">
                        {review.rating} ⭐
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground">{review.course}</p>
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {review.text}
                    </p>
                  </div>
                </div>
              ))}
              <Button asChild variant="outline" className="w-full">
                <Link href="/admin-dashboard/reviews">
                  <Eye className="mr-2 h-4 w-4" />
                  View All Reviews
                </Link>
              </Button>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>
                Manage your platform efficiently
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-3">
              <Button asChild className="justify-start">
                <Link href="/admin-dashboard/users">
                  <Users className="mr-2 h-4 w-4" />
                  Manage Users
                </Link>
              </Button>
              <Button asChild variant="outline" className="justify-start">
                <Link href="/admin-dashboard/courses">
                  <BookOpen className="mr-2 h-4 w-4" />
                  Manage Courses
                </Link>
              </Button>
              <Button asChild variant="outline" className="justify-start">
                <Link href="/admin-dashboard/orders">
                  <ShoppingCart className="mr-2 h-4 w-4" />
                  View Orders
                </Link>
              </Button>
              <Button asChild variant="outline" className="justify-start">
                <Link href="/admin-dashboard/settings">
                  <TrendingUp className="mr-2 h-4 w-4" />
                  Platform Settings
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Popular Courses */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="h-5 w-5" />
              Popular Courses
            </CardTitle>
            <CardDescription>
              Top performing courses this month
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {courses.filter(course => course.popular).slice(0, 3).map((course) => (
                <div key={course.id} className="flex gap-3 p-3 border rounded-lg">
                  <div className="flex-1">
                    <h4 className="font-medium text-sm line-clamp-2">{course.title}</h4>
                    <p className="text-xs text-muted-foreground mt-1">
                      {course.reviewCount} reviews • {course.rating} ⭐
                    </p>
                    <p className="text-sm font-semibold text-primary mt-1">
                      ₹{course.price.toLocaleString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <Button asChild variant="outline" className="w-full mt-4">
              <Link href="/admin-dashboard/courses">
                View All Courses
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </>
  )
}

export default page

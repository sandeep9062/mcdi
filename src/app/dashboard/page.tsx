import { auth } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { headers } from 'next/headers'
import { LogoutButton } from '@/components/LogoutButton'
import { 
  BookOpen, 
  LayoutDashboard, 
  Settings, 
  History, 
  GraduationCap, 
  LineChart 
} from 'lucide-react'

export default async function DashboardPage() {
  const session = await auth.api.getSession({
    headers: await headers()
  })

  if (!session) redirect('/login')

  return (
    <div className="flex min-h-screen bg-[#F8FAFC]">
  
    

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col">
        <header className="h-16 bg-white border-b px-8 flex items-center justify-between sticky top-0 z-10">
          <h2 className="text-sm font-medium text-slate-500 uppercase tracking-wider">Dashboard Overview</h2>
          <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="text-sm font-semibold text-slate-900">{session.user.name}</p>
                <p className="text-xs text-slate-500">Student</p>
              </div>
            <div className="h-10 w-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 border-2 border-white shadow-sm flex items-center justify-center text-white font-bold">
              {session.user.name?.[0]}
            </div>
          </div>
        </header>

        <main className="p-8 max-w-7xl mx-auto w-full space-y-8">
          {/* Welcome Section */}
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Welcome back, {session.user.name.split(' ')[0]}!</h1>
            <p className="text-slate-500 mt-1">Here is what is happening with your learning today.</p>
          </div>

          {/* Stats/Quick Info */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <StatCard label="Completed Lessons" value="12" subtext="+2 this week" />
            <StatCard label="Active Test Series" value="04" subtext="2 expiring soon" />
            <StatCard label="Learning Hours" value="28h" subtext="Top 5% of students" />
          </div>

          {/* Featured Sections */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              <SectionHeader title="Enrolled Courses" />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <CourseCard title="Fixed Prosthodontics" progress={65} />
                <CourseCard title="Dental Implantology" progress={20} />
              </div>
            </div>

            <div className="space-y-6">
              <SectionHeader title="Upcoming Tests" />
              <div className="bg-white rounded-2xl border p-5 shadow-sm space-y-4">
                 <p className="text-sm text-slate-400 text-center py-8 italic">No tests scheduled for today.</p>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

// Helper Components for Scannability
function NavItem({ icon, label, active = false }: { icon: React.ReactNode, label: string, active?: boolean }) {
  return (
    <div className={`flex items-center gap-3 px-3 py-2 rounded-lg cursor-pointer transition-colors ${active ? 'bg-blue-600 text-white' : 'text-slate-400 hover:bg-slate-800 hover:text-white'}`}>
      {icon}
      <span className="font-medium">{label}</span>
    </div>
  )
}

function StatCard({ label, value, subtext }: { label: string, value: string, subtext: string }) {
  return (
    <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
      <p className="text-sm font-medium text-slate-500">{label}</p>
      <div className="flex items-baseline gap-2 mt-2">
        <p className="text-3xl font-bold text-slate-900">{value}</p>
        <span className="text-xs font-medium text-green-600 bg-green-50 px-2 py-0.5 rounded-full">{subtext}</span>
      </div>
    </div>
  )
}

function CourseCard({ title, progress }: { title: string, progress: number }) {
  return (
    <div className="bg-white p-5 rounded-xl border group hover:border-blue-200 transition-all cursor-pointer shadow-md hover:shadow-xl h-[520px] flex flex-col">
      <div className="h-48 md:h-56 bg-slate-100 rounded-xl mb-4 overflow-hidden flex-shrink-0">
        <div className="w-full h-full bg-gradient-to-tr from-slate-200 to-slate-50 group-hover:scale-105 transition-transform" />
      </div>
      <h3 className="font-bold text-slate-900 group-hover:text-blue-600 transition-colors flex-shrink-0">{title}</h3>
      <div className="mt-4 space-y-2 flex-grow">
        <div className="flex justify-between text-xs font-semibold">
          <span className="text-slate-500">Progress</span>
          <span className="text-slate-900">{progress}%</span>
        </div>
        <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
          <div className="bg-blue-600 h-full rounded-full" style={{ width: `${progress}%` }} />
        </div>
      </div>
    </div>
  )
}

function SectionHeader({ title }: { title: string }) {
  return (
    <div className="flex justify-between items-center">
      <h2 className="text-xl font-bold text-slate-900">{title}</h2>
      <button className="text-sm font-semibold text-blue-600 hover:text-blue-700">View All</button>
    </div>
  )
}

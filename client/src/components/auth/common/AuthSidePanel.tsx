import AuthMobileLogo from "./AuthMobileLogo";

// ── Left side stats data ──────────────────────────────
const FEATURES = [
  { icon: "📋", text: "Track every application in one place" },
  { icon: "🗂️", text: "Kanban board to visualize your pipeline" },
  { icon: "📊", text: "Dashboard with real-time stats" },
  { icon: "🔔", text: "Never miss a follow-up again" },
];

const STATS = [
  { value: "500+", label: "Job seekers" },
  { value: "10k+", label: "Jobs tracked" },
  { value: "98%", label: "Stay organized" },
];

function AuthSidePanel() {
  return (
    <div
      className='hidden lg:flex lg:w-1/2 flex-col justify-between p-12 sticky top-0 h-screen'
      style={{
        background: "linear-gradient(135deg, #4F46E5 0%, #3730A3 100%)",
      }}
    >
      {/* Logo */}
      <AuthMobileLogo />

      {/* Main copy */}
      <div>
        <h1 className='text-4xl font-bold text-white leading-tight mb-4'>
          Track your job search.
          <br />
          Land your dream role.
        </h1>
        <p className='text-indigo-200 text-lg mb-10'>
          Stop losing track of applications. Organize everything in one place.
        </p>

        {/* Features list */}
        <div className='flex flex-col gap-4 mb-12'>
          {FEATURES.map((f) => (
            <div key={f.text} className='flex items-center gap-3'>
              <span className='text-xl'>{f.icon}</span>
              <span className='text-indigo-100 text-sm'>{f.text}</span>
            </div>
          ))}
        </div>

        {/* Stats */}
        <div className='grid grid-cols-3 gap-4'>
          {STATS.map((s) => (
            <div
              key={s.label}
              className='rounded-xl p-4 text-center'
              style={{ background: "rgba(255,255,255,0.1)" }}
            >
              <p className='text-white font-bold text-xl'>{s.value}</p>
              <p className='text-indigo-200 text-xs mt-1'>{s.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom quote */}
      <p className='text-indigo-300 text-sm'>
        "The best tool I've used during my Canadian job search."
      </p>
    </div>
  );
}

export default AuthSidePanel;

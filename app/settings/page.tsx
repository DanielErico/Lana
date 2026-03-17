"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import Avatar from "@/components/ui/Avatar";
import { useUser, UserData } from "@/components/providers/UserProvider";

const tabs = ["Profile","Instagram","Security","Team","Billing","Activity"];

const activityLog = [
  { action: "Logged in", ip: "192.168.1.1", device: "Chrome · Windows", time: "2 min ago", type: "login" },
  { action: "Carousel published", ip: "192.168.1.1", device: "Chrome · Windows", time: "1 hour ago", type: "publish" },
  { action: "Brand colors updated", ip: "192.168.1.1", device: "Chrome · Windows", time: "3 hours ago", type: "edit" },
  { action: "New post scheduled", ip: "192.168.1.1", device: "Mobile · iOS", time: "Yesterday 6PM", type: "schedule" },
  { action: "Password changed", ip: "10.0.0.5", device: "Chrome · Mac", time: "Mar 14, 2026", type: "security" },
  { action: "2FA enabled", ip: "10.0.0.5", device: "Chrome · Mac", time: "Mar 14, 2026", type: "security" },
];

const teamMembers = [
  { name: "Alex Johnson", role: "Business Owner", email: "alex@company.com", status: "active" },
  { name: "Jamie Smith", role: "Social Media Manager", email: "jamie@company.com", status: "active" },
  { name: "Sam Rivera", role: "Agency Admin", email: "sam@agency.com", status: "pending" },
];

export default function SettingsPage() {
  const router = useRouter();
  const { user, setUser } = useUser();
  const [localUser, setLocalUser] = useState<UserData>(user);
  const [activeTab, setActiveTab] = useState("Profile");
  const [saving, setSaving] = useState(false);
  const [show2FASetup, setShow2FASetup] = useState(false);
  const [instagramConnected, setInstagramConnected] = useState(false);

  const handleSave = async () => {
    setSaving(true);
    await new Promise(r => setTimeout(r, 1200));
    setUser(localUser);
    setSaving(false);
  };

  return (
    <div className="max-w-3xl mx-auto animate-fade-in space-y-8">
      <div className="flex items-center gap-4">
        <button onClick={() => router.back()} className="p-3 bg-white/60 border border-white hover:bg-white rounded-[20px] transition-colors text-clay-muted shadow-sm hover:shadow-clayCard">
          <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24"><path d="M15 18l-6-6 6-6" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </button>
        <div>
          <h1 className="font-black text-4xl text-clay-foreground tracking-tight drop-shadow-sm">Settings</h1>
          <p className="text-clay-muted font-bold text-sm mt-2 uppercase tracking-widest">Manage your account, security, and integrations</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 bg-white/60 backdrop-blur-md p-2 rounded-[24px] border border-white shadow-sm flex-wrap">
        {tabs.map(t => (
          <button key={t} onClick={() => setActiveTab(t)} className={`flex-1 py-2.5 rounded-[16px] text-xs font-black cursor-pointer transition-all min-w-[80px] uppercase tracking-widest ${activeTab === t ? "bg-white text-clay-accent shadow-clayPressed" : "text-clay-muted hover:text-clay-foreground hover:bg-white/60"}`}>{t}</button>
        ))}
      </div>

      {/* Profile */}
      {activeTab === "Profile" && (
        <div className="bg-white/70 backdrop-blur-xl rounded-[40px] border border-white shadow-clayCard p-10 space-y-8">
          <div className="flex items-center gap-6">
            <div className="relative">
              <Avatar name={user.name} size="xl"/>
              <button className="absolute -bottom-1 -right-1 w-8 h-8 bg-clay-accent rounded-full flex items-center justify-center cursor-pointer hover:scale-110 transition-transform shadow-clayButton">
                <svg width="14" height="14" fill="none" stroke="white" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </div>
            <div>
              <h3 className="font-black text-2xl text-clay-foreground tracking-tight drop-shadow-sm">{user.name}</h3>
              <Badge variant="info">{user.role}</Badge>
            </div>
          </div>
          <div className="grid md:grid-cols-2 gap-5">
            {[
              { label: "Full Name", key: "name", placeholder: "Alex Johnson", val: localUser.name },
              { label: "Email Address", key: "email", placeholder: "alex@company.com", val: localUser.email, type: "email" },
              { label: "Company", key: "company", placeholder: "Company name", val: localUser.company },
              { label: "Timezone", key: "timezone", placeholder: "UTC+1", val: localUser.timezone },
            ].map(f => (
              <div key={f.label}>
                <label className="text-[10px] font-black text-clay-muted block mb-2 uppercase tracking-widest px-1">{f.label}</label>
                <input value={f.val} onChange={e => setLocalUser({...localUser, [f.key as keyof typeof localUser]: e.target.value})} type={f.type || "text"} placeholder={f.placeholder} className="w-full px-5 py-4 rounded-[20px] bg-white/50 border border-white shadow-clayPressed text-sm font-bold text-clay-foreground focus:outline-none focus:bg-white focus:shadow-sm hover:bg-white/80 transition-all placeholder:text-clay-muted/50"/>
              </div>
            ))}
          </div>
          <Button variant="primary" size="lg" loading={saving} onClick={handleSave} className="shadow-clayButton font-black">Save Changes</Button>
        </div>
      )}

      {/* Instagram */}
      {activeTab === "Instagram" && (
        <div className="bg-white/70 backdrop-blur-xl rounded-[40px] border border-white shadow-clayCard p-10 space-y-8">
          <div>
            <h3 className="font-black text-2xl text-clay-foreground tracking-tight drop-shadow-sm mb-2">Instagram Connection</h3>
            <p className="text-clay-muted font-bold text-sm uppercase tracking-widest">Connect via Meta OAuth to enable auto-publishing.</p>
          </div>
          {instagramConnected ? (
            <div className="flex items-center gap-5 p-6 bg-emerald-50/80 rounded-[24px] border border-emerald-200 shadow-sm">
              <div className="w-14 h-14 rounded-[18px] bg-gradient-to-br from-pink-500 via-red-500 to-yellow-500 flex items-center justify-center shadow-sm flex-shrink-0">
                <svg width="24" height="24" fill="white" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </div>
              <div className="flex-1">
                <p className="font-black text-clay-foreground text-lg">@alexjohnson_brand</p>
                <p className="text-xs font-black text-emerald-600 uppercase tracking-widest mt-1">Connected · Auto-publishing active</p>
              </div>
              <button onClick={() => setInstagramConnected(false)} className="text-xs font-black text-red-500 hover:text-red-700 uppercase tracking-widest cursor-pointer transition-colors">Disconnect</button>
            </div>
          ) : (
            <button
              onClick={() => setInstagramConnected(true)}
              className="flex items-center gap-5 w-full p-6 rounded-[24px] border-2 border-transparent bg-white/50 hover:bg-white hover:border-white hover:shadow-clayCard cursor-pointer transition-all group"
            >
              <div className="w-14 h-14 rounded-[18px] bg-gradient-to-br from-pink-500 via-red-500 to-yellow-500 flex items-center justify-center flex-shrink-0 shadow-sm group-hover:scale-105 transition-transform">
                <svg width="24" height="24" fill="white" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
              </div>
              <div className="text-left">
                <p className="font-black text-clay-foreground text-lg group-hover:text-clay-accent transition-colors">Connect Instagram</p>
                <p className="text-xs font-black text-clay-muted uppercase tracking-widest mt-1">via Meta OAuth · Secure · No password stored</p>
              </div>
            </button>
          )}
          <div className="p-5 bg-indigo-50/80 rounded-[20px] border border-indigo-100 text-xs font-bold text-indigo-700">
            <strong className="font-black">Security:</strong> Lana uses the official Meta Instagram Graph API with OAuth 2.0. Your Instagram credentials are never stored — only a secure access token encrypted with AES-256.
          </div>
        </div>
      )}

      {/* Security */}
      {activeTab === "Security" && (
        <div className="bg-white/70 backdrop-blur-xl rounded-[40px] border border-white shadow-clayCard p-10 space-y-8">
          <h3 className="font-black text-2xl text-clay-foreground tracking-tight drop-shadow-sm">Security Settings</h3>

          {/* Change password */}
          <div className="p-6 rounded-[24px] bg-white/50 border border-white shadow-clayPressed space-y-4">
            <h4 className="font-black text-clay-foreground uppercase tracking-widest text-sm">Change Password</h4>
            {["Current Password","New Password","Confirm New Password"].map(l => (
              <div key={l}>
                <label className="text-[10px] font-black text-clay-muted block mb-2 uppercase tracking-widest px-1">{l}</label>
                <input type="password" placeholder="••••••••" className="w-full px-5 py-4 rounded-[20px] bg-white/50 border border-white shadow-clayPressed text-sm font-bold text-clay-foreground focus:outline-none focus:bg-white focus:shadow-sm transition-all"/>
              </div>
            ))}
            <Button variant="secondary" size="md" className="bg-white shadow-sm font-black">Update Password</Button>
          </div>

          {/* 2FA */}
          <div className="p-6 rounded-[24px] bg-white/50 border border-white shadow-clayPressed">
            <div className="flex items-center justify-between mb-5">
              <div>
                <h4 className="font-black text-clay-foreground uppercase tracking-widest text-sm">Two-Factor Authentication</h4>
                <p className="text-[10px] font-black text-clay-muted uppercase tracking-widest mt-1">Add an extra layer of security with TOTP</p>
              </div>
              <Badge variant="warning">Recommended</Badge>
            </div>
            {show2FASetup ? (
              <div className="space-y-5 animate-fade-in">
                <div className="flex flex-col items-center gap-4 p-6 bg-white/80 rounded-[20px] border border-white shadow-sm">
                  {/* Fake QR code */}
                  <div className="w-36 h-36 bg-clay-muted/10 rounded-[16px] flex items-center justify-center shadow-inner">
                    <div className="grid grid-cols-5 gap-0.5">
                      {Array.from({ length: 25 }).map((_, i) => (
                        <div key={i} className={`w-4 h-4 rounded-sm ${Math.random() > 0.4 ? "bg-clay-foreground" : "bg-white"}`}/>
                      ))}
                    </div>
                  </div>
                  <p className="text-xs font-black text-clay-muted text-center uppercase tracking-widest">Scan with your authenticator app<br/>(Google Authenticator, Authy, etc.)</p>
                </div>
                <div>
                  <label className="text-[10px] font-black text-clay-muted block mb-3 uppercase tracking-widest px-1">Enter 6-digit code to verify</label>
                  <div className="flex gap-2">
                    {Array.from({ length: 6 }).map((_, i) => (
                      <input key={i} type="text" maxLength={1} className="flex-1 h-14 text-center font-black text-clay-foreground border-2 border-white bg-white/70 shadow-clayPressed rounded-[16px] focus:border-clay-accent focus:outline-none transition-all text-lg"/>
                    ))}
                  </div>
                </div>
                <div className="flex gap-3">
                  <Button variant="primary" size="md" className="shadow-clayButton font-black">Enable 2FA</Button>
                  <Button variant="secondary" size="md" onClick={() => setShow2FASetup(false)} className="bg-white shadow-sm font-black">Cancel</Button>
                </div>
              </div>
            ) : (
              <Button variant="secondary" size="md" onClick={() => setShow2FASetup(true)} className="bg-white shadow-sm font-black">Set Up 2FA</Button>
            )}
          </div>

          {/* Active sessions */}
          <div className="p-6 rounded-[24px] bg-white/50 border border-white shadow-clayPressed">
            <h4 className="font-black text-clay-foreground uppercase tracking-widest text-sm mb-5">Active Sessions</h4>
            <div className="space-y-4">
              {[
                { device: "Chrome · Windows", ip: "192.168.1.1", time: "Current session", current: true },
                { device: "Safari · iPhone", ip: "10.0.0.5", time: "2 hours ago", current: false },
              ].map((s, i) => (
                <div key={i} className="flex items-center justify-between p-4 rounded-[16px] bg-white/60 border border-white">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-[12px] bg-white shadow-sm flex items-center justify-center">
                      <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" className="text-clay-muted">
                        <rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/>
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm font-black text-clay-foreground">{s.device}</p>
                      <p className="text-[10px] font-bold text-clay-muted uppercase tracking-widest">{s.ip} · {s.time}</p>
                    </div>
                  </div>
                  {s.current ? (
                    <Badge variant="success" size="sm" dot>Current</Badge>
                  ) : (
                    <button className="text-xs font-black text-red-500 hover:text-red-700 cursor-pointer uppercase tracking-widest transition-colors">Revoke</button>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Team */}
      {activeTab === "Team" && (
        <div className="bg-white/70 backdrop-blur-xl rounded-[40px] border border-white shadow-clayCard p-10 space-y-7">
          <div className="flex items-center justify-between">
            <h3 className="font-black text-2xl text-clay-foreground tracking-tight drop-shadow-sm">Team Members</h3>
            <Button variant="primary" size="md" className="shadow-clayButton font-black" leftIcon={<svg width="16" height="16" fill="none" stroke="white" strokeWidth="3" viewBox="0 0 24 24"><path d="M12 5v14M5 12h14" strokeLinecap="round"/></svg>}>
              Invite Member
            </Button>
          </div>
          <div className="space-y-4">
            {teamMembers.map(m => (
              <div key={m.email} className="flex items-center gap-5 p-5 rounded-[24px] bg-white/50 border border-transparent hover:bg-white hover:border-white hover:shadow-clayCard transition-all group">
                <Avatar name={m.name} size="md" status={m.status === "active" ? "online" : "offline"}/>
                <div className="flex-1 min-w-0">
                  <p className="font-black text-clay-foreground text-sm group-hover:text-clay-accent transition-colors">{m.name}</p>
                  <p className="text-[10px] font-bold text-clay-muted uppercase tracking-widest truncate mt-1">{m.email}</p>
                </div>
                <Badge variant={m.status === "active" ? "success" : "warning"} size="md">{m.role}</Badge>
                <button className="text-clay-muted hover:text-clay-foreground cursor-pointer transition-colors">
                  <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                    <circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/><circle cx="5" cy="12" r="1"/>
                  </svg>
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Billing */}
      {activeTab === "Billing" && (
        <div className="bg-white/70 backdrop-blur-xl rounded-[40px] border border-white shadow-clayCard p-10 space-y-8">
          <h3 className="font-black text-2xl text-clay-foreground tracking-tight drop-shadow-sm">Billing &amp; Plan</h3>
          <div className="p-8 rounded-[24px] bg-gradient-to-br from-blue-600 to-indigo-800 text-white shadow-clayDeep border-4 border-indigo-400/20 relative overflow-hidden">
            <div className="absolute inset-0 bg-white/5 mix-blend-overlay pointer-events-none"/>
            <div className="flex items-center justify-between mb-4 relative z-10">
              <span className="text-sm font-black text-blue-200 uppercase tracking-widest">Current Plan</span>
              <Badge className="bg-white/20 text-white font-black border-0 backdrop-blur-sm">Pro · Monthly</Badge>
            </div>
            <p className="font-black text-5xl tracking-tighter drop-shadow-md relative z-10">$29<span className="text-xl font-bold text-blue-200 ml-2">/mo</span></p>
            <p className="text-blue-200 font-bold text-sm mt-2 uppecase tracking-widest relative z-10">Renews Apr 17, 2026</p>
            <div className="flex gap-3 mt-6 relative z-10">
              <button className="flex-1 py-3 rounded-[16px] bg-white/20 hover:bg-white/30 text-white font-black text-sm cursor-pointer transition-all">Upgrade to Agency</button>
              <button className="px-5 py-3 rounded-[16px] border-2 border-white/30 text-white font-black text-sm cursor-pointer hover:bg-white/10 transition-all">Cancel</button>
            </div>
          </div>
          <div>
            <h4 className="font-black text-clay-foreground uppercase tracking-widest text-sm mb-5">Payment History</h4>
            <div className="space-y-2">
              {[
                { date: "Mar 17, 2026", amount: "$29.00", status: "Paid" },
                { date: "Feb 17, 2026", amount: "$29.00", status: "Paid" },
                { date: "Jan 17, 2026", amount: "$29.00", status: "Paid" },
              ].map((p, i) => (
                <div key={i} className="flex items-center justify-between py-4 border-b border-white/40 last:border-0">
                  <span className="text-sm font-bold text-clay-muted uppercase tracking-widest">{p.date}</span>
                  <div className="flex items-center gap-5">
                    <span className="text-sm font-black text-clay-foreground">{p.amount}</span>
                    <Badge variant="success" size="sm">{p.status}</Badge>
                    <button className="text-xs font-black text-clay-accent hover:text-indigo-600 cursor-pointer uppercase tracking-widest transition-colors">Receipt</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Activity */}
      {activeTab === "Activity" && (
        <div className="bg-white/70 backdrop-blur-xl rounded-[40px] border border-white shadow-clayCard p-10">
          <h3 className="font-black text-2xl text-clay-foreground tracking-tight drop-shadow-sm mb-8">Activity Log</h3>
          <div className="space-y-2">
            {activityLog.map((a, i) => (
              <div key={i} className="flex gap-5 py-4 border-b border-white/40 last:border-0 hover:bg-white/60 px-4 rounded-[20px] transition-all group">
                <div className={`w-10 h-10 rounded-[14px] flex items-center justify-center flex-shrink-0 mt-0.5 shadow-sm ${
                  a.type === "login" ? "bg-blue-100 text-blue-600" :
                  a.type === "publish" ? "bg-emerald-100 text-emerald-600" :
                  a.type === "security" ? "bg-red-100 text-red-600" :
                  "bg-white text-clay-muted"
                }`}>
                  <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                    {a.type === "login" ? <path d="M15 3h4a2 2 0 012 2v14a2 2 0 01-2 2h-4M10 17l5-5-5-5M15 12H3" strokeLinecap="round" strokeLinejoin="round"/> :
                     a.type === "security" ? <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" strokeLinecap="round" strokeLinejoin="round"/> :
                     <path d="M22 2L11 13M22 2L15 22l-4-9-9-4 20-7z" strokeLinecap="round" strokeLinejoin="round"/>}
                  </svg>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-black text-clay-foreground group-hover:text-clay-accent transition-colors">{a.action}</p>
                  <p className="text-[10px] font-bold text-clay-muted uppercase tracking-widest mt-1">{a.ip} · {a.device}</p>
                </div>
                <span className="text-[10px] font-black text-clay-muted flex-shrink-0 uppercase tracking-widest">{a.time}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

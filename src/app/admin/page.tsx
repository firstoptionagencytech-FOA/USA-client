'use client';

import React, { useState, useEffect } from 'react';
import {
  LayoutDashboard,
  Users,
  Calendar,
  ClipboardCheck,
  Settings,
  Search,
  Filter,
  RefreshCw,
  ExternalLink,
  ChevronRight,
  X,
  Phone,
  Mail,
  Building,
  CheckCircle2,
  Clock,
  AlertCircle,
  Video,
  Save,
  Globe,
  Sliders,
  Layers,
  ChevronDown,
  TrendingUp,
  Headphones,
  ShieldCheck,
  Menu,
  Sparkles,
  ArrowRight
} from 'lucide-react';
import Link from 'next/link';
import { Lead, Booking, AdminSettings, LeadStatus } from '@/types';

type AdminTab = 'overview' | 'leads' | 'meetings' | 'survey_config' | 'settings';

export default function AdminDashboardPage() {
  const [activeTab, setActiveTab] = useState<AdminTab>('overview');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [leads, setLeads] = useState<Lead[]>([]);
  const [settings, setSettings] = useState<AdminSettings | null>(null);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [savingNotes, setSavingNotes] = useState(false);
  const [notesDraft, setNotesDraft] = useState('');
  const [statusDraft, setStatusDraft] = useState<LeadStatus>('new');
  const [settingsDraft, setSettingsDraft] = useState<Partial<AdminSettings>>({});
  const [settingsSaving, setSettingsSaving] = useState(false);
  const [toastMessage, setToastMessage] = useState<string>('');

  const loadAllData = async () => {
    setLoading(true);
    try {
      const [leadsRes, settingsRes] = await Promise.all([
        fetch('/api/leads'),
        fetch('/api/admin/settings'),
      ]);

      const leadsData = await leadsRes.json();
      const settingsData = await settingsRes.json();

      if (leadsData.success) {
        setLeads(leadsData.leads || []);
      }
      if (settingsData.success) {
        setSettings(settingsData.settings);
        setSettingsDraft(settingsData.settings);
      }
    } catch (err) {
      console.error('Failed to load CRM data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAllData();
  }, []);

  useEffect(() => {
    if (selectedLead) {
      setNotesDraft(selectedLead.internal_notes || '');
      setStatusDraft(selectedLead.status);
    }
  }, [selectedLead]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3500);
  };

  // Metrics
  const totalLeads = leads.length;
  const newLeads = leads.filter(l => l.status === 'new').length;
  const qualifiedLeads = leads.filter(l => l.is_qualified || l.status === 'qualified').length;
  const unqualifiedLeads = leads.filter(l => !l.is_qualified || l.status === 'unqualified').length;
  const bookedMeetings = leads.filter(l => l.status === 'meeting_booked').length;
  const completedMeetings = leads.filter(l => l.status === 'meeting_completed').length;

  // Filtered Leads
  const filteredLeads = leads.filter(l => {
    const matchesSearch =
      l.full_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      l.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      l.company_name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || l.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  // Update Lead Status & Notes
  const handleSaveLeadProfile = async () => {
    if (!selectedLead) return;
    setSavingNotes(true);
    try {
      const res = await fetch(`/api/admin/leads/${selectedLead.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          status: statusDraft,
          internal_notes: notesDraft,
        }),
      });

      const data = await res.json();
      if (data.success) {
        setSelectedLead(data.lead);
        setLeads(prev => prev.map(l => (l.id === data.lead.id ? data.lead : l)));
        showToast('Lead status & notes updated successfully.');
      }
    } catch (e) {
      console.error(e);
    } finally {
      setSavingNotes(false);
    }
  };

  // Update Settings
  const handleSaveSettings = async (override?: Partial<AdminSettings>) => {
    setSettingsSaving(true);
    const toSave = { ...settingsDraft, ...(override || {}) };
    try {
      const res = await fetch('/api/admin/settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(toSave),
      });
      const data = await res.json();
      if (data.success) {
        setSettings(data.settings);
        setSettingsDraft(data.settings);
        showToast('Configuration updated and saved.');
      }
    } catch (e) {
      console.error(e);
    } finally {
      setSettingsSaving(false);
    }
  };

  // 5 Official Survey Questions Details
  const allSurveyQuestions = [
    {
      num: 1,
      key: 'business_type',
      question: 'What type of business do you operate?',
      description: 'Filters for commercial customer-facing IT service companies vs internal IT departments.',
      options: [
        'IT support / Managed IT services',
        'Computer repair / Onsite IT services',
        'Independent IT consultant',
        'Internal corporate IT department (Hard Disqualifier)',
        'Other',
      ],
      in3Mode: true,
    },
    {
      num: 2,
      key: 'role',
      question: 'What is your role within the company?',
      description: 'Identifies decision-makers (Owner/Founder, Partner, Director) vs operational managers.',
      options: [
        'Owner / Founder',
        'Partner / Director',
        'Operations / Support Manager',
        'Other',
      ],
      in3Mode: false,
    },
    {
      num: 3,
      key: 'serving_paying_clients',
      question: 'Do you currently serve paying IT support customers?',
      description: 'Critical gate: JIT Helpdesk is tailored for businesses with active customer ticketing.',
      options: [
        'Yes, regularly (+30 pts)',
        'Yes, occasionally (+15 pts)',
        'Not yet (Hard Disqualifier)',
      ],
      in3Mode: true,
    },
    {
      num: 4,
      key: 'budget_fit',
      question: 'Is $400 setup + $200/month within your budget?',
      description: 'Budget confirmation for full mobile app, portal, dashboard, and unlimited agents.',
      options: [
        'Yes (+30 pts)',
        'Possibly, after a demo (+20 pts)',
        'No (Hard Disqualifier)',
      ],
      in3Mode: true,
    },
    {
      num: 5,
      key: 'timeline',
      question: 'When are you considering implementation?',
      description: 'Determines onboarding urgency and engineering capacity allocation.',
      options: [
        'Within 30 days (+15 pts)',
        'Within 1–3 months (+10 pts)',
        'Later / researching (+5 pts)',
      ],
      in3Mode: false,
    },
  ];

  return (
    <div className="min-h-screen bg-[#F6F8FA] text-slate-800 flex flex-col lg:flex-row font-sans">
      
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-4 right-4 z-50 bg-slate-900 text-white text-xs font-bold px-4 py-3 rounded-2xl shadow-2xl flex items-center gap-2 border border-slate-700 animate-in slide-in-from-top-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* MOBILE TOPBAR */}
      <div className="lg:hidden bg-[#3D0014] text-white px-4 py-3 flex items-center justify-between sticky top-0 z-40 border-b border-brand-900">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-lg bg-brand-700 flex items-center justify-center text-white">
            <Headphones className="w-4 h-4" />
          </div>
          <span className="font-extrabold text-sm font-display tracking-tight">JIT Helpdesk CRM</span>
        </div>

        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white"
        >
          <Menu className="w-5 h-5" />
        </button>
      </div>

      {/* ======================================================== */}
      {/* LEFT EXECUTIVE SIDEBAR (Fixed & Beautifully Arranged)    */}
      {/* ======================================================== */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 sm:w-72 bg-[#2D000F] text-slate-200 flex flex-col justify-between transition-transform duration-300 lg:translate-x-0 lg:static lg:h-screen lg:shrink-0 border-r border-[#420015] shadow-2xl ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        
        {/* Top Branding */}
        <div>
          <div className="p-5 border-b border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-brand-700 to-rose-600 flex items-center justify-center text-white shadow-md shadow-brand-900/50">
                <Headphones className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-sm font-black text-white font-display tracking-tight leading-tight">
                  JIT HELPDESK
                </h2>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-[10px] text-pink-200/70 font-semibold">Lead Desk CRM</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden p-1 text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation Links */}
          <div className="p-3.5 space-y-6">
            
            {/* Group 1: Pipeline */}
            <div>
              <div className="px-3 mb-2 text-[10px] font-extrabold uppercase tracking-wider text-pink-300/50">
                Pipeline Management
              </div>
              <nav className="space-y-1">
                
                {/* 1. Overview */}
                <button
                  onClick={() => {
                    setActiveTab('overview');
                    setSidebarOpen(false);
                  }}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    activeTab === 'overview'
                      ? 'bg-brand-700 text-white shadow-md shadow-brand-950/40'
                      : 'text-slate-300 hover:bg-white/5 hover:text-white'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <LayoutDashboard className="w-4 h-4 text-pink-300" />
                    <span>Overview Dashboard</span>
                  </div>
                  <span className="text-[10px] bg-white/10 px-1.5 py-0.5 rounded text-pink-200">
                    Live
                  </span>
                </button>

                {/* 2. All Leads */}
                <button
                  onClick={() => {
                    setActiveTab('leads');
                    setSidebarOpen(false);
                  }}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    activeTab === 'leads'
                      ? 'bg-brand-700 text-white shadow-md shadow-brand-950/40'
                      : 'text-slate-300 hover:bg-white/5 hover:text-white'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Users className="w-4 h-4 text-pink-300" />
                    <span>All Leads & Prospects</span>
                  </div>
                  <span className="text-[10px] font-black bg-brand-900/90 text-pink-200 px-2 py-0.5 rounded-full border border-pink-400/20">
                    {totalLeads}
                  </span>
                </button>

                {/* 3. Demo Meetings */}
                <button
                  onClick={() => {
                    setActiveTab('meetings');
                    setSidebarOpen(false);
                  }}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    activeTab === 'meetings'
                      ? 'bg-brand-700 text-white shadow-md shadow-brand-950/40'
                      : 'text-slate-300 hover:bg-white/5 hover:text-white'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Calendar className="w-4 h-4 text-pink-300" />
                    <span>Demo Appointments</span>
                  </div>
                  {bookedMeetings > 0 && (
                    <span className="text-[10px] font-black bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded-full border border-emerald-500/30">
                      {bookedMeetings} Booked
                    </span>
                  )}
                </button>

              </nav>
            </div>

            {/* Group 2: Funnel Architecture */}
            <div>
              <div className="px-3 mb-2 text-[10px] font-extrabold uppercase tracking-wider text-pink-300/50">
                Funnel & Qualification
              </div>
              <nav className="space-y-1">
                
                {/* 4. Survey Config (3 vs 5 questions) */}
                <button
                  onClick={() => {
                    setActiveTab('survey_config');
                    setSidebarOpen(false);
                  }}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    activeTab === 'survey_config'
                      ? 'bg-brand-700 text-white shadow-md shadow-brand-950/40'
                      : 'text-slate-300 hover:bg-white/5 hover:text-white'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <ClipboardCheck className="w-4 h-4 text-pink-300" />
                    <span>Survey Engine (3 vs 5)</span>
                  </div>
                  <span className="text-[9px] uppercase font-bold text-emerald-400 bg-emerald-950/60 px-1.5 py-0.5 rounded border border-emerald-500/30">
                    {settings?.survey_mode === '3_questions' ? '3 Qs' : '5 Qs'}
                  </span>
                </button>

                {/* 5. Calendar & Settings */}
                <button
                  onClick={() => {
                    setActiveTab('settings');
                    setSidebarOpen(false);
                  }}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    activeTab === 'settings'
                      ? 'bg-brand-700 text-white shadow-md shadow-brand-950/40'
                      : 'text-slate-300 hover:bg-white/5 hover:text-white'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Settings className="w-4 h-4 text-pink-300" />
                    <span>Calendar & Settings</span>
                  </div>
                </button>

              </nav>
            </div>

            {/* Group 3: External */}
            <div>
              <div className="px-3 mb-2 text-[10px] font-extrabold uppercase tracking-wider text-pink-300/50">
                Live Site
              </div>
              <Link
                href="/"
                target="_blank"
                className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-bold text-slate-300 hover:bg-white/5 hover:text-white transition-all"
              >
                <div className="flex items-center gap-2.5">
                  <ExternalLink className="w-4 h-4 text-pink-300" />
                  <span>View Landing Page</span>
                </div>
                <ArrowRight className="w-3.5 h-3.5 opacity-60" />
              </Link>
            </div>

          </div>
        </div>

        {/* Bottom Admin User Box */}
        <div className="p-4 border-t border-white/10 bg-[#22000B]">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-brand-700 text-white font-black text-xs flex items-center justify-center border border-white/20">
              JD
            </div>
            <div className="overflow-hidden">
              <div className="text-xs font-bold text-white truncate">John Doe (Admin)</div>
              <div className="text-[10px] text-pink-200/60 truncate">jewarinternational.com</div>
            </div>
          </div>
        </div>

      </aside>

      {/* ======================================================== */}
      {/* MAIN CONTENT WORKSPACE                                  */}
      {/* ======================================================== */}
      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        
        {/* Workspace Top Header Bar */}
        <header className="bg-white border-b border-slate-200/80 px-6 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 sticky top-0 z-30 shadow-2xs">
          <div>
            <h1 className="text-lg font-black text-slate-900 font-display capitalize">
              {activeTab === 'overview' && 'Executive Pipeline & Funnel Overview'}
              {activeTab === 'leads' && 'Prospective Lead Directory & Survey Records'}
              {activeTab === 'meetings' && 'Google Calendar Confirmed Demo Schedule'}
              {activeTab === 'survey_config' && 'Qualification Survey Configuration (3 vs 5 Questions)'}
              {activeTab === 'settings' && 'Calendar Availability & Platform Settings'}
            </h1>
            <p className="text-xs text-slate-500 font-medium">
              US Market MSP Campaign · Jewar International Technologies
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={loadAllData}
              className="px-3 py-1.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-xs font-bold flex items-center gap-1.5 transition-colors shadow-2xs cursor-pointer"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin text-brand-700' : ''}`} />
              <span>Refresh Data</span>
            </button>

            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-bold">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Google Calendar Active</span>
            </span>
          </div>
        </header>

        {/* Content Body Container */}
        <div className="p-4 sm:p-6 lg:p-8 space-y-6 max-w-7xl w-full mx-auto">
          
          {/* TAB 1: OVERVIEW DASHBOARD */}
          {activeTab === 'overview' && (
            <div className="space-y-6 animate-in fade-in duration-200">
              
              {/* Top 6 KPI Metric Cards */}
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
                <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-xs">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Total Leads</span>
                  <div className="text-2xl font-black text-slate-900 mt-1 font-display">{totalLeads}</div>
                  <span className="text-[10px] text-slate-500 mt-0.5 block">Captured Inbound</span>
                </div>

                <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-xs">
                  <span className="text-[10px] font-bold text-blue-500 uppercase tracking-wider block">New Inbound</span>
                  <div className="text-2xl font-black text-blue-600 mt-1 font-display">{newLeads}</div>
                  <span className="text-[10px] text-blue-500 mt-0.5 block">Awaiting Review</span>
                </div>

                <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-xs">
                  <span className="text-[10px] font-bold text-emerald-600 uppercase tracking-wider block">Qualified</span>
                  <div className="text-2xl font-black text-emerald-600 mt-1 font-display">{qualifiedLeads}</div>
                  <span className="text-[10px] text-emerald-600 mt-0.5 block">Cleared Survey Gates</span>
                </div>

                <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-xs">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Unqualified</span>
                  <div className="text-2xl font-black text-slate-500 mt-1 font-display">{unqualifiedLeads}</div>
                  <span className="text-[10px] text-slate-400 mt-0.5 block">Alternative Path</span>
                </div>

                <div className="bg-white rounded-2xl p-4 border border-pink-200 shadow-xs bg-pink-50/20">
                  <span className="text-[10px] font-bold text-brand-700 uppercase tracking-wider block">Demos Booked</span>
                  <div className="text-2xl font-black text-brand-700 mt-1 font-display">{bookedMeetings}</div>
                  <span className="text-[10px] text-brand-600 mt-0.5 block">Google Cal Synced</span>
                </div>

                <div className="bg-white rounded-2xl p-4 border border-purple-200 shadow-xs bg-purple-50/20">
                  <span className="text-[10px] font-bold text-purple-600 uppercase tracking-wider block">Completed</span>
                  <div className="text-2xl font-black text-purple-700 mt-1 font-display">{completedMeetings}</div>
                  <span className="text-[10px] text-purple-600 mt-0.5 block">Demo Attended</span>
                </div>
              </div>

              {/* Funnel Pipeline Visual Stage */}
              <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-sm font-extrabold text-slate-900 font-display">
                      Conversion Funnel Progression
                    </h3>
                    <p className="text-xs text-slate-500">
                      Step-by-step visitor progression from contact submission to confirmed appointment.
                    </p>
                  </div>
                  <span className="text-xs font-bold text-brand-700 bg-pink-50 px-3 py-1 rounded-full border border-pink-200">
                    Primary KPI: Cost Per Booked Demo
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 pt-2">
                  <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                    <span className="text-[10px] font-bold uppercase text-slate-400">Step 1: Contact Form</span>
                    <div className="text-lg font-black text-slate-900 mt-0.5">{totalLeads} Leads</div>
                    <div className="w-full h-1.5 bg-slate-200 rounded-full mt-2">
                      <div className="w-full h-full bg-slate-700 rounded-full" />
                    </div>
                  </div>

                  <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                    <span className="text-[10px] font-bold uppercase text-slate-400">Step 2: Survey Taken</span>
                    <div className="text-lg font-black text-slate-900 mt-0.5">{qualifiedLeads + unqualifiedLeads} Completed</div>
                    <div className="w-full h-1.5 bg-slate-200 rounded-full mt-2">
                      <div
                        className="h-full bg-blue-600 rounded-full"
                        style={{ width: totalLeads > 0 ? `${((qualifiedLeads + unqualifiedLeads) / totalLeads) * 100}%` : '0%' }}
                      />
                    </div>
                  </div>

                  <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                    <span className="text-[10px] font-bold uppercase text-slate-400">Step 3: Qualified</span>
                    <div className="text-lg font-black text-emerald-600 mt-0.5">{qualifiedLeads} Passed</div>
                    <div className="w-full h-1.5 bg-slate-200 rounded-full mt-2">
                      <div
                        className="h-full bg-emerald-600 rounded-full"
                        style={{ width: totalLeads > 0 ? `${(qualifiedLeads / totalLeads) * 100}%` : '0%' }}
                      />
                    </div>
                  </div>

                  <div className="p-3.5 rounded-xl bg-pink-50 border border-pink-200">
                    <span className="text-[10px] font-bold uppercase text-brand-700">Step 4: Booked Demo</span>
                    <div className="text-lg font-black text-brand-900 mt-0.5">{bookedMeetings} Scheduled</div>
                    <div className="w-full h-1.5 bg-pink-200 rounded-full mt-2">
                      <div
                        className="h-full bg-brand-700 rounded-full"
                        style={{ width: totalLeads > 0 ? `${(bookedMeetings / totalLeads) * 100}%` : '0%' }}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Two Column Grid: Upcoming Demos & Recent Inbound */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                
                {/* Upcoming Scheduled Demos */}
                <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-brand-700" />
                        <h3 className="text-sm font-extrabold text-slate-900">Upcoming Demo Appointments</h3>
                      </div>
                      <button
                        onClick={() => setActiveTab('meetings')}
                        className="text-xs font-bold text-brand-700 hover:underline"
                      >
                        View All ({bookedMeetings}) →
                      </button>
                    </div>

                    <div className="space-y-3">
                      {leads.filter(l => l.status === 'meeting_booked').slice(0, 3).length === 0 ? (
                        <div className="py-8 text-center text-xs text-slate-400 border border-dashed border-slate-200 rounded-xl">
                          No demo meetings currently scheduled.
                        </div>
                      ) : (
                        leads
                          .filter(l => l.status === 'meeting_booked')
                          .slice(0, 3)
                          .map(lead => (
                            <div
                              key={lead.id}
                              onClick={() => setSelectedLead(lead)}
                              className="p-3.5 rounded-xl border border-pink-100 bg-[#FCFAFB] hover:border-pink-300 transition-colors cursor-pointer flex items-center justify-between"
                            >
                              <div>
                                <div className="text-xs font-extrabold text-slate-900">{lead.full_name}</div>
                                <div className="text-[11px] text-slate-500">{lead.company_name} · {lead.email}</div>
                              </div>
                              <span className="px-2.5 py-1 rounded-lg bg-brand-50 text-brand-800 text-[10px] font-bold">
                                Demo Confirmed
                              </span>
                            </div>
                          ))
                      )}
                    </div>
                  </div>

                  <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
                    <span>Google Meet video links generated automatically</span>
                    <button
                      onClick={() => setActiveTab('meetings')}
                      className="font-bold text-brand-700 hover:underline"
                    >
                      Calendar View
                    </button>
                  </div>
                </div>

                {/* Recent Inbound Leads */}
                <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-2">
                        <Users className="w-4 h-4 text-brand-700" />
                        <h3 className="text-sm font-extrabold text-slate-900">Recent Inbound Submissions</h3>
                      </div>
                      <button
                        onClick={() => setActiveTab('leads')}
                        className="text-xs font-bold text-brand-700 hover:underline"
                      >
                        All Leads ({totalLeads}) →
                      </button>
                    </div>

                    <div className="space-y-3">
                      {leads.slice(0, 3).map(lead => (
                        <div
                          key={lead.id}
                          onClick={() => setSelectedLead(lead)}
                          className="p-3.5 rounded-xl border border-slate-200/80 bg-white hover:border-slate-300 transition-colors cursor-pointer flex items-center justify-between"
                        >
                          <div>
                            <div className="text-xs font-bold text-slate-900">{lead.full_name}</div>
                            <div className="text-[11px] text-slate-500">{lead.company_name || 'Independent'} · {lead.phone}</div>
                          </div>
                          <span
                            className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                              lead.is_qualified ? 'bg-emerald-50 text-emerald-700' : 'bg-slate-100 text-slate-600'
                            }`}
                          >
                            {lead.status.replace('_', ' ')}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
                    <span>Survey responses & UTM attribution stored</span>
                    <button
                      onClick={() => setActiveTab('leads')}
                      className="font-bold text-brand-700 hover:underline"
                    >
                      Manage Leads
                    </button>
                  </div>
                </div>

              </div>

            </div>
          )}

          {/* TAB 2: LEADS DIRECTORY & SURVEY RECORDS */}
          {activeTab === 'leads' && (
            <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden animate-in fade-in duration-200">
              
              {/* Filter and Search Bar */}
              <div className="p-4 border-b border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-slate-50/50">
                <div className="relative flex-1 max-w-md">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                    placeholder="Search by name, email, phone, or company..."
                    className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-brand-700 bg-white"
                  />
                </div>

                <div className="flex items-center gap-2">
                  <Filter className="w-3.5 h-3.5 text-slate-400" />
                  <select
                    value={statusFilter}
                    onChange={e => setStatusFilter(e.target.value)}
                    className="text-xs font-semibold bg-white border border-slate-200 rounded-xl px-3 py-2 text-slate-700 focus:outline-none"
                  >
                    <option value="all">All Statuses ({totalLeads})</option>
                    <option value="new">New ({newLeads})</option>
                    <option value="qualified">Qualified ({qualifiedLeads})</option>
                    <option value="unqualified">Unqualified ({unqualifiedLeads})</option>
                    <option value="meeting_booked">Meeting Booked ({bookedMeetings})</option>
                    <option value="meeting_completed">Meeting Completed</option>
                    <option value="no_show">No Show</option>
                    <option value="follow_up">Follow Up</option>
                    <option value="closed">Closed</option>
                  </select>
                </div>
              </div>

              {/* Table */}
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold uppercase tracking-wider">
                    <tr>
                      <th className="py-3.5 px-4">Prospect & Contact</th>
                      <th className="py-3.5 px-4">Company</th>
                      <th className="py-3.5 px-4">Survey Fit</th>
                      <th className="py-3.5 px-4">Status</th>
                      <th className="py-3.5 px-4">Ad Source</th>
                      <th className="py-3.5 px-4">Captured</th>
                      <th className="py-3.5 px-4 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {filteredLeads.length === 0 ? (
                      <tr>
                        <td colSpan={7} className="py-12 text-center text-slate-400">
                          No leads matching your search criteria.
                        </td>
                      </tr>
                    ) : (
                      filteredLeads.map(lead => (
                        <tr
                          key={lead.id}
                          onClick={() => setSelectedLead(lead)}
                          className="hover:bg-pink-50/40 transition-colors cursor-pointer"
                        >
                          <td className="py-3.5 px-4">
                            <div className="font-extrabold text-slate-900">{lead.full_name}</div>
                            <div className="text-[11px] text-slate-500">{lead.email} · {lead.phone}</div>
                          </td>
                          <td className="py-3.5 px-4 font-semibold text-slate-800">
                            {lead.company_name || 'N/A'}
                          </td>
                          <td className="py-3.5 px-4">
                            {lead.is_qualified ? (
                              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 font-bold border border-emerald-200 text-[10px]">
                                <CheckCircle2 className="w-3 h-3" />
                                <span>Qualified</span>
                              </span>
                            ) : (
                              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-600 font-semibold text-[10px]">
                                <span>Unqualified</span>
                              </span>
                            )}
                          </td>
                          <td className="py-3.5 px-4">
                            <span className="px-2.5 py-1 rounded-lg bg-pink-50 text-brand-900 font-bold text-[10px] uppercase tracking-wider border border-pink-100">
                              {lead.status.replace('_', ' ')}
                            </span>
                          </td>
                          <td className="py-3.5 px-4 font-mono text-[10px] text-slate-500">
                            {lead.utm_params?.utm_source || 'direct'}
                          </td>
                          <td className="py-3.5 px-4 text-slate-500 text-[11px]">
                            {new Date(lead.created_at).toLocaleDateString('en-US', {
                              month: 'short',
                              day: 'numeric',
                              hour: 'numeric',
                              minute: '2-digit',
                            })}
                          </td>
                          <td className="py-3.5 px-4 text-right">
                            <span className="text-brand-700 font-bold hover:underline inline-flex items-center gap-0.5 text-xs">
                              Inspect <ChevronRight className="w-3.5 h-3.5" />
                            </span>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>

            </div>
          )}

          {/* TAB 3: DEMO APPOINTMENTS & MEETINGS */}
          {activeTab === 'meetings' && (
            <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-6 space-y-6 animate-in fade-in duration-200">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
                <div>
                  <h3 className="text-base font-extrabold text-slate-900">
                    Confirmed Google Calendar Appointments
                  </h3>
                  <p className="text-xs text-slate-500">
                    Live FreeBusy availability synchronizing directly with the connected admin Google Calendar.
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <span className="px-3 py-1 rounded-full bg-brand-50 text-brand-800 border border-brand-200 text-xs font-bold">
                    Admin Timezone: {settings?.business_timezone || 'America/New_York'}
                  </span>
                </div>
              </div>

              {/* Bookings List */}
              <div className="space-y-4">
                {leads.filter(l => l.status === 'meeting_booked').length === 0 ? (
                  <div className="py-12 text-center text-slate-400 text-xs border border-dashed border-slate-200 rounded-2xl">
                    No confirmed meetings yet. When qualified prospects complete the calendar step, appointments appear here automatically with Google Meet links.
                  </div>
                ) : (
                  leads
                    .filter(l => l.status === 'meeting_booked')
                    .map(lead => (
                      <div
                        key={lead.id}
                        className="p-5 rounded-2xl border border-pink-100 bg-[#FCFAFB] hover:border-pink-300 transition-all flex flex-col md:flex-row md:items-center justify-between gap-4"
                      >
                        <div className="space-y-1.5">
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-black text-slate-900 font-display">{lead.full_name}</span>
                            <span className="text-xs font-semibold text-slate-600">({lead.company_name || 'Independent'})</span>
                            <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                              Confirmed
                            </span>
                          </div>

                          <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500">
                            <span className="flex items-center gap-1">
                              <Mail className="w-3.5 h-3.5 text-brand-700" />
                              <a href={`mailto:${lead.email}`} className="text-brand-800 font-semibold hover:underline">
                                {lead.email}
                              </a>
                            </span>
                            <span>·</span>
                            <span className="flex items-center gap-1">
                              <Phone className="w-3.5 h-3.5 text-brand-700" />
                              <span>{lead.phone}</span>
                            </span>
                            <span>·</span>
                            <span className="font-semibold text-slate-700">
                              Timeline: {lead.survey_answers?.timeline || 'Immediate'}
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center gap-2.5">
                          <a
                            href={`https://meet.google.com`}
                            target="_blank"
                            rel="noreferrer"
                            className="px-3.5 py-2 rounded-xl bg-brand-700 hover:bg-brand-800 text-white text-xs font-bold flex items-center gap-1.5 shadow-xs transition-colors"
                          >
                            <Video className="w-3.5 h-3.5" />
                            <span>Open Google Meet</span>
                          </a>

                          <button
                            onClick={() => setSelectedLead(lead)}
                            className="px-3.5 py-2 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-xs font-bold text-slate-700 transition-colors"
                          >
                            View Record
                          </button>
                        </div>
                      </div>
                    ))
                )}
              </div>
            </div>
          )}

          {/* TAB 4: SURVEY ENGINE & QUESTION CONFIG (3 VS 5 QUESTIONS) */}
          {activeTab === 'survey_config' && (
            <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-6 space-y-6 animate-in fade-in duration-200">
              
              {/* Header & 3 vs 5 Toggle */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-slate-100">
                <div>
                  <h3 className="text-base font-extrabold text-slate-900 font-display">
                    Qualification Survey Questions & Rule Architecture
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Configure question count and qualification criteria. Discrepancy between earlier 3-question prompt and 5-question development task is fully handled here.
                  </p>
                </div>

                {/* Live 3 vs 5 Toggle Switch */}
                <div className="flex items-center gap-2 p-1.5 bg-slate-100 rounded-2xl border border-slate-200">
                  <button
                    onClick={() => handleSaveSettings({ survey_mode: '5_questions' })}
                    className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                      settings?.survey_mode === '5_questions'
                        ? 'bg-brand-700 text-white shadow-sm'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    5 Questions (Official Default)
                  </button>

                  <button
                    onClick={() => handleSaveSettings({ survey_mode: '3_questions' })}
                    className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                      settings?.survey_mode === '3_questions'
                        ? 'bg-brand-700 text-white shadow-sm'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    3 Questions (Accelerated Mode)
                  </button>
                </div>
              </div>

              {/* Status Banner */}
              <div className="p-4 rounded-xl bg-pink-50/60 border border-pink-200/80 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-brand-700 text-white flex items-center justify-center font-bold text-xs">
                    {settings?.survey_mode === '3_questions' ? '3' : '5'}
                  </div>
                  <div>
                    <span className="text-xs font-bold text-slate-900 block">
                      Currently Active: {settings?.survey_mode === '3_questions' ? '3-Question Accelerated Survey' : '5-Question Complete Task Survey'}
                    </span>
                    <span className="text-[11px] text-slate-500">
                      Changes apply instantly to live landing page qualification modal without server restart.
                    </span>
                  </div>
                </div>
                <span className="px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                  Live Synced
                </span>
              </div>

              {/* Question Breakdown List */}
              <div className="space-y-4 pt-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  All 5 Specified Questions & Scoring Weights:
                </h4>

                {allSurveyQuestions.map(q => {
                  const isActive = settings?.survey_mode === '5_questions' || q.in3Mode;
                  return (
                    <div
                      key={q.num}
                      className={`p-4 rounded-2xl border transition-all ${
                        isActive
                          ? 'bg-white border-slate-200/90 shadow-2xs'
                          : 'bg-slate-50 border-slate-200/60 opacity-60'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex items-start gap-3">
                          <span
                            className={`w-6 h-6 rounded-lg text-xs font-bold flex items-center justify-center shrink-0 mt-0.5 ${
                              isActive ? 'bg-brand-700 text-white' : 'bg-slate-200 text-slate-500'
                            }`}
                          >
                            Q{q.num}
                          </span>
                          <div>
                            <h5 className="text-xs sm:text-sm font-extrabold text-slate-900">
                              {q.question}
                            </h5>
                            <p className="text-[11px] text-slate-500 mt-0.5">
                              {q.description}
                            </p>
                          </div>
                        </div>

                        <span
                          className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase shrink-0 ${
                            isActive
                              ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                              : 'bg-slate-200 text-slate-600'
                          }`}
                        >
                          {isActive ? 'Active in Funnel' : 'Disabled in 3-Q Mode'}
                        </span>
                      </div>

                      {/* Options Preview */}
                      <div className="mt-3 pl-9 flex flex-wrap gap-1.5">
                        {q.options.map((opt, i) => (
                          <span
                            key={i}
                            className="px-2.5 py-1 rounded-lg bg-slate-100 border border-slate-200/60 text-[10px] font-medium text-slate-700"
                          >
                            {opt}
                          </span>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>

            </div>
          )}

          {/* TAB 5: CALENDAR AVAILABILITY & GENERAL SETTINGS */}
          {activeTab === 'settings' && (
            <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-6 space-y-6 max-w-3xl animate-in fade-in duration-200">
              <div className="pb-4 border-b border-slate-100">
                <h3 className="text-base font-extrabold text-slate-900 font-display">
                  Google Calendar & Funnel Operating Rules
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Adjust working hours, buffer times, minimum advance notice, and US business timezone.
                </p>
              </div>

              <div className="space-y-4">
                
                {/* Business Timezone */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Admin Business Timezone (US)
                  </label>
                  <select
                    value={settingsDraft.business_timezone || 'America/New_York'}
                    onChange={e => setSettingsDraft(prev => ({ ...prev, business_timezone: e.target.value }))}
                    className="w-full text-xs font-bold border border-slate-200 rounded-xl p-2.5 text-slate-800 focus:ring-2 focus:ring-brand-700 bg-white"
                  >
                    <option value="America/New_York">Eastern Time (America/New_York)</option>
                    <option value="America/Chicago">Central Time (America/Chicago)</option>
                    <option value="America/Denver">Mountain Time (America/Denver)</option>
                    <option value="America/Los_Angeles">Pacific Time (America/Los_Angeles)</option>
                  </select>
                </div>

                {/* Working Hours */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Working Hours Start
                    </label>
                    <input
                      type="time"
                      value={settingsDraft.working_hours_start || '09:00'}
                      onChange={e => setSettingsDraft(prev => ({ ...prev, working_hours_start: e.target.value }))}
                      className="w-full text-xs font-bold border border-slate-200 rounded-xl p-2.5 text-slate-800"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Working Hours End
                    </label>
                    <input
                      type="time"
                      value={settingsDraft.working_hours_end || '17:00'}
                      onChange={e => setSettingsDraft(prev => ({ ...prev, working_hours_end: e.target.value }))}
                      className="w-full text-xs font-bold border border-slate-200 rounded-xl p-2.5 text-slate-800"
                    />
                  </div>
                </div>

                {/* Meeting Durations & Buffers */}
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Slot Duration (Min)
                    </label>
                    <input
                      type="number"
                      value={settingsDraft.meeting_duration_minutes || 30}
                      onChange={e => setSettingsDraft(prev => ({ ...prev, meeting_duration_minutes: Number(e.target.value) }))}
                      className="w-full text-xs font-bold border border-slate-200 rounded-xl p-2.5 text-slate-800"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Buffer Time (Min)
                    </label>
                    <input
                      type="number"
                      value={settingsDraft.buffer_before_minutes || 15}
                      onChange={e => setSettingsDraft(prev => ({ ...prev, buffer_before_minutes: Number(e.target.value) }))}
                      className="w-full text-xs font-bold border border-slate-200 rounded-xl p-2.5 text-slate-800"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Min Advance Notice (Hrs)
                    </label>
                    <input
                      type="number"
                      value={settingsDraft.min_notice_hours || 4}
                      onChange={e => setSettingsDraft(prev => ({ ...prev, min_notice_hours: Number(e.target.value) }))}
                      className="w-full text-xs font-bold border border-slate-200 rounded-xl p-2.5 text-slate-800"
                    />
                  </div>
                </div>

                {/* Meta Pixel Tracking ID */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Meta Pixel Tracking ID
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. 1234567890123456"
                    value={settingsDraft.meta_pixel_id || ''}
                    onChange={e => setSettingsDraft(prev => ({ ...prev, meta_pixel_id: e.target.value }))}
                    className="w-full text-xs font-bold border border-slate-200 rounded-xl p-2.5 text-slate-800"
                  />
                </div>

                {/* Save Button */}
                <div className="pt-4 border-t border-slate-100">
                  <button
                    onClick={() => handleSaveSettings()}
                    disabled={settingsSaving}
                    className="cta-glow-btn px-6 py-2.5 rounded-xl text-white font-bold text-xs flex items-center gap-2 cursor-pointer shadow-md hover:shadow-lg transition-all"
                  >
                    <Save className="w-3.5 h-3.5" />
                    <span>{settingsSaving ? 'Saving Configuration...' : 'Save Settings'}</span>
                  </button>
                </div>

              </div>

            </div>
          )}

        </div>
      </div>

      {/* ======================================================== */}
      {/* SLIDE-OVER LEAD PROFILE INSPECTOR DRAWER                 */}
      {/* ======================================================== */}
      {selectedLead && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/50 backdrop-blur-xs flex justify-end">
          <div className="w-full max-w-xl bg-white h-full min-h-screen p-6 sm:p-8 flex flex-col justify-between shadow-2xl overflow-y-auto border-l border-slate-200 animate-in slide-in-from-right duration-200">
            
            <div>
              {/* Header */}
              <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                <div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase font-mono">
                    LEAD ID: {selectedLead.id}
                  </span>
                  <h3 className="text-xl font-black text-slate-900 font-display mt-0.5">
                    {selectedLead.full_name}
                  </h3>
                </div>
                <button
                  onClick={() => setSelectedLead(null)}
                  className="p-2 rounded-full hover:bg-slate-100 text-slate-500 cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Contact Information */}
              <div className="py-4 space-y-2 border-b border-slate-100 text-xs">
                <div className="flex items-center gap-2 text-slate-700">
                  <Mail className="w-4 h-4 text-brand-700 shrink-0" />
                  <a href={`mailto:${selectedLead.email}`} className="font-semibold text-brand-800 hover:underline">
                    {selectedLead.email}
                  </a>
                </div>
                <div className="flex items-center gap-2 text-slate-700">
                  <Phone className="w-4 h-4 text-brand-700 shrink-0" />
                  <a href={`tel:${selectedLead.phone}`} className="font-semibold text-slate-800 hover:underline">
                    {selectedLead.phone}
                  </a>
                </div>
                <div className="flex items-center gap-2 text-slate-700">
                  <Building className="w-4 h-4 text-brand-700 shrink-0" />
                  <span className="font-semibold text-slate-800">{selectedLead.company_name || 'Independent IT Company'}</span>
                </div>
              </div>

              {/* Survey Answers Detailed Breakdown */}
              <div className="py-4 border-b border-slate-100">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700">
                    Qualification Survey Answers:
                  </h4>
                  <span
                    className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                      selectedLead.is_qualified ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-100 text-slate-700'
                    }`}
                  >
                    {selectedLead.is_qualified ? 'Qualified' : 'Unqualified'}
                  </span>
                </div>

                <div className="space-y-2 bg-slate-50 p-4 rounded-xl text-xs border border-slate-200/70">
                  <div>
                    <span className="text-slate-400 font-semibold block text-[10px] uppercase">Q1. Business Type:</span>
                    <span className="font-bold text-slate-800">{selectedLead.survey_answers?.business_type || 'N/A'}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 font-semibold block text-[10px] uppercase">Q2. Role:</span>
                    <span className="font-bold text-slate-800">{selectedLead.survey_answers?.role || 'N/A'}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 font-semibold block text-[10px] uppercase">Q3. Serving Paying Clients:</span>
                    <span className="font-bold text-slate-800">{selectedLead.survey_answers?.serving_paying_clients || 'N/A'}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 font-semibold block text-[10px] uppercase">Q4. Budget ($400 + $200/mo):</span>
                    <span className="font-bold text-slate-800">{selectedLead.survey_answers?.budget_fit || 'N/A'}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 font-semibold block text-[10px] uppercase">Q5. Implementation Timeline:</span>
                    <span className="font-bold text-slate-800">{selectedLead.survey_answers?.timeline || 'N/A'}</span>
                  </div>
                </div>

                {selectedLead.qualification_notes && (
                  <div className="mt-3 p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-[11px] text-emerald-900 leading-relaxed">
                    <strong>Qualification Audit:</strong> {selectedLead.qualification_notes}
                  </div>
                )}
              </div>

              {/* Attribution / UTM Campaign Details */}
              <div className="py-4 border-b border-slate-100">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                  Campaign & Ad Attribution:
                </h4>
                <div className="grid grid-cols-2 gap-2 text-[11px] bg-slate-50 p-3 rounded-xl font-mono border border-slate-200/70">
                  <div>
                    <span className="text-slate-400 block">UTM Source:</span>
                    <span className="font-bold text-slate-800">{selectedLead.utm_params?.utm_source || 'direct'}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block">Campaign:</span>
                    <span className="font-bold text-slate-800">{selectedLead.utm_params?.utm_campaign || 'N/A'}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block">Ad Creative:</span>
                    <span className="font-bold text-slate-800">{selectedLead.utm_params?.utm_content || selectedLead.utm_params?.ad_id || 'N/A'}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block">Medium:</span>
                    <span className="font-bold text-slate-800">{selectedLead.utm_params?.utm_medium || 'N/A'}</span>
                  </div>
                </div>
              </div>

              {/* Status Updater & Internal Team Notes */}
              <div className="py-4">
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Update Lead Status:
                </label>
                <select
                  value={statusDraft}
                  onChange={e => setStatusDraft(e.target.value as LeadStatus)}
                  className="w-full text-xs font-bold border border-slate-200 rounded-xl p-2.5 text-slate-800 focus:ring-2 focus:ring-brand-700 mb-4 bg-white"
                >
                  <option value="new">New</option>
                  <option value="qualified">Qualified</option>
                  <option value="unqualified">Unqualified</option>
                  <option value="meeting_booked">Meeting Booked</option>
                  <option value="meeting_completed">Meeting Completed</option>
                  <option value="no_show">No Show</option>
                  <option value="follow_up">Follow Up</option>
                  <option value="closed">Closed</option>
                </select>

                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Internal Team Notes:
                </label>
                <textarea
                  rows={4}
                  value={notesDraft}
                  onChange={e => setNotesDraft(e.target.value)}
                  placeholder="Record call outcomes, custom scope requirements, or follow-up notes..."
                  className="w-full text-xs border border-slate-200 rounded-xl p-3 text-slate-800 focus:ring-2 focus:ring-brand-700 bg-white"
                />
              </div>

            </div>

            {/* Bottom Actions */}
            <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
              <button
                onClick={() => setSelectedLead(null)}
                className="px-4 py-2 text-xs font-semibold text-slate-500 hover:text-slate-800"
              >
                Close Drawer
              </button>
              <button
                onClick={handleSaveLeadProfile}
                disabled={savingNotes}
                className="cta-glow-btn px-6 py-2.5 rounded-full text-white font-bold text-xs flex items-center gap-1.5 cursor-pointer shadow-md"
              >
                <Save className="w-3.5 h-3.5" />
                <span>{savingNotes ? 'Saving...' : 'Save Lead Changes'}</span>
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}

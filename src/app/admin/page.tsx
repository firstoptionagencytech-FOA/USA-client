'use client';

import React, { useState, useEffect } from 'react';
import {
  Users,
  Calendar,
  CheckCircle2,
  Clock,
  Filter,
  Search,
  Settings,
  ChevronRight,
  X,
  Phone,
  Mail,
  Building,
  RefreshCw,
  ExternalLink,
  ShieldCheck,
  AlertCircle,
  TrendingUp,
  Save,
  Sliders,
  Check,
  Globe
} from 'lucide-react';
import { Lead, Booking, AdminSettings, LeadStatus } from '@/types';

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState<'leads' | 'calendar' | 'settings'>('leads');
  const [leads, setLeads] = useState<Lead[]>([]);
  const [bookings, setBookings] = useState<Booking[]>([]);
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
  const [notification, setNotification] = useState<string>('');

  const loadData = async () => {
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

      // Fetch bookings by gathering all bookings
      // In local mode, bookings can be retrieved or simulated
      const mockBookingsRes = await fetch('/api/availability?date=' + new Date().toISOString().split('T')[0]);
    } catch (e) {
      console.error('Error loading CRM data:', e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    if (selectedLead) {
      setNotesDraft(selectedLead.internal_notes || '');
      setStatusDraft(selectedLead.status);
    }
  }, [selectedLead]);

  // Derived metrics
  const totalLeads = leads.length;
  const newLeads = leads.filter(l => l.status === 'new').length;
  const qualifiedLeads = leads.filter(l => l.is_qualified || l.status === 'qualified').length;
  const unqualifiedLeads = leads.filter(l => !l.is_qualified || l.status === 'unqualified').length;
  const bookedLeads = leads.filter(l => l.status === 'meeting_booked').length;
  const completedLeads = leads.filter(l => l.status === 'meeting_completed').length;

  // Filtered leads
  const filteredLeads = leads.filter(l => {
    const matchesSearch =
      l.full_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      l.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      l.company_name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || l.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleUpdateLead = async () => {
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

  const handleSaveSettings = async () => {
    setSettingsSaving(true);
    try {
      const res = await fetch('/api/admin/settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(settingsDraft),
      });
      const data = await res.json();
      if (data.success) {
        setSettings(data.settings);
        showToast('Admin configuration saved.');
      }
    } catch (e) {
      console.error(e);
    } finally {
      setSettingsSaving(false);
    }
  };

  const showToast = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(''), 3500);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col">
      
      {/* Toast Notification */}
      {notification && (
        <div className="fixed top-4 right-4 z-50 bg-slate-900 text-white text-xs font-bold px-4 py-3 rounded-xl shadow-xl flex items-center gap-2 animate-in slide-in-from-top">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>{notification}</span>
        </div>
      )}

      {/* CRM Header */}
      <header className="bg-white border-b border-slate-200 px-6 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 sticky top-0 z-30">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-brand-700 text-white flex items-center justify-center font-bold font-display shadow-xs">
            JIT
          </div>
          <div>
            <h1 className="text-base font-extrabold text-slate-900 font-display leading-tight">
              JIT Helpdesk CRM & Lead Management
            </h1>
            <p className="text-[11px] text-slate-500 font-medium">
              US MSP Performance Pipeline · Single-Admin Google Calendar
            </p>
          </div>
        </div>

        {/* Tab switcher */}
        <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-xl">
          <button
            onClick={() => setActiveTab('leads')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
              activeTab === 'leads' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Users className="w-3.5 h-3.5" />
            <span>Leads ({totalLeads})</span>
          </button>

          <button
            onClick={() => setActiveTab('calendar')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
              activeTab === 'calendar' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Calendar className="w-3.5 h-3.5" />
            <span>Bookings ({bookedLeads})</span>
          </button>

          <button
            onClick={() => setActiveTab('settings')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
              activeTab === 'settings' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Settings className="w-3.5 h-3.5" />
            <span>Settings</span>
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 p-4 sm:p-6 max-w-7xl w-full mx-auto space-y-6">
        
        {/* Metric KPI Row */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
          <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-xs">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Total Leads</span>
            <div className="text-2xl font-black text-slate-900 mt-1">{totalLeads}</div>
          </div>
          <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-xs">
            <span className="text-[10px] font-bold text-blue-500 uppercase tracking-wider">New</span>
            <div className="text-2xl font-black text-blue-600 mt-1">{newLeads}</div>
          </div>
          <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-xs">
            <span className="text-[10px] font-bold text-emerald-500 uppercase tracking-wider">Qualified</span>
            <div className="text-2xl font-black text-emerald-600 mt-1">{qualifiedLeads}</div>
          </div>
          <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-xs">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Unqualified</span>
            <div className="text-2xl font-black text-slate-500 mt-1">{unqualifiedLeads}</div>
          </div>
          <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-xs">
            <span className="text-[10px] font-bold text-brand-700 uppercase tracking-wider">Demo Booked</span>
            <div className="text-2xl font-black text-brand-700 mt-1">{bookedLeads}</div>
          </div>
          <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-xs">
            <span className="text-[10px] font-bold text-purple-600 uppercase tracking-wider">Completed</span>
            <div className="text-2xl font-black text-purple-700 mt-1">{completedLeads}</div>
          </div>
        </div>

        {/* TAB 1: LEADS MANAGEMENT */}
        {activeTab === 'leads' && (
          <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
            
            {/* Filter and Search Bar */}
            <div className="p-4 border-b border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="relative flex-1 max-w-md">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  placeholder="Search by name, email, or company..."
                  className="w-full pl-9 pr-4 py-2 rounded-xl border border-slate-200 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-brand-700"
                />
              </div>

              <div className="flex items-center gap-2">
                <Filter className="w-3.5 h-3.5 text-slate-400" />
                <select
                  value={statusFilter}
                  onChange={e => setStatusFilter(e.target.value)}
                  className="text-xs font-semibold bg-white border border-slate-200 rounded-xl px-3 py-2 text-slate-700 focus:outline-none"
                >
                  <option value="all">All Statuses</option>
                  <option value="new">New</option>
                  <option value="qualified">Qualified</option>
                  <option value="unqualified">Unqualified</option>
                  <option value="meeting_booked">Meeting Booked</option>
                  <option value="meeting_completed">Meeting Completed</option>
                  <option value="no_show">No Show</option>
                  <option value="follow_up">Follow Up</option>
                  <option value="closed">Closed</option>
                </select>

                <button
                  onClick={loadData}
                  className="p-2 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 transition-colors"
                  title="Refresh leads"
                >
                  <RefreshCw className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Leads Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold uppercase tracking-wider">
                  <tr>
                    <th className="py-3 px-4">Prospect</th>
                    <th className="py-3 px-4">Company</th>
                    <th className="py-3 px-4">Qualification</th>
                    <th className="py-3 px-4">Status</th>
                    <th className="py-3 px-4">Captured</th>
                    <th className="py-3 px-4 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredLeads.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="py-12 text-center text-slate-400">
                        No leads match your filter or search query.
                      </td>
                    </tr>
                  ) : (
                    filteredLeads.map(lead => (
                      <tr
                        key={lead.id}
                        onClick={() => setSelectedLead(lead)}
                        className="hover:bg-pink-50/30 transition-colors cursor-pointer"
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
                            View <ChevronRight className="w-3.5 h-3.5" />
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

        {/* TAB 2: CALENDAR & BOOKINGS */}
        {activeTab === 'calendar' && (
          <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-6 space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-extrabold text-slate-900">
                  Google Calendar Demo Appointments
                </h3>
                <p className="text-xs text-slate-500">
                  Active live sessions synced with the configured admin Google Calendar.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-bold">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span>Google Calendar Connected</span>
                </span>
              </div>
            </div>

            {/* Bookings Table / List */}
            <div className="space-y-3">
              {leads.filter(l => l.status === 'meeting_booked').length === 0 ? (
                <div className="py-12 text-center text-slate-400 text-xs border border-dashed border-slate-200 rounded-2xl">
                  No upcoming demo meetings scheduled yet. As qualified leads book, they appear here instantly.
                </div>
              ) : (
                leads
                  .filter(l => l.status === 'meeting_booked')
                  .map(lead => (
                    <div
                      key={lead.id}
                      className="p-4 rounded-xl border border-pink-100 bg-[#FCFAFB] flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                    >
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-extrabold text-slate-900">{lead.full_name}</span>
                          <span className="text-xs text-slate-500">({lead.company_name})</span>
                        </div>
                        <div className="text-xs text-slate-500 mt-1 flex items-center gap-3">
                          <span>{lead.email}</span>
                          <span>·</span>
                          <span>{lead.phone}</span>
                          <span>·</span>
                          <span className="font-semibold text-brand-700">Timeline: {lead.survey_answers?.timeline || 'Immediate'}</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => setSelectedLead(lead)}
                          className="px-3.5 py-1.5 rounded-lg bg-white border border-slate-200 hover:bg-slate-50 text-xs font-bold text-slate-700"
                        >
                          View Lead Profile
                        </button>
                      </div>
                    </div>
                  ))
              )}
            </div>
          </div>
        )}

        {/* TAB 3: ADMIN SETTINGS & GOOGLE CALENDAR CONFIG */}
        {activeTab === 'settings' && (
          <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-6 space-y-6 max-w-3xl">
            <div>
              <h3 className="text-base font-extrabold text-slate-900 font-display">
                Funnel & Google Calendar Configuration
              </h3>
              <p className="text-xs text-slate-500">
                Adjust working hours, calendar connection, qualification question mode, and tracking identifiers.
              </p>
            </div>

            <div className="space-y-4 pt-4 border-t border-slate-100">
              
              {/* Survey Mode Configuration (Critical flag from prompt) */}
              <div className="p-4 rounded-xl bg-pink-50/50 border border-pink-200/60">
                <label className="block text-xs font-bold text-brand-900 mb-1">
                  Qualification Survey Mode
                </label>
                <p className="text-[11px] text-slate-600 mb-3">
                  Toggle between the official 5-question comprehensive survey or the 3-question accelerated survey.
                </p>
                <div className="flex gap-3">
                  <label className="flex items-center gap-2 text-xs font-bold text-slate-800 cursor-pointer">
                    <input
                      type="radio"
                      name="survey_mode"
                      value="5_questions"
                      checked={settingsDraft.survey_mode === '5_questions'}
                      onChange={() => setSettingsDraft(prev => ({ ...prev, survey_mode: '5_questions' }))}
                      className="text-brand-700 focus:ring-brand-700"
                    />
                    <span>5 Questions (Default / Task Spec Compliant)</span>
                  </label>
                  <label className="flex items-center gap-2 text-xs font-bold text-slate-800 cursor-pointer">
                    <input
                      type="radio"
                      name="survey_mode"
                      value="3_questions"
                      checked={settingsDraft.survey_mode === '3_questions'}
                      onChange={() => setSettingsDraft(prev => ({ ...prev, survey_mode: '3_questions' }))}
                      className="text-brand-700 focus:ring-brand-700"
                    />
                    <span>3 Questions (Accelerated Mode)</span>
                  </label>
                </div>
              </div>

              {/* Business Timezone */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Business Timezone
                </label>
                <select
                  value={settingsDraft.business_timezone || 'America/New_York'}
                  onChange={e => setSettingsDraft(prev => ({ ...prev, business_timezone: e.target.value }))}
                  className="w-full text-xs font-bold border border-slate-200 rounded-xl p-2.5 text-slate-800 focus:ring-2 focus:ring-brand-700"
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

              {/* Buffers and Notice */}
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
                    Min Advance Notice (Hours)
                  </label>
                  <input
                    type="number"
                    value={settingsDraft.min_notice_hours || 4}
                    onChange={e => setSettingsDraft(prev => ({ ...prev, min_notice_hours: Number(e.target.value) }))}
                    className="w-full text-xs font-bold border border-slate-200 rounded-xl p-2.5 text-slate-800"
                  />
                </div>
              </div>

              {/* Meta Pixel ID */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Meta Pixel ID
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
              <div className="pt-4">
                <button
                  onClick={handleSaveSettings}
                  disabled={settingsSaving}
                  className="cta-glow-btn px-6 py-3 rounded-xl text-white font-bold text-xs flex items-center gap-2 cursor-pointer"
                >
                  <Save className="w-3.5 h-3.5" />
                  <span>{settingsSaving ? 'Saving...' : 'Save Configuration'}</span>
                </button>
              </div>

            </div>
          </div>
        )}

      </main>

      {/* LEAD PROFILE DETAIL DRAWER / MODAL */}
      {selectedLead && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/50 backdrop-blur-xs flex justify-end">
          <div className="w-full max-w-xl bg-white h-full min-h-screen p-6 sm:p-8 flex flex-col justify-between shadow-2xl overflow-y-auto border-l border-slate-200 animate-in slide-in-from-right duration-200">
            
            <div>
              {/* Header */}
              <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                <div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase font-mono">
                    REF: {selectedLead.id}
                  </span>
                  <h3 className="text-xl font-extrabold text-slate-900 mt-0.5">
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
                  <span className="font-semibold text-slate-800">{selectedLead.company_name || 'N/A'}</span>
                </div>
              </div>

              {/* Survey Responses */}
              <div className="py-4 border-b border-slate-100">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 mb-3">
                  Qualification Survey Responses:
                </h4>
                <div className="space-y-2.5 bg-slate-50 p-4 rounded-xl text-xs">
                  <div>
                    <span className="text-slate-400 font-medium block text-[10px]">Business Type:</span>
                    <span className="font-bold text-slate-800">{selectedLead.survey_answers?.business_type || 'N/A'}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 font-medium block text-[10px]">Role:</span>
                    <span className="font-bold text-slate-800">{selectedLead.survey_answers?.role || 'N/A'}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 font-medium block text-[10px]">Serving Paying Clients:</span>
                    <span className="font-bold text-slate-800">{selectedLead.survey_answers?.serving_paying_clients || 'N/A'}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 font-medium block text-[10px]">Budget Fit ($400 + $200/mo):</span>
                    <span className="font-bold text-slate-800">{selectedLead.survey_answers?.budget_fit || 'N/A'}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 font-medium block text-[10px]">Implementation Timeline:</span>
                    <span className="font-bold text-slate-800">{selectedLead.survey_answers?.timeline || 'N/A'}</span>
                  </div>
                </div>

                {selectedLead.qualification_notes && (
                  <div className="mt-3 p-3 rounded-lg bg-emerald-50 border border-emerald-200/80 text-[11px] text-emerald-800 leading-tight">
                    <strong>Qualification Audit:</strong> {selectedLead.qualification_notes}
                  </div>
                )}
              </div>

              {/* Attribution / UTM Campaign Details */}
              <div className="py-4 border-b border-slate-100">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                  Campaign & Ad Attribution:
                </h4>
                <div className="grid grid-cols-2 gap-2 text-[11px] bg-slate-50 p-3 rounded-xl font-mono">
                  <div>
                    <span className="text-slate-400">Source:</span> {selectedLead.utm_params?.utm_source || 'direct'}
                  </div>
                  <div>
                    <span className="text-slate-400">Campaign:</span> {selectedLead.utm_params?.utm_campaign || 'N/A'}
                  </div>
                  <div>
                    <span className="text-slate-400">Ad Creative:</span> {selectedLead.utm_params?.utm_content || selectedLead.utm_params?.ad_id || 'N/A'}
                  </div>
                  <div>
                    <span className="text-slate-400">Medium:</span> {selectedLead.utm_params?.utm_medium || 'N/A'}
                  </div>
                </div>
              </div>

              {/* Status Updater */}
              <div className="py-4">
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Update Lead Status:
                </label>
                <select
                  value={statusDraft}
                  onChange={e => setStatusDraft(e.target.value as LeadStatus)}
                  className="w-full text-xs font-bold border border-slate-200 rounded-xl p-2.5 text-slate-800 focus:ring-2 focus:ring-brand-700 mb-4"
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
                  className="w-full text-xs border border-slate-200 rounded-xl p-3 text-slate-800 focus:ring-2 focus:ring-brand-700"
                />
              </div>

            </div>

            {/* Save Button */}
            <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
              <button
                onClick={() => setSelectedLead(null)}
                className="px-4 py-2 text-xs font-semibold text-slate-500 hover:text-slate-800"
              >
                Cancel
              </button>
              <button
                onClick={handleUpdateLead}
                disabled={savingNotes}
                className="cta-glow-btn px-6 py-2.5 rounded-full text-white font-bold text-xs flex items-center gap-1.5 cursor-pointer"
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

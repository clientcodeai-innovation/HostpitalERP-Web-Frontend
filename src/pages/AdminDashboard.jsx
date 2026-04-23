import { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogOut, Users, Calendar, Phone, Mail, MapPin, Clock, ChevronDown, ChevronUp, Filter, Search, X, RotateCcw, Lock } from 'lucide-react';
import logo from '../assets/bachpan_hospital_logo.png';
import favicon from '../assets/favicon.png';

export default function AdminDashboard() {
  const [contacts, setContacts] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [activeTab, setActiveTab] = useState('appointments');
  const [adminProfile, setAdminProfile] = useState({ name: '', email: '', username: '' });
  const [profileOpen, setProfileOpen] = useState(false);
  const [updateModalOpen, setUpdateModalOpen] = useState(false);
  const [updateData, setUpdateData] = useState({ name: '', email: '', username: '', password: '' });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterOpen, setFilterOpen] = useState(false);
  const [filterGender, setFilterGender] = useState('');
  const [filterConsultant, setFilterConsultant] = useState('');
  const [filterDate, setFilterDate] = useState('');
  const [filterName, setFilterName] = useState(''); 
  const [changePasswordModalOpen, setChangePasswordModalOpen] = useState(false);
  const [changePasswordData, setChangePasswordData] = useState({ oldPassword: '', newPassword: '', confirmPassword: '' });
  const [isRefreshing, setIsRefreshing] = useState(false);
  const navigate = useNavigate();

  const fetchData = async (showRefreshLoading = false) => {
    const token = localStorage.getItem('adminToken');
    if (!token) {
      navigate('/admin/login');
      return;
    }

    if (showRefreshLoading) setIsRefreshing(true);
    else if (loading) setLoading(true);

    try {
      const headers = { 'Authorization': `Bearer ${token}` };
      
      const [contactsRes, appointmentsRes, profileRes] = await Promise.all([
        fetch('http://localhost:5000/api/admin/contacts', { headers }),
        fetch('http://localhost:5000/api/admin/appointments', { headers }),
        fetch('http://localhost:5000/api/admin/profile', { headers })
      ]);

      if (contactsRes.status === 401 || appointmentsRes.status === 401 || profileRes.status === 401) {
        localStorage.removeItem('adminToken');
        navigate('/admin/login');
        return;
      }

      const contactsData = await contactsRes.json();
      const appointmentsData = await appointmentsRes.json();
      const profileData = await profileRes.json();

      setContacts(contactsData);
      setAppointments(appointmentsData);
      if (profileData) {
        setAdminProfile(profileData);
        setUpdateData({ name: profileData.name || '', email: profileData.email || '', username: profileData.username || '', password: '' });
      } else {
        localStorage.removeItem('adminToken');
        navigate('/admin/login');
        return;
      }
    } catch (err) {
      setError('Failed to fetch data. Please ensure the backend is running.');
    } finally {
      setLoading(false);
      setIsRefreshing(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    navigate('/admin/login');
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('adminToken');
      const res = await fetch('http://localhost:5000/api/admin/profile', {
        method: 'PUT',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(updateData)
      });
      if (res.ok) {
        const result = await res.json();
        setAdminProfile(result.admin);
        setUpdateModalOpen(false);
        alert('Profile updated successfully!');
      } else {
        alert('Failed to update profile');
      }
    } catch (err) {
      alert('Error updating profile');
    }
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();
    if (changePasswordData.newPassword !== changePasswordData.confirmPassword) {
      alert('New passwords do not match');
      return;
    }
    try {
      const token = localStorage.getItem('adminToken');
      const res = await fetch('http://localhost:5000/api/admin/change-password', {
        method: 'PUT',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          oldPassword: changePasswordData.oldPassword,
          newPassword: changePasswordData.newPassword
        })
      });

      if (res.ok) {
        setChangePasswordModalOpen(false);
        setChangePasswordData({ oldPassword: '', newPassword: '', confirmPassword: '' });
        alert('Password changed successfully!');
      } else {
        const result = await res.json();
        alert(result.message || 'Failed to change password');
      }
    } catch (err) {
      alert('Error changing password');
    }
  };

  const filteredAppointments = useMemo(() => {
    return appointments.filter(apt => {
      try {
        const matchesSearch = (apt.patientName?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
                              (apt.consultant?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
                              (apt.phone || '').includes(searchTerm);
        const matchesGender = filterGender === '' || apt.gender === filterGender;
        const matchesConsultant = filterConsultant === '' || apt.consultant === filterConsultant;
        const matchesName = filterName === '' || (apt.patientName?.toLowerCase() || '').includes(filterName.toLowerCase());
        
        let matchesDate = filterDate === '';
        if (!matchesDate && apt.date) {
          const d = new Date(apt.date);
          if (!isNaN(d.getTime())) {
            matchesDate = d.toISOString().split('T')[0] === filterDate;
          }
        }
        return matchesSearch && matchesGender && matchesConsultant && matchesName && matchesDate;
      } catch (e) {
        return false;
      }
    });
  }, [appointments, searchTerm, filterGender, filterConsultant, filterName, filterDate]);

  const filteredContacts = useMemo(() => {
    return contacts.filter(contact => {
      try {
        return (contact.fullName?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
               (contact.subject?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
               (contact.message?.toLowerCase() || '').includes(searchTerm.toLowerCase());
      } catch (e) {
        return false;
      }
    });
  }, [contacts, searchTerm]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Navbar */}
      <nav className="bg-white border-b border-gray-100 px-6 py-4 flex items-center justify-between sticky top-0 z-50">
        <div className="flex items-center gap-3">
          <img src={logo} alt="Bachpan Hospital Logo" className="h-12 w-auto" />
        </div>
        
        {/* Profile Dropdown */}
        <div className="relative">
          <button 
            onClick={() => setProfileOpen(!profileOpen)}
            className="flex items-center gap-3 hover:bg-gray-50 p-2 rounded-xl transition-all border border-transparent hover:border-gray-100"
          >
            <img src={favicon} alt="Admin Profile" className="w-10 h-10 rounded-full object-cover border border-gray-100 shadow-md shadow-primary/20" />
            <div className="hidden sm:block text-left">
              <p className="text-sm font-bold text-gray-800 leading-none mb-1">{adminProfile?.name || 'Administrator'}</p>
              <p className="text-xs text-gray-500 font-medium">Dashboard Profile</p>
            </div>
            <ChevronDown className="w-4 h-4 text-gray-400 ml-1" />
          </button>

          {profileOpen && (
            <div className="absolute right-0 mt-3 w-56 bg-white rounded-2xl shadow-xl shadow-gray-200/50 border border-gray-100 py-2 z-50 overflow-hidden transform origin-top-right transition-all">
              <div className="px-4 py-3 border-b border-gray-50 mb-1 bg-gray-50/50">
                <p className="text-sm font-bold text-gray-800">{adminProfile?.name || 'Administrator'}</p>
                <p className="text-xs text-gray-500">{adminProfile?.email || 'admin@bachpanhospital.com'}</p>
              </div>
              
              <button 
                onClick={() => { setUpdateModalOpen(true); setProfileOpen(false); }}
                className="w-full text-left px-4 py-2.5 text-sm text-gray-700 hover:bg-primary/5 hover:text-primary transition-colors flex items-center gap-3 font-medium"
              >
                <Users className="w-4 h-4 text-gray-400" /> Edit Details
              </button>
              <button 
                onClick={() => { setChangePasswordModalOpen(true); setProfileOpen(false); }}
                className="w-full text-left px-4 py-2.5 text-sm text-gray-700 hover:bg-primary/5 hover:text-primary transition-colors flex items-center gap-3 font-medium"
              >
                <Lock className="w-4 h-4 text-gray-400" /> Change Password
              </button>
              <div className="h-px bg-gray-50 my-1"></div>
              <button 
                onClick={handleLogout}
                className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors font-bold flex items-center gap-2"
              >
                <LogOut className="w-4 h-4" /> Logout
              </button>
            </div>
          )}
        </div>
      </nav>

      <main className="flex-1 max-w-7xl w-full mx-auto p-6 space-y-8">
        {error && (
          <div className="bg-red-50 text-red-500 p-4 rounded-2xl border border-red-100 text-sm font-medium">
            {error}
          </div>
        )}

        {/* Stats Summary */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 flex items-center gap-6">
            <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center">
              <Calendar className="w-8 h-8 text-blue-500" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Total Appointments</p>
              <p className="text-3xl font-bold text-gray-900">{appointments.length}</p>
            </div>
          </div>
          <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 flex items-center gap-6">
            <div className="w-16 h-16 bg-orange-50 rounded-2xl flex items-center justify-center">
              <Users className="w-8 h-8 text-orange-500" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">New Inquiries</p>
              <p className="text-3xl font-bold text-gray-900">{contacts.length}</p>
            </div>
          </div>
        </div>

        {/* Content Tabs & Filters */}
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100">
          <div className="border-b border-gray-50 px-4 flex items-center justify-between">
            <div className="flex">
              <button 
                onClick={() => setActiveTab('appointments')}
                className={`px-6 py-4 text-sm font-bold transition-all ${activeTab === 'appointments' ? 'bg-primary/5 text-primary border-b-2 border-primary' : 'text-gray-400 hover:text-gray-600'}`}
              >
                Appointments
              </button>
              <button 
                onClick={() => setActiveTab('contacts')}
                className={`px-6 py-4 text-sm font-bold transition-all ${activeTab === 'contacts' ? 'bg-primary/5 text-primary border-b-2 border-primary' : 'text-gray-400 hover:text-gray-600'}`}
              >
                Contact Inquiries
              </button>
            </div>
          </div>

          {/* Search & Filters Row */}
          <div className="p-4 bg-gray-50/30 border-b border-gray-50 flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3 w-full md:w-auto">
              <div className="relative flex-1 md:w-80">
                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input 
                  type="text"
                  placeholder="Search by name, doctor, or phone..."
                  className="w-full pl-9 pr-4 py-2.5 bg-white border border-gray-100 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all shadow-sm"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              <button 
                onClick={() => fetchData(true)}
                disabled={isRefreshing}
                className="p-2.5 bg-white border border-gray-100 rounded-xl text-gray-500 hover:text-primary hover:border-primary/30 transition-all shadow-sm disabled:opacity-50"
                title="Refresh Data"
              >
                <RotateCcw className={`w-5 h-5 ${isRefreshing ? 'animate-spin' : ''}`} />
              </button>
            </div>

              <div className="relative">
                <button 
                  onClick={() => setFilterOpen(true)}
                  className={`w-full md:w-auto flex items-center justify-center gap-2 text-sm font-bold transition-all px-5 py-2.5 rounded-xl border ${filterGender || filterConsultant || filterDate || filterName ? 'bg-primary text-white border-primary shadow-lg shadow-primary/20' : 'bg-white text-gray-500 border-gray-100 hover:border-primary/30 shadow-sm'}`}
                >
                  <Filter className="w-4 h-4" /> 
                  <span>Advanced Filters</span>
                  {(filterGender || filterConsultant || filterDate || filterName) && (
                    <span className={`w-2 h-2 rounded-full ${filterGender || filterConsultant || filterDate || filterName ? 'bg-white' : 'bg-primary'}`}></span>
                  )}
                </button>
              </div>
            </div>

          <div className="p-6">
            {activeTab === 'appointments' ? (
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="text-xs font-bold text-gray-400 uppercase tracking-wider border-b border-gray-50">
                      <th className="pb-4">Date</th>
                      <th className="pb-4">Patient</th>
                      <th className="pb-4">Age</th>
                      <th className="pb-4">Gender</th>
                      <th className="pb-4">Contact</th>
                      <th className="pb-4">Consultant</th>
                      <th className="pb-4">Location</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {filteredAppointments.map((apt) => (
                      <tr key={apt._id} className="text-sm text-gray-600 hover:bg-gray-50/50 transition-colors">
                        <td className="py-4 font-medium text-gray-900">
                          {apt.date ? (() => {
                            const d = new Date(apt.date);
                            return !isNaN(d.getTime()) ? d.toLocaleDateString() : 'Invalid Date';
                          })() : 'N/A'}
                        </td>
                        <td className="py-4">
                          <div className="font-bold text-gray-800">{apt.patientName}</div>
                          <div className="text-xs text-gray-400">Guardian: {apt.guardianName}</div>
                        </td>
                        <td className="py-4">
                          <div className="text-sm">{apt.ageYears}y {apt.ageMonths}m {apt.ageDays}d</div>
                        </td>
                        <td className="py-4">
                          <div className="text-xs uppercase font-bold text-gray-500">{apt.gender}</div>
                        </td>
                        <td className="py-4">
                          <div className="flex items-center gap-1.5"><Phone className="w-3.5 h-3.5 text-gray-400" /> {apt.phone}</div>
                        </td>
                        <td className="py-4 font-medium text-primary">{apt.consultant}</td>
                        <td className="py-4">
                          <div className="text-xs">{apt.city}, {apt.state}</div>
                        </td>
                      </tr>
                    ))}
                    {appointments.length > 0 && filteredAppointments.length === 0 && (
                      <tr>
                        <td colSpan="7" className="py-12 text-center">
                          <p className="text-gray-400 font-medium mb-3">No records found matching your current filters.</p>
                          <button 
                            onClick={() => { setSearchTerm(''); setFilterGender(''); setFilterConsultant(''); setFilterDate(''); setFilterName(''); }}
                            className="text-sm font-bold text-primary hover:underline bg-primary/5 px-4 py-2 rounded-lg"
                          >
                            Clear all filters
                          </button>
                        </td>
                      </tr>
                    )}
                    {appointments.length === 0 && (
                      <tr>
                        <td colSpan="7" className="py-12 text-center text-gray-400 font-medium">No appointments found in the database.</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredContacts.map((contact) => (
                  <div key={contact._id} className="p-6 rounded-2xl border border-gray-100 bg-gray-50/30 space-y-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-bold text-gray-900">{contact.fullName}</h3>
                        <p className="text-xs text-primary font-bold uppercase tracking-widest mt-1">{contact.subject}</p>
                      </div>
                      <span className="text-xs text-gray-400">{new Date(contact.createdAt).toLocaleString()}</span>
                    </div>
                    <p className="text-gray-600 text-sm leading-relaxed">{contact.message}</p>
                    <div className="flex flex-wrap gap-4 pt-2">
                      <div className="flex items-center gap-2 text-xs font-medium text-gray-500">
                        <Mail className="w-3.5 h-3.5" /> {contact.email}
                      </div>
                      <div className="flex items-center gap-2 text-xs font-medium text-gray-500">
                        <Phone className="w-3.5 h-3.5" /> {contact.phone}
                      </div>
                    </div>
                  </div>
                ))}
                 {contacts.length > 0 && filteredContacts.length === 0 && (
                   <div className="py-12 text-center">
                     <p className="text-gray-400 font-medium mb-3">No inquiries match your current search.</p>
                     <button 
                       onClick={() => setSearchTerm('')}
                       className="text-sm font-bold text-primary hover:underline bg-primary/5 px-4 py-2 rounded-lg"
                     >
                       Clear search
                     </button>
                   </div>
                 )}
                 {contacts.length === 0 && (
                   <div className="py-12 text-center text-gray-400 font-medium">No contact inquiries found in the database.</div>
                 )}
              </div>
            )}
          </div>
        </div>
      </main>

        {/* Filter Sidebar (Scrollable Sidebar) */}
        {filterOpen && (
          <>
            {/* Backdrop */}
            <div 
              className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[100] transition-all animate-in fade-in duration-300" 
              onClick={() => setFilterOpen(false)}
            ></div>
            
            {/* Drawer Panel */}
            <div className="fixed right-0 top-0 h-full w-full sm:w-80 md:w-96 bg-white shadow-2xl z-[101] flex flex-col animate-in slide-in-from-right duration-300">
              {/* Header */}
              <div className="p-6 border-b border-gray-100 flex items-center justify-between bg-white sticky top-0 z-10">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center">
                    <Filter className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h2 className="font-bold text-gray-900">Advanced Filters</h2>
                    <p className="text-[10px] text-gray-400 uppercase font-bold tracking-widest">Refine your search</p>
                  </div>
                </div>
                <button 
                  onClick={() => setFilterOpen(false)}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-400 hover:text-gray-900"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              {/* Scrollable Content */}
              <div className="flex-1 overflow-y-auto p-6 space-y-8 scrollbar-hide">
                <section>
                  <label className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-3 block">Patient Information</label>
                  <div className="space-y-4">
                    <div className="space-y-1.5">
                      <span className="text-xs font-bold text-gray-700 ml-1">Patient Name</span>
                      <div className="relative">
                        <Users className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input 
                          type="text"
                          placeholder="Search specific name..."
                          className="w-full bg-gray-50 border border-gray-100 rounded-xl px-9 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                          value={filterName}
                          onChange={(e) => setFilterName(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="space-y-1.5">
                      <span className="text-xs font-bold text-gray-700 ml-1">Gender</span>
                      <select 
                        className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all appearance-none"
                        value={filterGender}
                        onChange={(e) => setFilterGender(e.target.value)}
                      >
                        <option value="">All Genders</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                  </div>
                </section>

                <section>
                  <label className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-3 block">Booking Details</label>
                  <div className="space-y-4">
                    <div className="space-y-1.5">
                      <span className="text-xs font-bold text-gray-700 ml-1">Visit Date</span>
                      <div className="relative">
                        <Calendar className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input 
                          type="date"
                          className="w-full bg-gray-50 border border-gray-100 rounded-xl px-9 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                          value={filterDate}
                          onChange={(e) => setFilterDate(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="space-y-1.5">
                      <span className="text-xs font-bold text-gray-700 ml-1">Assigned Consultant</span>
                      <select 
                        className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all appearance-none"
                        value={filterConsultant}
                        onChange={(e) => setFilterConsultant(e.target.value)}
                      >
                        <option value="">All Consultants</option>
                        {[...new Set(appointments.map(a => a.consultant))].map(c => (
                          <option key={c} value={c}>{c}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                </section>

                <div className="bg-primary/5 p-4 rounded-2xl border border-primary/10">
                  <p className="text-[10px] text-primary font-bold text-center uppercase tracking-widest">
                    Tip: Use the search bar for quick phone lookups
                  </p>
                </div>
                
                <div className="h-20"></div>
              </div>
              
              {/* Footer Actions */}
              <div className="p-6 border-t border-gray-100 bg-gray-50 flex gap-3 sticky bottom-0">
                <button 
                  onClick={() => { setFilterGender(''); setFilterConsultant(''); setFilterDate(''); setFilterName(''); }}
                  className="flex-1 py-3.5 text-sm font-bold text-gray-500 hover:bg-gray-100 rounded-xl border border-gray-200 transition-all flex items-center justify-center gap-2"
                >
                  <RotateCcw className="w-4 h-4" /> Reset
                </button>
                <button 
                  onClick={() => setFilterOpen(false)}
                  className="flex-1 py-3.5 text-sm font-bold bg-primary text-white rounded-xl shadow-lg shadow-primary/20 hover:bg-primary-dark transition-all"
                >
                  Show Results
                </button>
              </div>
            </div>
          </>
        )}
        {/* Update Profile Modal */}
        {updateModalOpen && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[150] flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden animate-in zoom-in-95 duration-300">
              <div className="p-6 border-b border-gray-100 flex items-center justify-between bg-primary text-white">
                <h2 className="font-bold text-lg">Update Profile Details</h2>
                <button onClick={() => setUpdateModalOpen(false)} className="p-2 hover:bg-white/10 rounded-full">
                  <X className="w-5 h-5" />
                </button>
              </div>
              <form onSubmit={handleUpdateProfile} className="p-6 space-y-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-widest ml-1">Full Name</label>
                  <input 
                    type="text"
                    required
                    className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                    value={updateData.name}
                    onChange={(e) => setUpdateData({...updateData, name: e.target.value})}
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-widest ml-1">Email Address</label>
                  <input 
                    type="email"
                    required
                    className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                    value={updateData.email}
                    onChange={(e) => setUpdateData({...updateData, email: e.target.value})}
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-widest ml-1">Username</label>
                  <input 
                    type="text"
                    required
                    className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                    value={updateData.username}
                    onChange={(e) => setUpdateData({...updateData, username: e.target.value})}
                  />
                </div>
                <div className="pt-4 flex gap-3">
                  <button 
                    type="button"
                    onClick={() => setUpdateModalOpen(false)}
                    className="flex-1 py-3.5 text-sm font-bold text-gray-500 hover:bg-gray-100 rounded-xl border border-gray-200 transition-all"
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit"
                    className="flex-1 py-3.5 text-sm font-bold bg-primary text-white rounded-xl shadow-lg shadow-primary/20 hover:bg-primary-dark transition-all"
                  >
                    Save Changes
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Change Password Modal */}
        {changePasswordModalOpen && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[150] flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden animate-in zoom-in-95 duration-300">
              <div className="p-6 border-b border-gray-100 flex items-center justify-between bg-orange-600 text-white">
                <h2 className="font-bold text-lg flex items-center gap-2">
                  <Lock className="w-5 h-5" /> Change Password
                </h2>
                <button onClick={() => setChangePasswordModalOpen(false)} className="p-2 hover:bg-white/10 rounded-full">
                  <X className="w-5 h-5" />
                </button>
              </div>
              <form onSubmit={handleChangePassword} className="p-6 space-y-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-widest ml-1">Current Password</label>
                  <input 
                    type="password"
                    required
                    className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                    value={changePasswordData.oldPassword}
                    onChange={(e) => setChangePasswordData({...changePasswordData, oldPassword: e.target.value})}
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-widest ml-1">New Password</label>
                  <input 
                    type="password"
                    required
                    className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                    value={changePasswordData.newPassword}
                    onChange={(e) => setChangePasswordData({...changePasswordData, newPassword: e.target.value})}
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-widest ml-1">Confirm New Password</label>
                  <input 
                    type="password"
                    required
                    className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                    value={changePasswordData.confirmPassword}
                    onChange={(e) => setChangePasswordData({...changePasswordData, confirmPassword: e.target.value})}
                  />
                </div>
                <div className="pt-4 flex gap-3">
                  <button 
                    type="button"
                    onClick={() => setChangePasswordModalOpen(false)}
                    className="flex-1 py-3.5 text-sm font-bold text-gray-500 hover:bg-gray-100 rounded-xl border border-gray-200 transition-all"
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit"
                    className="flex-1 py-3.5 text-sm font-bold bg-orange-600 text-white rounded-xl shadow-lg shadow-orange-600/20 hover:bg-orange-700 transition-all"
                  >
                    Update Password
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    );
  }

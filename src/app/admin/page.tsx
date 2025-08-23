import AdminPanel from './AdminPanel';

export default function AdminDashboardPage() {
  return (
    <div>
      <div className="bg-blue-100 border border-blue-400 text-blue-700 px-4 py-3 rounded mb-4">
        🎉 Welcome to your Enhanced Admin Interface! This is your original admin panel with all the editing tools plus new dashboard features.
      </div>
      <AdminPanel />
    </div>
  );
}

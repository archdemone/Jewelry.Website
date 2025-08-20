import AdminPanel from '../../AdminPanel';

export default function AdvancedAdminPanelPage() {
  return (
    <div>
      <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
        ✅ Advanced AdminPanel Loaded Successfully! You should see visual gem color selection below.
      </div>
      <AdminPanel />
    </div>
  );
}

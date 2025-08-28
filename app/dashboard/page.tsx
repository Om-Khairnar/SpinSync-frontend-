export default function Dashboard() {
   
  return(
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600 mt-2">Welcome to your dashboard</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">Quick Stats</h2>
          <p className="text-gray-600">Your dashboard content will go here</p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">Recent Activity</h2>
          <p className="text-gray-600">Recent activities will be displayed here</p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">Notifications</h2>
          <p className="text-gray-600">Latest notifications will appear here</p>
        </div>
      </div>
    </div>
  )
}
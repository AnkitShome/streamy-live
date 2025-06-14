export default function HomePage() {
   return (
      <div className="space-y-6">
         <div className="border-b border-gray-200 pb-4">
            <h1 className="text-3xl font-bold text-gray-900">Home Page</h1>
            <p className="text-gray-600 mt-2">Welcome to the home section of your app.</p>
         </div>

         {/* Add some content to test scrolling */}
         <div className="grid gap-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
               {Array.from({ length: 12 }, (_, i) => (
                  <div key={i} className="p-6 bg-gradient-to-br from-blue-50 to-indigo-100 rounded-xl border border-blue-200">
                     <h3 className="font-semibold text-blue-900 mb-2">Feature Card {i + 1}</h3>
                     <p className="text-blue-700 text-sm">
                        This is a feature card that demonstrates the layout and scrolling behavior.
                     </p>
                  </div>
               ))}
            </div>

            <div className="space-y-4">
               <h2 className="text-2xl font-semibold text-gray-900">Content Sections</h2>
               {Array.from({ length: 20 }, (_, i) => (
                  <div key={i} className="p-6 bg-white rounded-lg border border-gray-200 shadow-sm">
                     <h3 className="font-semibold text-gray-900 mb-3">Content Block {i + 1}</h3>
                     <p className="text-gray-600 leading-relaxed">
                        This is some sample content to demonstrate independent scrolling. Each block represents content that would
                        make the main area scrollable while keeping the sidebar independent. Lorem ipsum dolor sit amet, consectetur
                        adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                     </p>
                     <div className="mt-4 flex space-x-2">
                        <span className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full">Tag {i + 1}</span>
                        <span className="px-3 py-1 bg-blue-100 text-blue-700 text-sm rounded-full">Category</span>
                     </div>
                  </div>
               ))}
            </div>
         </div>
      </div>
   )
}

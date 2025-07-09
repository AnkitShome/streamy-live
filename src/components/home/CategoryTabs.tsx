
import { Button } from "@/components/ui/button"

const categories = [
   { name: "Gaming", icon: "🎮" },
   { name: "IRL", icon: "📹" },
   { name: "Music", icon: "🎵" },
   { name: "Coding", icon: "💻" },
   { name: "Art", icon: "🎨" },
   { name: "Sports", icon: "⚽" },
]

export function CategoryTabs({ active, setActive }: { active: string; setActive: (name: string) => void }) {
   return (
      <div className="space-y-4">
         <h2 className="text-lg font-semibold text-purple-800">Categories</h2>
         <div className="flex gap-3 overflow-x-auto pb-2">
            {categories.map((category) => (
               <Button
                  key={category.name}
                  variant={active === category.name ? "default" : "outline"}
                  onClick={() => setActive(category.name)}
                  className={`rounded-full px-4 py-2 text-sm transition-all ${active === category.name
                        ? "bg-purple-700 text-white shadow-lg shadow-purple-400/20"
                        : "border-purple-200 text-purple-700 hover:bg-purple-100"
                     }`}
               >
                  <span className="mr-2">{category.icon}</span>
                  {category.name}
               </Button>
            ))}
         </div>
      </div>
   )
}

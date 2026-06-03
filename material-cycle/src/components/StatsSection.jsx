import stats from '../data/stats'

export default function StatsSection() {
  return (
    <section className="bg-gray-50 py-20">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 lg:grid-cols-4 gap-8">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 text-center hover:shadow-xl transition-all"
          >
            <div className="text-4xl font-black text-green-600 mb-2">{stat.number}</div>
            <div className="text-gray-600 font-medium">{stat.label}</div>
          </div>
        ))}
      </div>
    </section>
  )
}
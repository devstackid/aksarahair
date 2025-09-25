
import { useAppStore } from "@/contexts/useAppStore"

const Teams = ({teams}) => {
  return (
    <section id="teams" className="w-full min-h-screen py-20">
        <div className="text-center px-5 mb-10">
          <h1 className="text-5xl font-[Montreal-Medium] text-black uppercase mb-20">
            Hair Artist
          </h1>
          <div className="grid lg:grid-cols-4 grid-cols-1 justify-center gap-10 lg:px-36">
            {teams.map((team, i) => (
              <div key={i} className="relative">
                <div
                  className="h-[50vh] overflow-hidden relative inline-block group"
                >
                  <img
                    src={`/storage/${team.image}`}
                    className="w-full h-full object-cover group-hover:scale-110 transition-all duration-500"
                    alt=""
                  />
                  <div className="absolute inset-0 z-20 flex flex-col justify-end items-center py-10 px-10 group-hover:bg-black/70 transition-all duration-500">
                    {/* <h1 className="text-base font-[Montreal-Medium] text-white px-5 py-2 border border-white rounded-3xl group-hover:bg-white group-hover:text-black transition-all duration-700">
                      {team.role}
                    </h1> */}
                    <h2 className="text-xl font-[Montreal-Medium] text-white">
                      {team.name}
                    </h2>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
  )
}

export default Teams
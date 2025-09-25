import { FaInstagram, FaWhatsapp } from "react-icons/fa"
import { IoCloseSharp } from "react-icons/io5"

const TeamModal = ({modalRef, closeModal, selectedTeam }) => {
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div
            ref={modalRef}
            className="bg-white p-5 lg:rounded-lg shadow-lg lg:w-1/2 w-full lg:max-h-[80vh] h-screen overflow-y-auto overflow-x-hidden lg:overflow-hidden relative"
          >
            <button onClick={closeModal} className="absolute top-7 right-7">
              <IoCloseSharp className="w-6 h-6" />
            </button>

            <div className="">
              <div className="lg:flex items-center gap-7">
                <div className="lg:w-[20vw] w-full h-[70vh] overflow-hidden rounded-md shrink-0">
                  <img
                    src={selectedTeam.image}
                    className="w-full h-full object-cover"
                    alt=""
                  />
                </div>
                <div className="w-full lg:bg-transparent lg:static absolute bottom-0 left-3 right-3 pb-10 lg:pb-0 bg-gradient-to-b from-transparent via-white to-white">
                  <h1 className="text-4xl font-[Montreal-Medium] text-black">
                    {selectedTeam.name}{" "}
                    <span className="block text-sm">
                      {selectedTeam.role} | {selectedTeam.gender} |{" "}
                      {selectedTeam.age} Tahun
                    </span>
                  </h1>
                  <p className="text-sm font-[Montreal-Book] text-black tracking-wide mt-10 pr-5">
                    {selectedTeam.deskripsi}
                  </p>

                  <div className="flex items-center gap-2 mt-10">
                    <a target="_blank" href={selectedTeam.instagram}>
                      <FaInstagram className="w-5 h-5" />
                    </a>
                    <a target="_blank" href={`https://wa.me/${selectedTeam.whatsapp}`}>
                      <FaWhatsapp className="w-5 h-5" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
  )
}

export default TeamModal
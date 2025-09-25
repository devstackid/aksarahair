
const About = ({teams, pricelists, reviews}) => {
  return (
    <section id="about" className="w-full min-h-screen py-20">
        <div className="text-center px-5 mb-10">
          <h1 className="text-3xl font-[Montreal-Bold] text-black mb-5">
            Cukur gampang, tinggal Booking!
          </h1>
          <p className="text-sm font-[Montreal-Book] tracking-wide text-black">
            Kami buka setiap hari. Buat kamu yang males ngantri lama, tinggal
            bikin reservasi terus tentuin aja waktunya
          </p>
        </div>
        <div className="grid md:grid-cols-5 grid-cols-2 gap-2 lg:px-20 px-4">
          <div className="flex flex-col gap-2">
            <div className="bg-black rounded-md flex flex-col justify-between min-h-[50vh] p-4">
              <div>
                <h1 className="text-neon text-base font-[Montreal-Book]">
                  01 /
                </h1>
              </div>
              <div>
                <h1 className="text-neon text-7xl font-[Montreal-Medium] mb-3">
                  {teams.length}
                </h1>
                <h2 className="text-neon text-xl font-[Montreal-Book]">
                  kepster professional dan berpengalaman
                </h2>
              </div>
            </div>
            <div className="bg-black rounded-md flex items-end min-h-[50vh] overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1605497788044-5a32c7078486?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                className="w-full h-full object-cover"
                alt=""
              />
            </div>
          </div>

          <div className="flex flex-col gap-2 lg:mt-20">
            <div className="bg-black rounded-md flex flex-col justify-between min-h-[50vh] p-4">
              <div>
                <h1 className="text-white text-base font-[Montreal-Book]">
                  02 /
                </h1>
              </div>
              <div>
                <h1 className="text-white text-7xl font-[Montreal-Medium] mb-3">
                  &gt;{pricelists.length || pricelists}
                </h1>
                <h2 className="text-white text-xl font-[Montreal-Book]">
                  Pelayanan yang kami sediakan untuk segala kebutuhan
                </h2>
              </div>
            </div>
            <div className="bg-neutral-100 rounded-md flex flex-col justify-between min-h-[50vh] overflow-hidden p-4">
              <div>
                <h1 className="text-black text-base font-[Montreal-Book]">
                  Buka setiap hari
                </h1>
              </div>
              <div>
                <h1 className="text-black text-xl font-[Montreal-Medium] mb-3">
                  08.00 - 22.00 WITA
                </h1>
                <h2 className="text-black text-sm font-[Montreal-Book]">
                  Datang ke tempat kami dan dapatkan pelayanan terbaik
                </h2>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-2 lg:mt-10">
            <div className="bg-transparent min-h-[50vh] p-4"></div>
            <div className="rounded-md min-h-[50vh] overflow-hidden ">
              <img
                src="https://plus.unsplash.com/premium_photo-1677444491957-ab1e8b9a80fd?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                className="w-full h-full object-cover"
                alt=""
              />
            </div>
          </div>

          <div className="flex flex-col gap-2 lg:mt-10">
            <div className="bg-black rounded-md flex flex-col justify-between min-h-[50vh] p-4">
              <div>
                <h1 className="text-white text-base font-[Montreal-Book]">
                  03 /
                </h1>
              </div>
              <div>
                <h1 className="text-white text-4xl font-[Montreal-Medium] mb-3">
                  <span className="block">2023</span>
                </h1>
                <h2 className="text-white text-xl font-[Montreal-Book]">
                  Barber kami telah beroperasi selama 2 tahun sampai saat ini
                </h2>
              </div>
            </div>
            <div className="bg-black rounded-md flex flex-col justify-between min-h-[50vh] overflow-hidden p-4">
              <div>
                <h1 className="text-white text-base font-[Montreal-Book]">
                  04 /
                </h1>
              </div>
              <div>
                <h1 className="text-white text-4xl font-[Montreal-Medium] mb-3">
                  {reviews} <span className="text-base">Ulasan</span>
                </h1>
                <h2 className="text-white text-sm font-[Montreal-Book]">
                  Feedback dari pelanggan yang telah menggunakan
                  jasa kami
                </h2>
              </div>
            </div>
          </div>

          <div className="flex md:w-auto w-[90vw] mx-auto flex-col gap-2 lg:mt-10">
            <div className="rounded-md min-h-[50vh] hidden md:flex overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1667242003572-96caaf8ac5c4?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                className="w-full h-full object-cover"
                alt=""
              />
            </div>
            <div className="bg-neutral-100 rounded-md flex flex-col justify-between min-h-[40vh] md:min-h-[50vh] overflow-hidden p-4 pb-5">
              <div>
                <h1 className="text-black text-base font-[Montreal-Book]">
                  05 /
                </h1>
              </div>
              <div>
                <h1 className="text-black text-4xl font-[Montreal-Medium] mb-3">
                  Produk
                </h1>
                <h2 className="text-black text-sm font-[Montreal-Book] mb-4">
                  Ya, kami juga menyediakan produk dari brand kami
                </h2>
                <a
                  href="#products"
                  className="text-sm font-[Montreal-Medium] text-black bg-white px-5 py-2 rounded-md"
                >
                  Lihat Disini
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
  )
}

export default About
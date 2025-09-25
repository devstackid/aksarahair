const Contact = () => {
  return (
    <>

    <section id="address">
      <div className="w-full flex flex-col md:grid md:grid-cols-2 grid-cols-1 items-center gap-10 lg:gap-x-20 lg:p-20 p-5 pt-20 pb-20 bg-neutral-100">
        <div className="w-full h-[50vh] rounded-3xl overflow-hidden md:order-1 order-2">
          <iframe
            className="w-full h-full"
            id="gmap_canvas"
            src="https://maps.google.com/maps?q=banjarbaru&t=&z=13&ie=UTF8&iwloc=&output=embed"
            
          ></iframe>
        </div>
        <div className="md:order-2 order-1">
          <h1 className="text-sm font-[Montreal-Book] tracking-wide text-black mb-1">
            Lokasi Kami
          </h1>
          <h1 className="lg:text-5xl text-4xl font-[Montreal-Medium] text-black mb-2">
            Konsultasi Langsung
          </h1>
          <p className="text-sm font-[Montreal-Book] text-black tracking-wide">
            Datang untuk berkonsultasi secara langsung bersama kami
            <span className="block mt-5">Jl. Pangeran Antasari</span>
            <span className="block">
              No. 77, Kel. Kemuning, Kec. Banjarbaru Selatan
            </span>
            <span className="block">Kalimantan Selatan, Indonesia</span>
            <span className="block">70713</span>
          </p>
        </div>
      </div>
    </section>

      </>

  )}
export default Contact;

import { Link } from "@inertiajs/react";
// https://images.pexels.com/photos/897262/pexels-photo-897262.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1

const Header = () => {
  return (
    <section
      id="header"
      className=" w-full lg:h-screen h-screen lg:pt-0 overflow-hidden "
    >
      <div className="relative grid md:grid-cols-2 gap-10 items-center pt-5 md:pt-0 pb-20 px-5 lg:p-20 bg-gradient-to-b from-white/50 to-neutral-100 w-full">
        <div className="rounded-xl overflow-hidden md:order-2 shadow-xl">
          <img src="https://images.pexels.com/photos/897262/pexels-photo-897262.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="" />
        </div>
        <div className="relative z-[11] flex flex-col">
          <h1 className="text-5xl lg:text-7xl font-[Montreal-Bold] text-black mb-2">
          Where Precision Meets <span className="">Perfection</span>
          </h1>
          <p className="lg:text-sm text-xs font-[Montreal-Book] text-black tracking-wide">
            Lebih dari sekadar tempat potong rambut, kami hadir untuk
            menciptakan pengalaman grooming yang sempurna karna Kami percaya
            setiap gaya adalah cerminan kepribadian—dan kami di sini untuk
            mewujudkannya.
          </p>

          <div className="flex items-center gap-3 mt-10">
            <Link
              href={route('reservation')}
              className="text-white font-[Montreal-Medium] text-sm tracking-wide bg-black hover:text-black hover:bg-white transition px-4 py-2.5 rounded shadow-xl"
            >
              Reservasi Sekarang
            </Link>
            <a
              href="#services"
              className="text-white font-[Montreal-Medium] text-sm tracking-wide bg-black hover:text-black hover:bg-white transition px-4 py-2.5 rounded shadow-xl"
            >
              Layanan Kami
            </a>
          </div>
        </div>

      </div>
    </section>
  );
};

export default Header;

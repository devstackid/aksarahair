import { Link } from "react-router-dom";


const Home = () => {
  

  return (
    <Layout>
      
      <main id="root-container">
        <section id="header" className="w-full min-h-screen bg-bg lg:px-20 px-5 font-jeko">
          <div className="w-full h-screen grid grid-cols-1 lg:grid-cols-2 gap-10">
            <div className="flex flex-col justify-center h-full">
              <h1 className="text-foreground">Reservasi Barber Anti Ribet</h1>
              <div className="flex flex-wrap items-center gap-2 gap-y-2 w-full">
                <Link to={'/reservation'} className="text-sm text-white px-5 py-2.5 rounded-xl bg-primary">Reservasi</Link>
                <Link to={`https://wa.me?${configs[0].whatsApp}`} className="text-sm text-white px-5 py-2.5 rounded-xl bg-primary">Panggil Ke Rumah</Link>
                <a href={`https://wa.me?${configs[0].whatsApp}`} className="text-sm text-white px-5 py-2.5 rounded-xl bg-primary">Reservasi Pernikahan</a>
              </div>
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
};

export default Home;

const Gallery = ({galleries}) => {
    


  return (
    <section id="gallery" className="px-5 lg:px-20 mt-10 py-10 grid grid-col-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
      {galleries.map((gallery, i) => (
        <img
        key={i}
              src={`/storage/${gallery.image}`}
              alt={`Gallery ${gallery.id}`}
              className="w-full h-full object-cover rounded-lg"
            />
      ))}
    </section>
  );
};

export default Gallery;

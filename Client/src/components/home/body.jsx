import { assets } from "../../assets/assets";

function Body() {
  return (
    <div className="h-auto lg:h-[75vh] flex flex-col-reverse lg:flex-row items-center lg:items-center px-4 lg:px-16">
      {/* Left Section */}
      <div className="w-full lg:w-1/2 flex flex-col items-center lg:items-start justify-center mt-8 lg:mt-0">
        <h1 className="text-4xl lg:text-6xl font-semibold text-yellow-100 text-center lg:text-left">
          Welcome to Legal Read
        </h1>
        
        <p className="mt-4 text-lg lg:text-xl text-zinc-400 text-center lg:text-left">
          In a world where laws shape our lives, having access to reliable and
          well-organized legal information is essential. At Legal Read, we bring
          you a curated collection of legal resources designed to empower
          individuals, businesses, and professionals with knowledge and tools to
          navigate complex legal landscapes confidently.
        </p>
        <div className="mt-6">
          <div className="inline-block text-yellow-100 text-lg font-semibold border border-yellow-100 px-6 py-2 hover:bg-zinc-800 rounded-full">
            Discover
          </div>
        </div>
      </div>

      
      <div className="w-full lg:w-1/2 flex items-center justify-center">
        <img
          src={assets.justice}
          alt="Justice"
          className="w-32 lg:w-full max-w-xs lg:max-w-lg object-contain"
        />
      </div>
    </div>
  );
}

export default Body;

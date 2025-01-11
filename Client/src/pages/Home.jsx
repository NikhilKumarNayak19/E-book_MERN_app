import Body from "../components/home/body";
import RecentlyAdded from "../components/home/RecentlyAdded";

const Home = () => {
  return (
    <div className="bg-zinc-900 text-white px-10 py-8 min-h-screen">
      <Body />
      <RecentlyAdded />
    </div>
  );
};

export default Home;

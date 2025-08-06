import CardSection from "../components/Home/CardSection";
import Logo from "../components/Home/Logo";

function Home() {
  return (
    // xl:px-35 md:px-10 px-4
    // text-[#6572aa] border-[#c9b26c], light -> bg-[#252733]  dark -> #151824
    <div className="flex flex-col items-center pt-35 gap-10 min-h-screen xl:px-35 md:px-10 px-4 w-full">
      <Logo />
      <CardSection />
    </div>
  );
}

export default Home;

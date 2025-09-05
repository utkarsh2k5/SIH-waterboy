const Background = () => (
  <>
    {/* Background image */}
    <img
      className="fixed top-0 left-0 w-full h-full object-cover -z-10"
      src="/img1.png"
      alt="Gradient-img"
    />
    {/* Blur effect */}
    <div className="h-0 w-[40rem] absolute top-[20%] right-[-5%] shadow-[0_0_900px_20px_#e99b63] -rotate-[30deg] -z-10"></div>
  </>
);

export default Background;
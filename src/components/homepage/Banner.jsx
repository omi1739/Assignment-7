const Banner = () => {
  return (
    <div>
      <div className="text-center mt-10 mb-10 space-y-5">
        <h1 className="text-4xl font-bold">
          Friends to keep close in your life
        </h1>
        <p>
          Your personal shelf of meaningful connections. Browse, tend, and
          nurture <br /> the relationships that matter most.
        </p>
        <button className="btn bg-green-900 text-white">Add a Friend</button>
      </div>

        <div className=" w-[90%] mx-auto grid grid-cols-1 justify-center items-center md:grid-cols-2 lg:grid-cols-4  gap-7">
            <div className="w-full h-30 bg-green-100 rounded text-center flex flex-col justify-center">
                <h3 className="text-3xl">10</h3>
                <p>Total Friends</p>
            </div>
            <div className="w-full h-30 bg-green-100 rounded text-center flex flex-col justify-center">
                <h3 className="text-3xl">3</h3>
                <p>On Track</p>
            </div>
            <div className="w-full h-30 bg-green-100 rounded text-center flex flex-col justify-center">
                <h3 className="text-3xl">6</h3>
                <p>Need Attention</p>
            </div>
            <div className="w-full h-30 bg-green-100 rounded text-center flex flex-col justify-center">
                <h3 className="text-3xl">12</h3>
                <p>Interactions This Month</p>
            </div>
        </div>

    </div>
  );
};

export default Banner;

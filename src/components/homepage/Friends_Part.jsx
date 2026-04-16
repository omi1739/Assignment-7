import friends from "@/data/friends.json";
import  Image  from "next/image";

const Friends_Part = () => {
  console.log(friends);
  return (
    <div className="mt-15">
        <h1 className="text-center" >Your Friends</h1>
      <div className=" w-[90%] mx-auto  grid grid-cols-1 justify-center items-center md:grid-cols-2 lg:grid-cols-4 gap-5">
        

        {friends.map((friend) => (
          <div key={friend.id} className="w-full h-full bg-amber-200 flex flex-col justify-center items-center rounded-2xl ">
            <Image
              src={friend.picture}
              alt={friend.name}
              width={70}
              height={70}
              className="text-3xl font-bold rounded-full mt-4"
            />

            <h1 className="text-2xl font-medium">{friend.name}</h1>

            <p className="text-[#64748B]">{friend.days_since_contact} days ago</p>

            <p className="bg-green-200 rounded-4xl px-2 py-1">{friend.relation}</p>

            <p className={`${friend.status === 'overdue' ? 'bg-red-600' : friend.status === 'on-track' ? 'bg-green-900' : friend.status === 'almost due' ? 'bg-amber-400' : "" } text-white px-2 py-1 rounded-4xl `}>{friend.status}</p>

          </div>
        ))}
      </div>
    </div>
  );
};

export default Friends_Part;

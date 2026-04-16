import Link from "next/link";
import friends from "@/data/friends.json";
import { FaPhone, FaTrash } from "react-icons/fa";
import { MdMessage } from "react-icons/md";
import { HiVideoCamera } from "react-icons/hi";

const FriendDetailsPage = async ({ params }) => {
  const { friendId } = await params;
  const friend = friends.find((f) => f.id === parseInt(friendId));

  if (!friend) {
    return (
      <div className="w-[90%] mx-auto py-10">
        <h1 className="text-4xl font-bold mb-4">Friend Not Found</h1>
        <p className="text-gray-600 mb-4">
          The friend you're looking for doesn't exist.
        </p>
        <Link href="/friends" className="btn btn-primary">
          Back to Friends
        </Link>
      </div>
    );
  }

  

  return (
    <div className="w-[90%] mx-auto py-10">
  

  <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">

    
    <div className="col-span-1 space-y-4">

      
      <div className="bg-white shadow rounded-xl p-4 text-center">
        <img
          src={friend.picture}
          className="w-20 h-20 rounded-full mx-auto mb-3"
        />
        <h2 className="font-semibold text-lg">{friend.name}</h2>

        <div className=" flex flex-col justify-center items-center gap-2.5 mt-2">
          <p className={`badge text-white ${friend.status === 'overdue' ? 'bg-red-700' : friend.status === 'almost due' ? 'bg-amber-500' : friend.status === 'on-track' ? 'bg-green-900' : ''}`}>
                {friend.status}
              </p>
          <p className="badge bg-green-100 text-green-700">
            {friend.relation}
          </p>
        </div>

        <p className="text-sm text-gray-500 mt-3 italic">
          "{friend.bio}"
        </p>
      </div>

     
      <div className="bg-white shadow rounded-xl p-4 space-y-2">
        <button className="btn w-full"> Snooze</button>
        <button className="btn w-full"> Archive</button>
        <button className="btn w-full text-red-500"> <FaTrash/> Delete</button>
      </div>
    </div>

  
    <div className="col-span-3 space-y-6">

     
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white shadow rounded-xl p-4 text-center">
          <p className="text-2xl font-bold">
            {friend.days_since_contact}
          </p>
          <p className="text-gray-500 text-sm">Days Since Contact</p>
        </div>

        <div className="bg-white shadow rounded-xl p-4 text-center">
          <p className="text-2xl font-bold">{friend.goal}</p>
          <p className="text-gray-500 text-sm">Goal (Days)</p>
        </div>

        <div className="bg-white shadow rounded-xl p-4 text-center">
          <p className="text-lg font-bold">
            {new Date(friend.next_due_date).toDateString()}
          </p>
          <p className="text-gray-500 text-sm">Next Due</p>
        </div>
      </div>

   
      <div className="bg-white shadow rounded-xl p-4">
        <h3 className="font-semibold mb-2">Relationship Goal</h3>
        <p className="text-gray-600">
          Connect every <b>{friend.goal} days</b>
        </p>
      </div>

      
      <div className="bg-white shadow rounded-xl p-4">
        <h3 className="font-semibold mb-4">Quick Check-In</h3>

     
        <div className="grid grid-cols-3 gap-4">

          <button className="btn"> <FaPhone/> Call</button>
          <button className="btn"> <MdMessage/> Text</button>
          <button className="btn"> <HiVideoCamera/> Video</button>

        </div>


      </div>

  
      <div className="bg-white shadow rounded-xl p-4">

        <h3 className="font-semibold mb-2">Tags</h3>

        <div className="flex gap-2 flex-wrap">


          
        </div>
      </div>
    </div>
  </div>
</div>
  );
};

export default FriendDetailsPage;

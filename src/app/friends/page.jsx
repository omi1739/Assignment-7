import friends from "@/data/friends.json";
import FriendCard from "@/components/homepage/FriendCard";


const FriendsPage = () => {
  return (
    <div className="w-[90%] mx-auto py-10 min-h-screen">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-4">Your Friends</h1>
       
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {friends.map((friend) => (
          <FriendCard key={friend.id} friend={friend} />
        ))}
      </div>
    </div>
  );
};

export default FriendsPage;

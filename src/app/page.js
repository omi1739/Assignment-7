import Banner from "@/components/homepage/Banner";
import FriendCard from "@/components/homepage/FriendCard";
import friends from "@/data/friends.json";

export default function Home() {
  return (
    <div>
      <section>
        <Banner></Banner>
      </section>

      <section className="w-[90%] mx-auto py-10">
        <h2 className="text-3xl font-bold mb-8">Your Friends</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {friends.map((friend) => (
            <FriendCard key={friend.id} friend={friend} />
          ))}
        </div>
      </section>
    </div>
  );
}

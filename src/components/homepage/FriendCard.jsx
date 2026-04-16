import Image from "next/image";
import Link from "next/link";

const FriendCard = ({ friend }) => {


  return (
    <Link href={`/friends/${friend.id}`}>
      <div
        className={`card bg-green-50 ${friend.status} cursor-pointer hover:shadow-lg transition-shadow h-full`}
      >
        <figure className="px-4 pt-4">
          <Image
            src={friend.picture}
            alt={friend.name}
            width={70}
            height={70}
            className="rounded-full object-cover"
          />
        </figure>
        <div className="card-body p-4 flex flex-col justify-center items-center">
          <h2 className="card-title text-lg">{friend.name}</h2>

          <div className="space-y-2">
        
        <p className="text-xs text-gray-500">
                {friend.days_since_contact} days ago
              </p>

              <p className="bg-green-300 rounded-4xl text-center">{friend.relation}</p>
           
              <p className={`badge text-white ${friend.status === 'overdue' ? 'bg-red-700' : friend.status === 'almost due' ? 'bg-amber-500' : friend.status === 'on-track' ? 'bg-green-900' : ''}`}>
                {friend.status}
              </p>
              
          

           
          </div>

         
        </div>
      </div>
    </Link>
  );
};


export default FriendCard;

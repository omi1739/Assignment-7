import friends from "../../../public/friends.json"

const Friends_Part = () => {
    console.log(friends);
  return (
    <div>
      {
        
        
        friends.map(friend =>(
            <div key={friend.id} className="text-3xl font-bold">{friend.name}</div>
        ))
      }
    </div>
  )
}

export default Friends_Part

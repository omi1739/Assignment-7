

const FriendDetailsPage = async ({params}) => {
  const {id} = await params
  console.log(id);
  
  return (
    <div>
      <h1 className="tetx-7xl">Yo this is firiend part yo bro</h1>
    </div>
  )
}

export default FriendDetailsPage

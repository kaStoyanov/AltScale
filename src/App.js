import axios from "axios";
import { useState, useEffect } from "react";
import { BiLike } from "react-icons/bi";


function App() {
  const [users, setUsers] = useState();

  const url = "https://jsonplaceholder.typicode.com/users";
  useEffect(() => {
    getallUsers();
  }, []);
  const getallUsers = () => {
    console.log('first')
    axios.get(url).then((res) => {
        setUsers(res.data);
        const data = window.localStorage.getItem("usersData")
        setUsers(JSON.parse(data))
    });
  };
  const handleLike=(item)=>{
    if (item?.liked) {
      item.liked=!item.liked
      setUsers([...users])
      window.localStorage.setItem("usersData", JSON.stringify(users));
    }else{
      item.liked = true
      setUsers([...users])
      window.localStorage.setItem("usersData", JSON.stringify(users));
    }
  
  }
  return (
    <div className="App">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {users &&
          users.map((item, index) => (
            <div
              className="m-3 card rounded flex flex-col justify-center"
              key={item.id}
              name={item.name}
            >
              <img
                src={`https://avatars.dicebear.com/v2/avataaars/${item.name}.svg?options[mood][]=happy`}
                alt=""
              />
              <div className="flex">
                <h3 className="m-auto">{item.name}</h3>
                <BiLike
                  onClick={() => handleLike(item)}
                  style={{ color: item.liked ? "blue" : "red" ,cursor:"pointer"}}
                  className="mr-5 mt-1 icon"

                />
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}

export default App;

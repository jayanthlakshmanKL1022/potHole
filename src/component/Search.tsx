import { useState } from "react";
import axios from "axios";
import { TextField } from "@mui/material";

interface User {
  name: string;
  email: string;
}

interface SearchProps {
  setUsers: React.Dispatch<React.SetStateAction<User[]>>;
}

const Search: React.FC<SearchProps> = ({ setUsers }) => {
  const [input, setInput] = useState<string>(""); 
  const [loading, setLoading] = useState<boolean>(false);

  const inputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const lowercase = e.target.value.toLowerCase();
    setInput(lowercase);

    if (lowercase.length > 1) {
      fetchUsers(lowercase);
     
    } else {
      setUsers([]); 
    }
    setLoading(false);
  };
  const fetchUsers = async (query: string) => {
    setLoading(true);
    try {
      const response = await axios.get<User[]>(`http://localhost:5500/find/search?name=${query}`);
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
      setUsers([]);
    }
    setLoading(false);
  };

  return (
    <div className="Main">
      <div className="search">
        <TextField id="outlined-basic" onChange={inputHandler} fullWidth placeholder="🔍 Find a DM" value={input}  sx={{
          marginBottom:"10px",
          backgroundColor: "white", 
          borderRadius: "6px", 
        }}/>
      </div>
      {loading && <p>Loading...</p>}
    </div>
  );
};

export default Search;

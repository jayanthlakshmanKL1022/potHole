import React from "react";
interface User {
  name: string;
  email: string;
}
interface ListProps {
  users: User[];
}
const List: React.FC<ListProps> = ({ users }) => {
  return (
    <div>
      {users.length > 0 ? (
        <ul>
          {users.map((user, index) => (
            <li key={index}>
              <strong>{user.name}</strong> - {user.email}
            </li>
          ))}
        </ul>
      ) : (
        <p></p>
      )}
    </div>
  );
};

export default List;

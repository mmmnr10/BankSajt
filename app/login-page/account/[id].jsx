import { useRouter } from "next/router";
import { useState, useEffect } from "react";

export default function AccountPage() {
  const { id } = useRouter().query;
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (id) {
      const getAccount = async () => {
        const response = await fetch(`http://localhost:4000/accounts/${id}`);
        const data = await response.json();
        setUser(data);
      };

      getAccount();
    }
  }, [id]);

  if (!user) return <div>Loading...</div>;

  return (
    <div>
      <h1>User Account</h1>
      <p>Email: {user.email}</p>
      <p>Balance: {user.balance}</p>
    </div>
  );
}

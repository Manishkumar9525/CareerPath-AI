import { useEffect, useState } from "react";

const WelcomeHeader = () => {
  const [name, setName] = useState("User");

  useEffect(() => {
    // 🔥 get user from localStorage
    const user = JSON.parse(localStorage.getItem("user"));

    if (user?.name) {
      setName(user.name);
    }
  }, []);

  return (
    <div>
      <p className="text-sub">Welcome back,</p>

      <h1 className="font-display text-4xl mt-1">
        {name} 👋
      </h1>
    </div>
  );
};

export default WelcomeHeader;
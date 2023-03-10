import { useState, useEffect } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
// const user = useUser();
const useUser = () => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(getAuth(), (user) => {
      setUser(user);
      // console.log("setting the user value ");
      // console.log(user);
      setIsLoading(false);
    });
    return unsubscribe;
  }, []);
  return { user, isLoading };
};
export default useUser;

import { createContext } from "react";

const CurrentUserContext = createContext({
  _id: "",
  name: "",
  avatar: "",
});

export default CurrentUserContext;

import { createContext } from "react";

type Props = {
  profile: any;
};
export const AuthContext = createContext<Props>({
  profile: {},
});

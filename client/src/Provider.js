import react from "react";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import { useLoadUserQuery } from "./redux/features/api/apiSlice";
import Loader from "./components/Loader/Loader"
export function Providers({ children }) {
  return (
    <Provider store={store}>
      <Custom>{ children }</Custom>
    </Provider>
  );
}

const Custom = ({ children }) => {
    const { isLoading } = useLoadUserQuery({});
    return <>{isLoading ? <Loader /> : <>{children}</>}</>;
  };

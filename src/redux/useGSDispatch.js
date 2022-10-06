import { createDispatchHook } from "react-redux";
import geetSunamStoreContext from "./storeContext";

const useGSDispatch = createDispatchHook(geetSunamStoreContext);

export default useGSDispatch;

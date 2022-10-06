import { createSelectorHook } from "react-redux";
import geetSunamStoreContext from "./storeContext";

const useGSSelector = createSelectorHook(geetSunamStoreContext);

export default useGSSelector;

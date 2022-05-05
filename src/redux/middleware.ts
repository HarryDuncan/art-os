import thunk from "redux-thunk";
import logger from "redux-logger";
import { isDevelopment } from "../utils";

export const middleware = isDevelopment ? [thunk, logger] : [thunk];

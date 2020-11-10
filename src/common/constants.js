import io from "socket.io-client";

export const baseUrl = "http://127.0.0.1:5000";

export const tokenKey = "xxxx-agrixx-token";
export const cartItemKey = "xxxx-agrixx-cart-items";
export const refreshTokenKey = "xxxx-agrixx-refresh-token";

export let private_socket = io.connect(`${baseUrl}/private`);

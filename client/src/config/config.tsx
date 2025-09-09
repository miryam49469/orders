 const BASE_URL = process.env.REACT_APP_BASE_URL;
// Define the full URL for getting all orders
const GET_ALL_ORDERS_URL = `${BASE_URL}/order`;
const LOGIN_URL=`${BASE_URL}/User/login`;
export { BASE_URL,GET_ALL_ORDERS_URL,LOGIN_URL };


export const PALLETE = {
    BLUE: '#6794CF',
    YELLOW: '#FAE282',
    RED: '#EE696A',
    GREEN: '#7ED787',
    ORANGE: '#EB9F6E',
    WHITE: '#FFFFFF',
    GRAY: '#F2F2F2',
}

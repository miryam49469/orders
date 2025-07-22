import axios from "axios"

export const getCurrencies = async() => {
    return await axios.get("http://localhost:8080/GetCurrency")
}
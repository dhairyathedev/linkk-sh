import axios from "axios";

export async function getIp(){
    const ip = await axios.get("https://api.ipify.org/?format=json")
    return ip.data.ip
}
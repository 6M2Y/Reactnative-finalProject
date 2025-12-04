//----------------------------------------
//location api
//--------------------------------

import { getClientApi } from "./apiClient";

export const updateLocationData = async (userId: string, latitude: number, longitude: number) => {
    const apiClient = await getClientApi();
    const res = await apiClient.patch(`/lacation/${userId}`, { latitude, longitude })
    return res.data
}
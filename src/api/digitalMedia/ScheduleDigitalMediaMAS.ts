/* Import Dependencies */
import axios from 'axios';

/* Import Types */
import { JSONResultArray, Dict } from 'global/Types';


const ScheduleDigitalMediaMAS = async (handle: string, MASRequest: Dict, token?: string) => {
    let digitalMediaMAS: Dict[] = [];

    if (handle && token) {
        const endPoint: string = `/digitalmedia/${handle.replace('https://hdl.handle.net/', '')}/mas`;

        try {
            const result = await axios({
                method: "post",
                url: endPoint,
                data: MASRequest,
                responseType: 'json',
                headers: {
                    'Content-type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
            });

            /* Set Digital Media MASl */
            const data: JSONResultArray = result.data;

            digitalMediaMAS = data.data;
        } catch (error) {
            console.warn(error);
        }
    }

    return digitalMediaMAS;
}

export default ScheduleDigitalMediaMAS;
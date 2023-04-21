/* Import Dependencies */
import axios from 'axios';

/* Import Model */
import AnnotationModel from "api/model/AnnotationModel";

/* Import Types */
import { Annotation, JSONResultArray } from 'global/Types';

/* Import API */
/* import GetSpecimen from 'api/specimen/GetSpecimen'; */


const GetUserAnnotations = async (token: string | undefined, pageSize: number, pageNumber?: number) => {
    if (token) {
        let userAnnotations = <Annotation[]>[];

        const endPoint = 'annotations/creator';

        try {
            const result = await axios({
                method: "get",
                url: endPoint,
                responseType: 'json',
                params: {
                    pageSize: pageSize,
                    pageNumber: pageNumber ? pageNumber : 1
                },
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });

            /* Set User Annotations with model */
            const data: JSONResultArray = result.data;

            data.data.forEach((dataRow) => {
                const annotation = AnnotationModel(dataRow);

                userAnnotations.push(annotation);
            });

            /* Temporary solution to include Specimen data */
            /* for (const index in userAnnotations) {
                const annotation = userAnnotations[index];

                GetSpecimen(annotation.target.id.replace("https://hdl.handle.net/", "")).then((specimen) => {
                    userAnnotations[index].specimen = specimen;
                });
            } */
        } catch (error) {
            console.warn(error);
        }

        return userAnnotations;
    }
}

export default GetUserAnnotations;
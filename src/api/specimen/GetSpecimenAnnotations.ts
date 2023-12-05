/* Import Dependencies */
import axios from 'axios';

/* Import Types */
import { SpecimenAnnotations, JSONResultArray } from 'app/Types';
import { Annotation } from 'app/types/Annotation';


const GetSpecimenAnnotations = async (handle: string) => {
    let specimenAnnotations = {} as SpecimenAnnotations;

    if (handle) {
        const endPoint = `specimens/${handle}/annotations`;

        try {
            const result = await axios({
                method: "get",
                url: endPoint,
                responseType: 'json',
            });

            /* Set Specimen Annotations with Model */
            const data: JSONResultArray = result.data;
            const annotations: Annotation[] = [];

            data.data.forEach((dataRow) => {
                annotations.push(dataRow.attributes as Annotation);
            });

            /* Refactor Annotations object */
            annotations.forEach((annotation) => {
                const annotationIndicator: string = annotation['oa:target']['oa:selector']?.['ods:field'] as string
                    ?? annotation['oa:target']['oa:selector']?.['oa:class'] as string;

                if (specimenAnnotations[annotation['oa:target']['oa:selector']?.[annotationIndicator] as string]) {
                    specimenAnnotations[annotationIndicator.replace('$./', '')].push(annotation);
                } else {
                    specimenAnnotations[annotationIndicator.replace('$./', '')] = [annotation];
                }
            });
        } catch (error) {
            console.warn(error);
        }
    }

    return specimenAnnotations;
}

export default GetSpecimenAnnotations;
import { ImageBufferType } from "../../../../entities/bufferType/ImageBufferType";
import { WorkSamplesEntity } from "../../../../entities/vendor/workSampleEntity";

export interface IWorkSampleCreationUseCase {
    createWorkSample(workSample: WorkSamplesEntity,imageDetails:ImageBufferType[]): Promise<WorkSamplesEntity | null>
}
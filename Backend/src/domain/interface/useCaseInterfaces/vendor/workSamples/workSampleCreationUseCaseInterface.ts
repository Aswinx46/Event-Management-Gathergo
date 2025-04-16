import { WorkSamplesEntity } from "../../../../entities/vendor/workSampleEntity";

export interface IWorkSampleCreationUseCase {
    createWorkSample(workSample: WorkSamplesEntity): Promise<WorkSamplesEntity | null>
}
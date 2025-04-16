import { WorkSamplesEntity } from "../../../domain/entities/vendor/workSampleEntity";
import { IworkSampleRepository } from "../../../domain/interface/repositoryInterfaces/workSamples/workSampleRepositoryInterface";
import { IWorkSampleCreationUseCase } from "../../../domain/interface/useCaseInterfaces/vendor/workSamples/workSampleCreationUseCaseInterface";

export class WorkSampleCreationUseCase implements IWorkSampleCreationUseCase {
    private workSampleDatabase: IworkSampleRepository
    constructor(workSampleDatabase: IworkSampleRepository) {
        this.workSampleDatabase = workSampleDatabase
    }
    async createWorkSample(workSample: WorkSamplesEntity): Promise<WorkSamplesEntity | null> {
        return await this.workSampleDatabase.createWorkSamples(workSample)
    }
}
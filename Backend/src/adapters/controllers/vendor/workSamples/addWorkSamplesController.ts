import { Request, Response } from "express";
import { IWorkSampleCreationUseCase } from "../../../../domain/interface/useCaseInterfaces/vendor/workSamples/workSampleCreationUseCaseInterface";
import { HttpStatus } from "../../../../domain/entities/httpStatus";

export class CreateWorkSampleController {
    private addWorkSamplesUseCase: IWorkSampleCreationUseCase
    constructor(addWorkSamplesUseCase: IWorkSampleCreationUseCase) {
        this.addWorkSamplesUseCase = addWorkSamplesUseCase
    }
    async handleAddWorkSample(req: Request, res: Response): Promise<void> {
        try {

            const files = req.files as Express.Multer.File[]
            const images = files.map((item) => ({ imageBuffer: item.buffer, fileName: item.originalname }))
           
            const workSampleData = JSON.parse(req.body.workSampleData)

            const newWorkSample = await this.addWorkSamplesUseCase.createWorkSample(workSampleData,images)
            res.status(HttpStatus.CREATED).json({ message: "Work Sample created", newWorkSample })
        } catch (error) {
            console.log('Error while creating workSample', error)
            res.status(HttpStatus.BAD_REQUEST).json({
                message: "Error while creating workSample",
                error: error instanceof Error ? error.message : 'Error while creating workSample'
            })
        }
    }
}
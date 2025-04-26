import { Request, Response } from "express";
import { IsearchServiceUseCase } from "../../../../domain/interface/useCaseInterfaces/client/service/searchServiceUseCaseInterface";
import { HttpStatus } from "../../../../domain/entities/httpStatus";

export class SearchServiceController {
    private searchServiceUseCase: IsearchServiceUseCase
    constructor(searchServiceUseCase: IsearchServiceUseCase) {
        this.searchServiceUseCase = searchServiceUseCase
    }
    async handleSearchService(req: Request, res: Response): Promise<void> {
        try {
            const queryParam = req.query.query;

            if (typeof queryParam !== 'string') {
                res.status(HttpStatus.BAD_REQUEST).json({ message: 'Query must be a string' });
                return;
            }

            const searchedService = await this.searchServiceUseCase.searchService(queryParam)
            res.status(HttpStatus.OK).json({ message: 'searched service', searchedService })
        } catch (error) {
            console.log('error while performing search service', error)
            res.status(HttpStatus.BAD_REQUEST).json({
                message: "error while performing search service",
                error: error instanceof Error ? error.message : 'error while performing search service'
            })
        }
    }
}
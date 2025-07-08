export interface IeventCancellationUseCase {
    cancelEvent(eventId: string): Promise<boolean>
}
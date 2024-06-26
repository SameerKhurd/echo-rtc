import { ConnectionCollectionService } from '../database-services/connection-collection.service';

export interface PubSubChannel {
  publish(): void;
  subscribe(): void;
}

export class AnswerCandidatesChannel {
  constructor(
    private connectionCollectionService: ConnectionCollectionService
  ) {}

  subscribe(
    meetingId: string,
    connectionId: string,
    callbackFunction: Function
  ): void {
    this.connectionCollectionService.attachAnswerCandidateSnapshotListner(
      meetingId,
      connectionId,
      callbackFunction
    );
  }

  async publish(
    meetingId: string,
    connectionId: string,
    sessionTimeId: number,
    candidateId: string,
    answerCandidateData: RTCIceCandidateInit
  ): Promise<void> {
    await this.connectionCollectionService.addAnswerCandidate(
      meetingId,
      connectionId,
      sessionTimeId,
      candidateId,
      answerCandidateData
    );
  }
}

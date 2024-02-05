import {
  Publisher,
  Subjects,
  TicketCreatedEvent,
} from "@chakhmah-tickets/common";

export class TickedCreatedPublisher extends Publisher<TicketCreatedEvent> {
  readonly subject = Subjects.TicketCreated;
}

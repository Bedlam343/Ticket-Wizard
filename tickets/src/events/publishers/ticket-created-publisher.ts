import {
  Publisher,
  Subjects,
  TicketCreatedEvent,
} from "@chakhmah-tickets/common";

export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent> {
  readonly subject = Subjects.TicketCreated;
}

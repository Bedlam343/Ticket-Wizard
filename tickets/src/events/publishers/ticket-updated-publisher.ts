import {
  Publisher,
  Subjects,
  TicketUpdatedEvent,
} from "@chakhmah-tickets/common";

export class TicketUpdatedPublisher extends Publisher<TicketUpdatedEvent> {
  readonly subject = Subjects.TicketUpdated;
}

import {
  Publisher,
  OrderCreatedEvent,
  Subjects,
} from "@chakhmah-tickets/common";

export class OrderCreatedPublisher extends Publisher<OrderCreatedEvent> {
  readonly subject = Subjects.OrderCreated;
}

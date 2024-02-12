import {
  Publisher,
  OrderCancelledEvent,
  Subjects,
} from "@chakhmah-tickets/common";

export class OrderCancelledPublisher extends Publisher<OrderCancelledEvent> {
  readonly subject = Subjects.OrderCancelled;
}

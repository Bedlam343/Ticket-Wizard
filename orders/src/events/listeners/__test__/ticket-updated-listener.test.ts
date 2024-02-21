import mongoose from "mongoose";
import { TicketUpdatedEvent } from "@chakhmah-tickets/common";
import { TicketUpdatedListener } from "../ticket-updated-listener";
import { natsWrapper } from "../../../nats-wrapper";
import { Ticket } from "../../../models/ticket";
import { Message } from "node-nats-streaming";

const setup = async () => {
  const listener = new TicketUpdatedListener(natsWrapper.client);
  const ticket = Ticket.build({
    id: new mongoose.Types.ObjectId().toHexString(),
    title: "concerto",
    price: 10,
  });
  await ticket.save();

  const data: TicketUpdatedEvent["data"] = {
    id: ticket.id,
    version: ticket.version + 1,
    title: "concerto2",
    price: 20,
    userId: "who cares",
  };

  // @ts-ignore
  const msg: Message = {
    ack: jest.fn(),
  };

  return { listener, data, ticket, msg };
};

it("find, updates, and saves a ticket", async () => {
  const { listener, data, ticket, msg } = await setup();
  await listener.onMessage(data, msg);

  const updatedTicket = await Ticket.findById(ticket.id);

  expect(updatedTicket!.title).toEqual(data.title);
  expect(updatedTicket!.price).toEqual(data.price);
  expect(updatedTicket!.version).toEqual(data.version);
});

it("acks the message", async () => {
  const { listener, data, msg } = await setup();
  await listener.onMessage(data, msg);

  expect(msg.ack).toHaveBeenCalled();
});

it("does not call ack if the event is out of order", async () => {
  const { listener, data, ticket, msg } = await setup();
  data.version = 80;

  try {
    await listener.onMessage(data, msg);
  } catch (err) {}

  expect(msg.ack).not.toHaveBeenCalled();
});

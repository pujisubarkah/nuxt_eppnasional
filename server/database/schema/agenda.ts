// schema/agenda.ts
import { pgTable, serial, text } from 'drizzle-orm/pg-core';

export const agenda = pgTable("agendas", {
  id: serial("id").primaryKey(),
  name: text("name"),
});
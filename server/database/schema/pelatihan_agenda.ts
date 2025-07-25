// schema/agenda.ts
import { pgTable, serial, integer } from 'drizzle-orm/pg-core';
import { pelatihan } from './pelatihan';
import { agenda } from './agenda';

export const pelatihanAgenda = pgTable("pelatihan_agenda", {
  id: serial("id").primaryKey(),
  pelatihan_id: integer("pelatihan_id").references(() => pelatihan.id),
  agenda_id: integer("agenda_id").references(() => agenda.id),
});
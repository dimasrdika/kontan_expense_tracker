import {
  integer,
  numeric,
  pgTable,
  serial,
  varchar,
} from "drizzle-orm/pg-core";

//budget schema

export const budget = pgTable("budget", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  amount: numeric("amount", { precision: 10, scale: 2 }).notNull(),
  icon: varchar("icon"),
  cretedBy: varchar("createdBy", { length: 255 }).notNull(),
});

// income schema

export const income = pgTable("income", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  amount: numeric("amount", { precision: 10, scale: 2 }).notNull(),
  icon: varchar("icon"),
  cretedBy: varchar("createdBy", { length: 255 }).notNull(),
});

// expense schema
export const expense = pgTable("expense", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  amount: numeric("amount", { precision: 10, scale: 2 }).notNull(),
  budgetId: integer("budgetId").references(() => budget.id),
  cretedBy: varchar("createdBy", { length: 255 }).notNull(),
});

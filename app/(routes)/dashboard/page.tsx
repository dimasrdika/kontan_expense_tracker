"use client";

import React, { useState, useEffect } from "react";
import { UserButton } from "@clerk/nextjs";
import CardInfo from "./_components/cardinfo";
import { db } from "@/utils/dbConfig";
import { desc, eq, getTableColumns, sql } from "drizzle-orm";
import { budget, income, expense } from "@/utils/schema";

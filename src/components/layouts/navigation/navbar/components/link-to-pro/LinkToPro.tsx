"use client"

// NEXT
import Link from "next/link";
// UTILS
import { witRequiredSubscription } from "@/utils/with-required-subscription";
// TYPES
import { PRO_STATUS } from "@/types/db";


const LinkToPage = () => (
  <Link href="/pro">
    Pro
  </Link>
);

export const LinkToPro = witRequiredSubscription(LinkToPage, [PRO_STATUS.FREE, PRO_STATUS.CANCELED]);
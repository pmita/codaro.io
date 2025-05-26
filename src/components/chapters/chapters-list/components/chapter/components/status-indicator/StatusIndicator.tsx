"use client"

// PACKAGES
import { LockKeyhole } from "lucide-react";
// STYLES
import styles from './styles.module.css';
// UTILS
import { cn } from '@/lib/utils';
import { withAuth } from "@/utils/with-auth";
// TYPES
import { StatusIndicatorProps } from './types';

const Component = ({ canAccess, status }: StatusIndicatorProps) => {
  return (
    <>
      {canAccess ? (
        <div className={cn(styles.status, status ? styles.completed : styles.uncompleted)} />
      ) : (
        <LockKeyhole width={20} height={20} color="#b72b1a" />
      )}
    </>
  )
}

export const StatusIndicator = withAuth(Component, <LockKeyhole width={20} height={20} color="#b72b1a" />);
// src/types.ts

export type Node = {
  id: string;
  label: string;
  displayName?: string;
  avatarUrl?: string;
};

export type Link = {
  source: string;
  target: string;
  label: string;
};

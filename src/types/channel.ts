export interface Channel {
  id: string;
  name: string;
  url: string;
  category: string;
  logo?: string;
  epg?: string;
  active: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface Category {
  id: string;
  name: string;
  order: number;
}
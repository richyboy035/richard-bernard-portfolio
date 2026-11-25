export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type ProjectStatus = 'draft' | 'published';

export type ProjectRow = {
  id: string;
  slug: string;
  name: string;
  type: string;
  desc: string;
  tags: string[];
  visual: string;
  featured: boolean;
  live_url: string | null;
  prototype_url: string | null;
  behance_url: string | null;
  category: string;
  role: string;
  year: string;
  overview: string;
  challenge: string;
  approach: string;
  solution: string;
  highlights: string[];
  key_decision: string;
  outcome: string;
  technologies: string[];
  cover_image: string | null;
  status: ProjectStatus;
  sort_order: number;
  created_at: string;
  updated_at: string;
};

export type ContactMessageRow = {
  id: string;
  name: string;
  email: string;
  subject: string | null;
  message: string;
  status: 'new' | 'read' | 'replied' | 'archived';
  created_at: string;
};

type TableDefinition<Row, Insert, Update> = {
  Row: Row;
  Insert: Insert;
  Update: Update;
  Relationships: [];
};

export type Database = {
  public: {
    Tables: {
      projects: TableDefinition<
        ProjectRow,
        Omit<ProjectRow, 'id' | 'created_at' | 'updated_at'> & {
          id?: string;
          created_at?: string;
          updated_at?: string;
        },
        Partial<Omit<ProjectRow, 'id' | 'created_at' | 'updated_at'>>
      >;
      contact_messages: TableDefinition<
        ContactMessageRow,
        Omit<ContactMessageRow, 'id' | 'status' | 'created_at'> & {
          id?: string;
          status?: ContactMessageRow['status'];
          created_at?: string;
        },
        Partial<Pick<ContactMessageRow, 'status'>>
      >;
      admin_users: TableDefinition<
        { user_id: string; created_at: string },
        { user_id: string; created_at?: string },
        never
      >;
    };
    Views: Record<string, never>;
    Functions: {
      is_admin: { Args: Record<PropertyKey, never>; Returns: boolean };
    };
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
};

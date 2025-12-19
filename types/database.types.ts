export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string;
          email: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          email: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          email?: string;
          created_at?: string;
          updated_at?: string;
        };
      };
      subscriptions: {
        Row: {
          id: string;
          user_id: string;
          status: string;
          price_id: string;
          current_period_end: string;
          created_at: string;
        };
        Insert: {
          id: string;
          user_id: string;
          status: string;
          price_id: string;
          current_period_end: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          status?: string;
          price_id?: string;
          current_period_end?: string;
          created_at?: string;
        };
      };
    };
  };
}

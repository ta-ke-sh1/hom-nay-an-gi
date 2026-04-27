import type {DatabaseTables} from "../enums/enums.ts";
import {createClient, type SupabaseClient} from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_DEFAULT_KEY;

export class DatabaseService {

    private static instance: DatabaseService;

    private readonly database: SupabaseClient;

    private constructor() {
        this.database = createClient(supabaseUrl, supabaseKey);
    }

    public static getInstance() {
        if (!DatabaseService.instance) {
            DatabaseService.instance = new DatabaseService();
        }
        return DatabaseService.instance;
    }

    public getDatabase() {
        return this.database;
    }

    public async get(table: DatabaseTables) {
        return this.database.from(table).select();
    }

    public async getByField(table: DatabaseTables, column: string, value: string) {
        await this.database.from(table).select().eq(column, value)
    }

    public async add(table: DatabaseTables, data: any) {
        console.log(data)
        await this.database.from(table).insert(data);
    }

    public async delete(table: DatabaseTables, id: string) {
        await this.database.from(table).delete().eq('id', id)
    }
}
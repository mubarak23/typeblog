import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('posts', (t) => {
        t.increments('id').primary();
        t.string('title').notNullable();
        t.string('content').notNullable();
        t.string('image').nullable();
        t
        .integer("user_id")
        .unsigned()
        .references("id")
        .inTable("users")
        .onDelete("CASCADE");
        t.timestamp("created_at").defaultTo(knex.fn.now());
        t.timestamp("updated_at").defaultTo(knex.fn.now());
    
      })
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable('posts');
}


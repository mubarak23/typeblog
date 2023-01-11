/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('posts', (table) => {
    table.increments(id).primary();
    table.string('title').notNullable();
    table.string('content').notNullable();
    table.string('image').nullable();
    table
    .integer("user_id")
    .unsigned()
    .references("id")
    .inTable("users")
    .onDelete("CASCADE");
    table.timestamp("created_at").defaultTo(knex.fn.now());
    table.timestamp("updated_at").defaultTo(knex.fn.now());

  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  
};

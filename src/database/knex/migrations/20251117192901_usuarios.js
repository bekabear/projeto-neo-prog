/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function up (knex) {
  return knex.schema.createTable('usuarios', (table) => {
    table.string('id').primary();
    table.string('nome', 100).notNullable();
    table.string('email', 100).unique().notNullable();
    table.string('senha', 255).notNullable();
    table.enu('tipo',['instrutor', 'admin']).notNullable();
    table.timestamp('criado_em').defaultTo(knex.fn.now());
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 * 
 */
export function down (knex) {
  return knex.schema.dropTable("usuarios")
};

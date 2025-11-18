/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function up(knex) {
  return knex.schema.createTable('produtos', (table) => {
    table.string('id').primary();
    table.string('nome', 150).notNullable();
    table.string('tipo', 100).notNullable();
    table.text('descricao').notNullable();
    table.timestamp("criado_em").defaultTo(knex.fn.now());
    table.timestamp("atualizado_em").defaultTo(knex.fn.now());

  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function down (knex) {
  return knex.schema.dropTable("produtos")
};

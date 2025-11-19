/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function up(knex) {
  return knex.schema.createTable('estoque', (table) => {
    table.string('id').primary();
    table.string('produtos_id').notNullable();
    table.integer('quantidade').notNullable();
    table.string('local_armazenado', 100).notNullable();
    table.string('atualizado_por', 36).notNullable();
    table.timestamp('atualizado_em').defaultTo(knex.fn.now());
    table.enu('turnos', ['manha', 'tarde', 'noite']).notNullable();
    table.foreign('produtos_id').references('id').inTable('produtos');
    table.foreign('atualizado_por').references('id').inTable('usuarios')
  })

}


/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function down(knex) {
  return knex.schema.dropTable("estoque")
};

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
            table.integer('atualizado_por').notNullable();
            table.timestamp('atualizado_em').defaultTo(knex.fn.now());
            table.enu('turnos', ['manha', 'tarde', 'noite']).notNullable();
        })

        }


/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function down (knex) {
  return knex.schema.dropTable("estoque")
};

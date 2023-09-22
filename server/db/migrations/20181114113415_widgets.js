export async function up(knex) {
  await knex.schema.createTable('musicLinks', (table) => {
    table.increments('id').primary()
    table.string('name')
    table.integer('url')
  })
}

export async function down(knex) {
  await knex.schema.dropTable('musicLinks')
}

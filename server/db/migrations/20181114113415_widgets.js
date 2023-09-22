export async function up(knex) {
  await knex.schema.createTable('widgets', (table) => {
    table.increments('id').primary()
    table.string('name')
    table.integer('price')
    table.string('mfg')
    table.integer('inStock')
  })
}

export async function down(knex) {
  await knex.schema.dropTable('widgets')
}

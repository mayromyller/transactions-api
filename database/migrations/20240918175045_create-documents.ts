import type { Knex } from 'knex'

import { TableName } from '../../src/config/tableEnum'

export async function up(knex: Knex): Promise<void> {
	await knex.schema.createTable(TableName.TRANSACTIONS, (table) => {
		table.uuid('id').primary()
		table.text('title').notNullable()
		table.decimal('amount', 10, 2).notNullable()
		table.timestamp('created_at').defaultTo(knex.fn.now())
	})
}

export async function down(knex: Knex): Promise<void> {
	await knex.schema.dropTable(TableName.TRANSACTIONS)
}

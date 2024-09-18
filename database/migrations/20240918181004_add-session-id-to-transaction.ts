import type { Knex } from 'knex'

import { TableName } from '../../src/config/tableEnum'

export async function up(knex: Knex): Promise<void> {
	await knex.schema.alterTable(TableName.TRANSACTIONS, (table) => {
		table.uuid('session_id').after('id').index()
	})
}

export async function down(knex: Knex): Promise<void> {
	await knex.schema.alterTable(TableName.TRANSACTIONS, (table) => {
		table.dropColumn('session_id')
	})
}

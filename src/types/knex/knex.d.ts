import { Knex } from 'knex'

import type { TransactionTable } from '../tables/TransactionsTable'

declare module 'knex/types/tables' {
	export interface Tables {
		transactions: TransactionTable
	}
}

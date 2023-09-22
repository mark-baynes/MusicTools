import connection from './connection.ts'

import { Widget } from '../../models/Widget.ts'

export function getWidgets(db = connection): Promise<Widget[]> {
  return db<Widget>('widgets').select()
}

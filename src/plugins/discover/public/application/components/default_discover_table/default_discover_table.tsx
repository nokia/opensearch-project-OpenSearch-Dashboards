/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import './_doc_table.scss';

import React from 'react';
import { EuiDataGridColumn, EuiDataGridSorting } from '@elastic/eui';
import { TableHeader } from './table_header';
import { DocViewFilterFn, OpenSearchSearchHit } from '../../doc_views/doc_views_types';
import { TableRow } from './table_rows';
import { IndexPattern } from '../../../opensearch_dashboards_services';

export interface DefaultDiscoverTableProps {
  displayedTableColumns: EuiDataGridColumn[];
  columns: string[];
  rows: OpenSearchSearchHit[];
  indexPattern: IndexPattern;
  sortOrder: Array<{
    id: string;
    direction: 'asc' | 'desc';
  }>;
  onChangeSortOrder: (cols: EuiDataGridSorting['columns']) => void;
  onRemoveColumn: (column: string) => void;
  onReorderColumn: (col: string, source: number, destination: number) => void;
  onAddColumn: (column: string) => void;
  onFilter: DocViewFilterFn;
  onClose: () => void;
}

export const LegacyDiscoverTable = ({
  displayedTableColumns,
  columns,
  rows,
  indexPattern,
  sortOrder,
  onChangeSortOrder,
  onRemoveColumn,
  onReorderColumn,
  onAddColumn,
  onFilter,
  onClose,
}: DefaultDiscoverTableProps) => {
  return (
    indexPattern && (
      <table data-test-subj="docTable" className="osd-table table">
        <thead>
          <TableHeader
            displayedTableColumns={displayedTableColumns}
            defaultSortOrder={''}
            // hideTimeColumn,
            indexPattern={indexPattern}
            // isShortDots,
            onChangeSortOrder={onChangeSortOrder}
            onReorderColumn={onReorderColumn}
            onRemoveColumn={onRemoveColumn}
            sortOrder={sortOrder}
          />
        </thead>
        <tbody>
          {rows.map((row: OpenSearchSearchHit) => {
            return (
              <TableRow
                key={row._id}
                row={row}
                columnIds={displayedTableColumns.map((column) => column.id)}
                columns={columns}
                indexPattern={indexPattern}
                onRemoveColumn={onRemoveColumn}
                onAddColumn={onAddColumn}
                onFilter={onFilter}
                onClose={onClose}
              />
            );
          })}
        </tbody>
      </table>
    )
  );
};

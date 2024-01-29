/*
 * SPDX-License-Identifier: Apache-2.0
 *
 * The OpenSearch Contributors require contributions made to
 * this file be licensed under the Apache-2.0 license or a
 * compatible open source license.
 *
 * Any modifications Copyright OpenSearch Contributors. See
 * GitHub history for details.
 */

import './_table_cell.scss';

import React from 'react';
import dompurify from 'dompurify';
import { EuiButtonIcon, EuiToolTip } from '@elastic/eui';
import { i18n } from '@osd/i18n';
import { DocViewFilterFn } from '../../doc_views/doc_views_types';

export interface TableCellProps {
  columnId: string;
  onFilter: DocViewFilterFn;
  filterable?: boolean;
  fieldMapping?: any;
  formattedValue: any;
}

export const TableCell = ({
  columnId,
  onFilter,
  filterable,
  fieldMapping,
  formattedValue,
}: TableCellProps) => {
  if (typeof formattedValue === 'undefined') {
    return (
      <td
        data-test-subj="docTableField"
        className="osdDocTableCell eui-textBreakAll eui-textBreakWord"
      >
        <span>-</span>
      </td>
    );
  } else {
    const sanitizedCellValue = dompurify.sanitize(formattedValue);

    const filters = (
      <span className="osdDocTableCell__filter">
        <EuiToolTip
          content={i18n.translate('discover.filterForValue', {
            defaultMessage: 'Filter for value',
          })}
        >
          <EuiButtonIcon
            onClick={() => onFilter(columnId, fieldMapping, '+')}
            iconType="plusInCircle"
            aria-label={i18n.translate('discover.filterForValueLabel', {
              defaultMessage: 'Filter for value',
            })}
            data-test-subj="filterForValue"
            className="osdDocTableCell__filterButton"
          />
        </EuiToolTip>
        <EuiToolTip
          content={i18n.translate('discover.filterOutValue', {
            defaultMessage: 'Filter out value',
          })}
        >
          <EuiButtonIcon
            onClick={() => onFilter(columnId, fieldMapping, '-')}
            iconType="minusInCircle"
            aria-label={i18n.translate('discover.filterOutValueLabel', {
              defaultMessage: 'Filter out value',
            })}
            data-test-subj="filterOutValue"
            className="osdDocTableCell__filterButton"
          />
        </EuiToolTip>
      </span>
    );

    return (
      // eslint-disable-next-line react/no-danger
      <td
        data-test-subj="docTableField"
        className="osdDocTableCell eui-textBreakAll eui-textBreakWord"
      >
        <span dangerouslySetInnerHTML={{ __html: sanitizedCellValue }} />
        {filterable && filters}
      </td>
    );
  }
};

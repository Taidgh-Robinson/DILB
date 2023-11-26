import React from 'react';
import { datatableProps } from './DatatableTypes';
import { Table } from 'react-bootstrap';

export function Datatable(props: datatableProps) {
    return (
        <div>
            <Table responsive="sm">
                    <thead>
                      <tr>
                         {props.headers.map(d => (<th>{d}</th>))}
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                         {props.values.map(d => (<td>{d}</td>))}
                      </tr>
                    </tbody>
            </Table>

        </div>
)     
}
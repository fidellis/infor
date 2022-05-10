import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { message } from '~/store/app';
import Card from '~/components/Card';
import Grid from '~/components/Grid';
import Form from '~/components/form/Form';
import { TextInput, TextArea, NumberInput, DateInput, Select } from '~/components/form/form/inputs';
import SelectUor from '~/components/select/SelectUor';
import BasicTable from '~/components/data-table/BasicTable';
import { getData, save, destroy } from '~/lib/api';
import moment from 'moment';
import {
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    TableFooter,
} from '@material-ui/core';
//import qs from 'qs';

const Component = props => {
    // const id = Number(match.params.id);
    const descricoes = props.descricoes;

    console.log('descricoes', descricoes)


    return (
        <Card>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell component="th" style={{ width: '5%' }}>Status</TableCell>
                        <TableCell component="th" style={{ width: '15%' }}>De</TableCell>
                        <TableCell component="th" style={{ width: '15%' }}>Para</TableCell>
                        <TableCell component="th" style={{ width: '12%' }}>Funci</TableCell>
                        <TableCell component="th" style={{ width: '10%' }}>Data</TableCell>
                        <TableCell component="th" style={{ width: '5%' }}>Status</TableCell>
                        <TableCell component="th">Descrição</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {descricoes.map(descricao => {
                        const { movimentacao, usuarioInclusao, dataHoraInclusao, status } = descricao;
                        return (
                            <TableRow>
                                <TableCell>{movimentacao.status.nome}</TableCell>
                                <TableCell>{movimentacao.uorOrigem.nome}</TableCell>
                                <TableCell>{movimentacao.uorDestino.nome}</TableCell>
                                <TableCell>{usuarioInclusao.nome}</TableCell>
                                <TableCell>{moment(dataHoraInclusao).format('DD/MM/YYYY HH:mm')}</TableCell>
                                <TableCell>{descricao.descricao}</TableCell>
                                <TableCell>{status.nome}</TableCell>
                            </TableRow>)
                    })}
                </TableBody>
            </Table>
        </Card>
    );
};

export default Component;

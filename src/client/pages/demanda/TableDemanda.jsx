import React, { useState, useEffect } from 'react';
import Card from '~/components/Card';
import moment from 'moment';
import Icon from '~/components/icons/Icon';
import AvatarUsuario from '~/components/avatar/AvatarUsuario';
import {
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    TableFooter,
} from '@material-ui/core';
//import qs from 'qs';

const Component = ({ onClickAction, ...props }) => {
    // const id = Number(match.params.id);
    const descricoes = props.descricoes;

    return (
        <Card>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell component="th" align="center" style={{ width: '5%' }}></TableCell>
                        <TableCell component="th" align="center" style={{ width: '8%' }}>De</TableCell>
                        <TableCell component="th" align="center" style={{ width: '8%' }}>Para</TableCell>
                        <TableCell component="th" align="center" style={{ width: '5%' }}>Funcionário</TableCell>
                        <TableCell component="th" align="center" style={{ width: '5%' }}>Data</TableCell>
                        <TableCell component="th" align="center" style={{ width: '5%' }}>Status</TableCell>
                        <TableCell component="th" align="center">Descrição</TableCell>
                        <TableCell component="th" align="center" style={{ width: '1%' }}></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {descricoes.map((descricao, i) => {
                        const { movimentacao, usuarioInclusao, usuarioInclusao_id, dataHoraInclusao, status } = descricao;
                        const descricaoAnterioro = descricoes[i - 1];
                        const exibirMovimentacao = !descricaoAnterioro ? true : descricaoAnterioro.movimentacao.id !== descricao.movimentacao.id;
                        const ultimaLInha = descricoes.length === i + 1;

                        return (
                            <TableRow>
                                <TableCell>{exibirMovimentacao && movimentacao.status.nome}</TableCell>
                                <TableCell>{exibirMovimentacao && movimentacao.uorOrigem.nomeReduzido}</TableCell>
                                <TableCell>{exibirMovimentacao && movimentacao.uorDestino.nomeReduzido}</TableCell>
                                <TableCell align="center"><AvatarUsuario chave={usuarioInclusao_id} title={`${usuarioInclusao_id} - ${usuarioInclusao.nome}`} /></TableCell>
                                <TableCell align="center">{moment(dataHoraInclusao).format('DD/MM/YYYY HH:mm')}</TableCell>
                                <TableCell>{status.nome}</TableCell>
                                <TableCell>{descricao.descricao}</TableCell>
                                <TableCell>
                                    {ultimaLInha && <Icon fontSize="small" title="Adicionar Observação" onClick={() => onClickAction({ movimentacao_id: movimentacao.id })}>add_circle</Icon>}
                                    {ultimaLInha && <Icon fontSize="small" title="Alterar status" onClick={() => onClickAction({ id: descricao.id, status_id: descricao.status_id, movimentacao })}>edit</Icon>}
                                    {ultimaLInha && <Icon fontSize="small" title="Encaminhar" onClick={() => onClickAction({})}>send</Icon>}
                                </TableCell>
                            </TableRow>)
                    })}
                </TableBody>
            </Table>
        </Card>
    );
};

export default Component;

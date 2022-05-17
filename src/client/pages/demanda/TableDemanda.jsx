import React from 'react';
import Icon from '~/components/icons/Icon';
import AvatarUsuario from '~/components/avatar/AvatarUsuario';
import IconMenu from '~/components/icons/IconMenu';
import moment from 'moment';
import { Table, TableHead, TableRow, TableCell, TableBody, } from '@material-ui/core';

const Component = props => {

    const {
        usuario,
        demanda,
        movimentacoes,
        // acessos,
        onClickActionDescricao,
        onClickActionStatus,
        onClickActionMovimentacao,
    } = props;

    const uorUsuarioId = usuario.uor_id;

    const isSolicitanteDemanda = uorUsuarioId === demanda.uorOrigem_id;
    const isResponsavelDemanda = uorUsuarioId === demanda.uorDestino_id;

    const EM_HOMOLOGACAO = demanda.status_id === 5;
    const HOMOLOGADO = demanda.status_id === 6;
    const FINALIZADO = demanda.status_id === 7;
    const DEVOLVIDO = demanda.status_id === 9;
    const DEVOLVIDO_AJUSTES = demanda.status_id === 10;

    return (

        <Table>
            <TableHead>
                <TableRow>
                    <TableCell component="th" align="center" style={{ width: '5%' }}>Funcionário</TableCell>
                    <TableCell component="th" align="center" style={{ width: '5%' }}>Data</TableCell>
                    <TableCell component="th" align="center" style={{ width: '8%' }}>UOR Solicitante</TableCell>
                    <TableCell component="th" align="center" style={{ width: '8%' }}>UOR Responsável</TableCell>
                    <TableCell component="th" align="center" style={{ width: '5%' }}>Status</TableCell>
                    <TableCell component="th" align="center">Descrição</TableCell>
                    <TableCell component="th" align="center" style={{ width: '1%' }}></TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {movimentacoes.map((row, i) => {

                    const isSolicitanteAtual = uorUsuarioId === row.uorOrigem_id;
                    const isResponsavelAtual = uorUsuarioId === row.uorDestino_id;

                    const acessos = {
                        descricao: !FINALIZADO && !HOMOLOGADO && (isResponsavelAtual),
                        status: !FINALIZADO && !HOMOLOGADO && !DEVOLVIDO && !EM_HOMOLOGACAO && (isResponsavelAtual),
                        movimentacao: !FINALIZADO && !HOMOLOGADO && !DEVOLVIDO && !EM_HOMOLOGACAO && (isResponsavelAtual),
                        devolucao: {
                            informacao: !FINALIZADO && !HOMOLOGADO && !EM_HOMOLOGACAO && (isResponsavelAtual),
                            ajuste: !FINALIZADO && !HOMOLOGADO && EM_HOMOLOGACAO && (isResponsavelAtual),
                        },
                        responder: !FINALIZADO && !HOMOLOGADO && (isResponsavelAtual),
                        homologacao: !FINALIZADO && EM_HOMOLOGACAO && !HOMOLOGADO && (isResponsavelAtual),
                        finalizar: !FINALIZADO && HOMOLOGADO && (isResponsavelAtual || isResponsavelDemanda),
                        reabrir: FINALIZADO && isSolicitanteDemanda,
                    };

                    const rowAnterior = movimentacoes[i - 1];

                    const exibirMovimentacao = !rowAnterior ? true : row['id'] !== rowAnterior['id'];
                    const exibirStatus = !rowAnterior || exibirMovimentacao ? true : row['movimentacoesStatus.status.id'] !== rowAnterior['movimentacoesStatus.status.id'];

                    const usuario = {
                        id: row['movimentacoesStatus.descricoes.usuarioInclusao.id'] || row['movimentacoesStatus.usuarioInclusao.id'] || row['usuarioInclusao.id'],
                        nome: row['movimentacoesStatus.descricoes.usuarioInclusao.nome'] || row['movimentacoesStatus.usuarioInclusao.nome'] || row['usuarioInclusao.nome'],
                    };

                    const data = row['movimentacoesStatus.descricoes.dataHoraInclusao'] || row['movimentacoesStatus.dataHoraInclusao'] || row['dataHoraInclusao'];

                    const ultimaLInha = movimentacoes.length === i + 1;

                    const actions = [
                        {
                            label: 'Adicionar Observação',
                            icon: 'add_circle',
                            onClick: () => onClickActionDescricao({ movimentacaoStatus_id: row['movimentacoesStatus.id'] }),
                            disabled: !acessos.descricao
                        },
                        {
                            label: 'Alterar status',
                            icon: 'edit',
                            onClick: () => onClickActionStatus({ movimentacao_id: row['id'], status_id: row['movimentacoesStatus.status.id'] }),
                            disabled: !acessos.status
                        },
                        {
                            label: 'Encaminhar',
                            icon: 'send',
                            onClick: () => onClickActionMovimentacao({ uorDestino_id: row.uorOrigem_id, status_id: 1 }),
                            disabled: !acessos.movimentacao
                        },
                        {
                            label: 'Encaminhar para Homologação',
                            icon: 'send',
                            onClick: () => onClickActionMovimentacao({ uorDestino_id: demanda.uorOrigem_id, status_id: 5 }),
                            disabled: !acessos.movimentacao,
                            hide: EM_HOMOLOGACAO || HOMOLOGADO || FINALIZADO,
                        },
                        {
                            label: 'Devolver p/ complemento informações',
                            icon: 'reply',
                            onClick: () => onClickActionMovimentacao({ uorDestino_id: row.uorOrigem_id, status_id: 9, uorDestinoAutomatica: true }),
                            disabled: !acessos.devolucao.informacao,
                            hide: EM_HOMOLOGACAO || HOMOLOGADO || FINALIZADO,
                        },
                        {
                            label: 'Devolver p/ ajustes',
                            icon: 'reply',
                            onClick: () => onClickActionMovimentacao({ uorDestino_id: row.uorOrigem_id, status_id: 10, uorDestinoAutomatica: true }),
                            disabled: !acessos.devolucao.ajuste,
                            hide: !EM_HOMOLOGACAO || HOMOLOGADO || FINALIZADO,
                        },
                        {
                            label: 'Responder',
                            icon: 'reply',
                            onClick: () => onClickActionMovimentacao({ uorDestino_id: row.uorOrigem_id, status_id: 1, uorDestinoAutomatica: true, }),
                            disabled: !acessos.responder,
                            hide: !DEVOLVIDO,
                        },
                        {
                            label: 'Homologar',
                            icon: 'done',
                            onClick: () => onClickActionStatus({ movimentacao_id: row['id'], status_id: 6, statusAutomatico: true }),
                            disabled: !acessos.homologacao,
                            hide: HOMOLOGADO || FINALIZADO,
                        },
                        {
                            label: 'Finalizar',
                            icon: 'done_all',
                            onClick: () => onClickActionStatus({ movimentacao_id: row['id'], status_id: 7, statusAutomatico: true }),
                            disabled: !acessos.finalizar,
                            hide: FINALIZADO,
                        },
                        {
                            label: 'Reabrir',
                            icon: 'refresh',
                            onClick: () => onClickActionMovimentacao({ uorDestino_id: demanda.uorDestino_id, status_id: 8 }),
                            disabled: !acessos.reabrir,
                            hide: !FINALIZADO,
                        },
                    ];

                    return (
                        <TableRow>
                            <TableCell align="center"><AvatarUsuario chave={usuario.id} title={`${usuario.id} - ${usuario.nome}`} /></TableCell>
                            <TableCell align="center">{moment(data).format('DD/MM/YYYY HH:mm')}</TableCell>
                            <TableCell>{exibirMovimentacao && row['uorOrigem.nomeReduzido']}</TableCell>
                            <TableCell>{exibirMovimentacao && row['uorDestino.nomeReduzido']}</TableCell>
                            <TableCell>{exibirStatus && row['movimentacoesStatus.status.nome']}</TableCell>
                            <TableCell>{row['movimentacoesStatus.descricoes.descricao']}</TableCell>
                            <TableCell>{ultimaLInha && <IconMenu actions={actions} />}</TableCell>
                        </TableRow>)
                })}
            </TableBody>
        </Table>

    );
};

export default Component;

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

    const ENCAMINHADO_HOMOLOGACAO = demanda.tipoMovimentacao_id === 2;
    const DEVOLVILDO_COMPLEMENTO_INFORMACOES = demanda.tipoMovimentacao_id === 3;
    const DEVOLVIDO_AJUSTES = demanda.tipoMovimentacao_id === 4;
    const ENCAMINHADO_RESPONSAVEL = demanda.tipoMovimentacao_id === 5;

    const EM_HOMOLOGACAO = demanda.status_id === 5;
    const HOMOLOGADO = demanda.status_id === 6;
    const FINALIZADO = demanda.status_id === 7;

    return (

        <Table>
            <TableHead>
                <TableRow>
                    <TableCell component="th" align="center" style={{ width: '5%' }}></TableCell>
                    <TableCell component="th" align="center" style={{ width: '8%' }}>De</TableCell>
                    <TableCell component="th" align="center" style={{ width: '8%' }}>Para</TableCell>
                    <TableCell component="th" align="center" style={{ width: '5%' }}>Status</TableCell>
                    <TableCell component="th" align="center" style={{ width: '5%' }}>Funcionário</TableCell>
                    <TableCell component="th" align="center" style={{ width: '5%' }}>Data</TableCell>
                    <TableCell component="th" align="center">Descrição</TableCell>
                    <TableCell component="th" align="center" style={{ width: '1%' }}></TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {movimentacoes.map((row, i) => {

                    const isSolicitanteAtual = uorUsuarioId === row.uorOrigem_id;
                    const isResponsavelAtual = uorUsuarioId === row.uorDestino_id;

                    const acessos = {
                        descricao: !FINALIZADO && (isResponsavelAtual || isSolicitanteAtual),
                        status: !FINALIZADO && (isResponsavelAtual),
                        movimentacao: !FINALIZADO && (isResponsavelAtual),
                        devolucaoInformacao: !FINALIZADO && !DEVOLVILDO_COMPLEMENTO_INFORMACOES && (isResponsavelAtual),
                        encaminharHomologacao: !FINALIZADO && (isResponsavelAtual && isResponsavelDemanda),
                        homologacao: !FINALIZADO && ENCAMINHADO_HOMOLOGACAO && (isResponsavelAtual),
                        devolucaoAjuste: !FINALIZADO && ENCAMINHADO_HOMOLOGACAO && (isResponsavelAtual),
                        finalizar: !FINALIZADO && HOMOLOGADO && (isResponsavelAtual),
                        reabrir: FINALIZADO && isSolicitanteDemanda,
                    };

                    const rowAnterior = movimentacoes[i - 1];

                    const exibirMovimentacao = !rowAnterior ? true : row['id'] !== rowAnterior['id'];
                    const exibirStatus = !rowAnterior ? true : row['movimentacoesStatus.status.id'] !== rowAnterior['movimentacoesStatus.status.id'];

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
                            onClick: () => onClickActionStatus({ movimentacao_id: row['id'], status_id: row['movimentacoesStatus.status.id'], tipoMovimentacao_id: row['tipo.id'] }),
                            disabled: !acessos.status
                        },
                        {
                            label: 'Encaminhar',
                            icon: 'send',
                            onClick: () => onClickActionMovimentacao({ uorDestino_id: row.uorOrigem_id, tipoMovimentacao_id: 1, status_id: 1 }),
                            disabled: !acessos.movimentacao
                        },
                        {
                            label: 'Encaminhar para Homologação',
                            icon: 'send',
                            onClick: () => onClickActionMovimentacao({ uorDestino_id: demanda.uorOrigem_id, tipoMovimentacao_id: 2, status_id: 5 }),
                            disabled: !acessos.encaminharHomologacao,
                            // hide: EM_HOMOLOGACAO || HOMOLOGADO,
                        },
                        {
                            label: 'Devolver para complemento informações',
                            icon: 'reply',
                            onClick: () => onClickActionMovimentacao({ uorDestino_id: row.uorOrigem_id, tipoMovimentacao_id: 3, status_id: 1 }),
                            disabled: !acessos.devolucaoInformacao,
                            // hide: DEVOLVILDO_COMPLEMENTO_INFORMACOES || ENCAMINHADO_HOMOLOGACAO,
                        },
                        {
                            label: 'Devolver para Ajustes',
                            icon: 'reply',
                            onClick: () => onClickActionMovimentacao({ uorDestino_id: row.uorOrigem_id, tipoMovimentacao_id: 4, status_id: 1 }),
                            disabled: !acessos.devolucaoAjuste,
                            // hide: !EM_HOMOLOGACAO,
                        },
                        {
                            label: 'Homologar',
                            icon: 'done',
                            onClick: () => onClickActionMovimentacao({ uorDestino_id: row.uorOrigem_id, tipoMovimentacao_id: 5, status_id: 6 }),
                            disabled: !acessos.homologacao,
                            // hide: !EM_HOMOLOGACAO,
                        },
                        {
                            label: 'Finalizar',
                            icon: 'done_all',
                            onClick: () => onClickActionStatus({ movimentacao_id: row['id'], status_id: 7 }),
                            disabled: !acessos.finalizar,
                            // hide: FINALIZADO,
                        },
                        {
                            label: 'Reabrir',
                            icon: 'refresh',
                            onClick: () => onClickActionMovimentacao({ uorDestino_id: row.uorDestino_id, tipoMovimentacao_id: 1, status_id: 8 }),
                            disabled: !acessos.reabrir,
                            //hide: !FINALIZADO,
                        },
                    ];

                    return (
                        <TableRow>
                            <TableCell>{exibirMovimentacao && row['tipo.nome']}</TableCell>
                            <TableCell>{exibirMovimentacao && row['uorOrigem.nomeReduzido']}</TableCell>
                            <TableCell>{exibirMovimentacao && row['uorDestino.nomeReduzido']}</TableCell>
                            <TableCell>{exibirStatus && row['movimentacoesStatus.status.nome']}</TableCell>
                            <TableCell align="center"><AvatarUsuario chave={usuario.id} title={`${usuario.id} - ${usuario.nome}`} /></TableCell>
                            <TableCell align="center">{moment(data).format('DD/MM/YYYY HH:mm')}</TableCell>
                            <TableCell>{row['movimentacoesStatus.descricoes.descricao']}</TableCell>
                            <TableCell>{ultimaLInha && <IconMenu actions={actions} />}</TableCell>
                        </TableRow>)
                })}
            </TableBody>
        </Table>

    );
};

export default Component;

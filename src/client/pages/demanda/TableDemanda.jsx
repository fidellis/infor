import React from 'react';
import Icon from '~/components/icons/Icon';
import AvatarUsuario from '~/components/avatar/AvatarUsuario';
import IconMenu from '~/components/icons/IconMenu';
import moment from 'moment';
import { Table, TableHead, TableRow, TableCell, TableBody, } from '@material-ui/core';

const Component = props => {

    const {
        movimentacoes,
        acessos,
        onClickActionDescricao,
        onClickActionStatus,
        onClickActionMovimentacao,
    } = props;

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
                            hide: !acessos.descricao
                        },
                        {
                            label: 'Alterar status',
                            icon: 'edit',
                            onClick: () => onClickActionStatus({ movimentacao_id: row['id'], status_id: row['movimentacoesStatus.status.id'], statusMovimentacao_id: row['status.id'] }),
                            hide: !acessos.status
                        },
                        {
                            label: 'Encaminhar',
                            icon: 'send',
                            onClick: () => onClickActionMovimentacao(),
                            hide: !acessos.movimentacao
                        },
                        {
                            label: 'Encaminhar Homologação',
                            icon: 'send',
                            onClick: () => onClickActionMovimentacao(2),
                            hide: !acessos.movimentacao
                        },
                    ];

                    return (
                        <TableRow>
                            <TableCell>{exibirMovimentacao && row['status.nome']}</TableCell>
                            <TableCell>{exibirMovimentacao && row['uorOrigem.nomeReduzido']}</TableCell>
                            <TableCell>{exibirMovimentacao && row['uorDestino.nomeReduzido']}</TableCell>
                            <TableCell>{exibirStatus && row['movimentacoesStatus.status.nome']}</TableCell>
                            <TableCell align="center"><AvatarUsuario chave={usuario.id} title={`${usuario.id} - ${usuario.nome}`} /></TableCell>
                            <TableCell align="center">{moment(data).format('DD/MM/YYYY HH:mm')}</TableCell>
                            <TableCell>{row['movimentacoesStatus.descricoes.descricao']}</TableCell>
                            <TableCell>{ultimaLInha && !!actions.length && <IconMenu actions={actions} />}</TableCell>
                        </TableRow>)
                })}
            </TableBody>
        </Table>

    );
};

export default Component;

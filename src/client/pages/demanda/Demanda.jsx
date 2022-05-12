import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { message } from '~/store/app';
import { getData, save, destroy } from '~/lib/api';
import Card from '~/components/Card';
import Icon from '~/components/icons/Icon';
import AvatarUsuario from '~/components/avatar/AvatarUsuario';
import Grid from '~/components/Grid';
import { TextInput, TextArea, NumberInput, DateInput, Select } from '~/components/form/form/inputs';
import SelectStatusDemanda from '~/components/select/SelectStatusDemanda';
import SelectUor from '~/components/select/SelectUor';
import moment from 'moment';
import { Table, TableHead, TableRow, TableCell, TableBody, } from '@material-ui/core';
import DialogForm from './DialogForm';


const TextAreaDescricao = props => (
    <TextArea
        {...props}
        id="descricao"
        label="Descrição"
        rows={10}
    />
);

const Component = ({ match, message, history }) => {
    const id = Number(match.params.id);
    const [demanda, setDemanda] = useState({});
    const [descricoes, setDescricoes] = useState([]);
    const [descricao, setDescricao] = useState({ movimentacao: {} });
    const [movimentacao, setMovimentacao] = useState({});
    const [exibeDialog, setExibeDialog] = useState({});

    async function change() {
        const [Demanda, Descricoes] = await getData(`/demanda/descricao/${id}`);
        setDemanda(Demanda);
        setDescricoes(Descricoes);
    }

    useEffect(() => {
        if (id) change();
    }, []);


    function onChangeDescricao({ id, value }) {
        setDescricao({ ...descricao, [id]: value });
    }

    function onChangeMovimentacao({ id, value }) {
        setMovimentacao({ ...movimentacao, [id]: value });
    }


    function onChangeDialog(id) {
        setExibeDialog({ [id]: !exibeDialog[id] });
    }

    function onClickActionDescricao({ form, ...params }) {
        setDescricao(params);
        onChangeDialog(form)
    }

    function onClickActionMovimentacao({ form, ...params }) {
        setMovimentacao({ demanda_id: id, ...params });
        onChangeDialog(form)
    }

    async function salvarDescricao() {
        const response = await save('/demanda/descricao', descricao);
        if (response) {
            message('Observação salva com sucesso');
            atualizar(id);
        }
    }

    async function salvarMovimentacao() {
        const response = await save('/demanda/movimentacao', movimentacao);
        if (response) {
            message('Enviado com sucesso');
            atualizar(id);
        }
    }

    function atualizar(id) {
        history.push(`/demanda/${id}`);
    }

    function voltar() {
        history.push(`/demandas`);
    }

    return (
        <div>
            <Card>
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
                        {descricoes.map((descricao, i) => {
                            const { movimentacao, usuarioInclusao, usuarioInclusao_id, dataHoraInclusao, status } = descricao;
                            const descricaoAnterioro = descricoes[i - 1];
                            const exibirMovimentacao = !descricaoAnterioro ? true : descricaoAnterioro.movimentacao.id !== descricao.movimentacao.id;
                            const exibirStatus = !descricaoAnterioro ? true : descricaoAnterioro.status_id !== descricao.status_id;
                            const ultimaLInha = descricoes.length === i + 1;

                            return (
                                <TableRow>
                                    <TableCell>{exibirMovimentacao && movimentacao.status.nome}</TableCell>
                                    <TableCell>{exibirMovimentacao && movimentacao.uorOrigem.nomeReduzido}</TableCell>
                                    <TableCell>{exibirMovimentacao && movimentacao.uorDestino.nomeReduzido}</TableCell>
                                    <TableCell>{exibirStatus && status.nome}</TableCell>
                                    <TableCell align="center"><AvatarUsuario chave={usuarioInclusao_id} title={`${usuarioInclusao_id} - ${usuarioInclusao.nome}`} /></TableCell>
                                    <TableCell align="center">{moment(dataHoraInclusao).format('DD/MM/YYYY HH:mm')}</TableCell>
                                    <TableCell>{descricao.descricao}</TableCell>
                                    <TableCell>
                                        {ultimaLInha && <Icon fontSize="small" title="Adicionar Observação" onClick={() => onClickActionDescricao({ form: 'descricao', movimentacao_id: movimentacao.id, status_id: descricao.status_id, movimentacao })}>add_circle</Icon>}
                                        {ultimaLInha && <Icon fontSize="small" title="Alterar status" onClick={() => onClickActionDescricao({ form: 'status', movimentacao_id: movimentacao.id, status_id: descricao.status_id, movimentacao })}>edit</Icon>}
                                        {ultimaLInha && <Icon fontSize="small" title="Encaminhar" onClick={() => onClickActionMovimentacao({ form: 'movimentacao', movimentacao_id: movimentacao.id, status_id: movimentacao.status_id, uorDestino_id: movimentacao.uorDestino_id })}>send</Icon>}
                                    </TableCell>
                                </TableRow>)
                        })}
                    </TableBody>
                </Table>
            </Card>

            <DialogForm
                formId="descricao"
                action={salvarDescricao}
                onChangeDialog={onChangeDialog}
                exibeDialog={exibeDialog}
            >
                <Grid container spacing={1}>
                    <Grid item xs={12}>
                        <TextAreaDescricao
                            value={descricao.descricao}
                            onChange={onChangeDescricao}
                            required
                        />
                    </Grid>
                </Grid>
            </DialogForm>

            <DialogForm
                formId="status"
                action={salvarDescricao}
                onChangeDialog={onChangeDialog}
                exibeDialog={exibeDialog}
                isValid={descricao.status_id != demanda.status_id}
            >
                <Grid container spacing={1}>
                    <Grid item xs={4}>
                        <SelectStatusDemanda
                            value={descricao.status_id}
                            onChange={onChangeDescricao}
                            required
                            statusMovimentacao_id={descricao.movimentacao.status_id}
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <TextAreaDescricao
                            value={descricao.descricao}
                            onChange={onChangeDescricao}
                        />
                    </Grid>
                </Grid>
            </DialogForm>
            {console.log(movimentacao.uorDestino_id, demanda.uorResponsavel_id)}
            <DialogForm
                formId="movimentacao"
                action={salvarMovimentacao}
                onChangeDialog={onChangeDialog}
                exibeDialog={exibeDialog}
                isValid={movimentacao.uorDestino_id != demanda.uorResponsavel_id}
            >
                <Grid container spacing={1}>
                    <Grid item xs={6}>
                        <SelectUor
                            id="uorDestino_id"
                            value={movimentacao.uorDestino_id}
                            onChange={onChangeMovimentacao}
                            required
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <TextAreaDescricao
                            value={movimentacao.descricao}
                            onChange={onChangeMovimentacao}
                        />
                    </Grid>
                </Grid>
            </DialogForm>

        </div>
    );
};

const mapDispatchToProps = ({ message });
export default connect(() => { }, mapDispatchToProps)(Component);

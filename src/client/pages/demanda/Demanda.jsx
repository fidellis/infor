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
import SelectStatusMovimentacaoDemanda from '~/components/select/SelectStatusMovimentacaoDemanda';
import SelectUor from '~/components/select/SelectUor';
import DialogForm from './DialogForm';
import TableDemanda from './TableDemanda';

const TextAreaDescricao = props => (
    <TextArea
        {...props}
        id="descricao"
        label="Descrição"
        rows={10}
    />
);

const initialState = { uorInclusao: {}, uorResponsavel: {}, responsaveis: [] };

const Component = ({ match, message, history, usuario }) => {
    const id = Number(match.params.id);

    const [demanda, setDemanda] = useState(initialState);
    const [movimentacoes, setMovimentacoes] = useState([]);

    const [movimentacao, setMovimentacao] = useState({});
    const [status, setStatus] = useState({});
    const [descricao, setDescricao] = useState({ movimentacao: {} });

    const [exibeDialog, setExibeDialog] = useState({});

    async function change() {
        const [d, m] = await getData(`/demanda/movimentacao/${id}`);
        setDemanda(d || initialState);
        setMovimentacoes(m);
    }

    useEffect(() => {
        if (id) change();
    }, []);

    function onChangeDescricao({ id, value }) {
        setDescricao({ ...descricao, [id]: value });
    }

    function onChangestatus({ id, value }) {
        setStatus({ ...status, [id]: value });
    }

    function onChangeMovimentacao({ id, value }) {
        setMovimentacao({ ...movimentacao, [id]: value });
    }

    function onChangeDialog(id) {
        setExibeDialog({ [id]: !exibeDialog[id] });
    }

    function onClickActionDescricao(params) {
        setDescricao(params);
        onChangeDialog('descricao')
    }

    function onClickActionStatus(params) {
        setStatus(params);
        onChangeDialog('status')
    }

    function onClickActionMovimentacao(params) {
        setMovimentacao({ demanda_id: id, ...params });
        onChangeDialog('movimentacao')
    }

    async function salvarDescricao() {
        const response = await save('/demanda/descricao', descricao);
        if (response) {
            message('Observação salva com sucesso');
            atualizar(id);
        }
    }

    async function salvarStatus() {
        const response = await save('/demanda/movimentacaoStatus', status);
        if (response) {
            message('Status salvo com sucesso');
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
            <div>Título: {demanda.titulo}</div>
            <div>UOR Solicitante: {demanda.uorInclusao.nome}</div>
            <div>UOR Responsável: {demanda.uorResponsavel.nome}</div>


            <Card>
                <TableDemanda
                    usuario={usuario}
                    demanda={demanda}
                    movimentacoes={movimentacoes}
                    // acessos={acessos}
                    onClickActionDescricao={onClickActionDescricao}
                    onClickActionStatus={onClickActionStatus}
                    onClickActionMovimentacao={onClickActionMovimentacao}
                />
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
                action={salvarStatus}
                onChangeDialog={onChangeDialog}
                exibeDialog={exibeDialog}
                isValid={status.status_id != demanda.status_id}
            >
                <Grid container spacing={1}>
                    {status.tipoMovimentacao_id &&
                        <Grid item xs={4}>
                            <SelectStatusDemanda
                                value={status.status_id}
                                onChange={onChangestatus}
                                required
                                tipoMovimentacao_id={status.tipoMovimentacao_id}
                            />
                        </Grid>}

                    <Grid item xs={12}>
                        <TextAreaDescricao
                            value={status.descricao}
                            onChange={onChangestatus}
                        />
                    </Grid>
                </Grid>
            </DialogForm>

            <DialogForm
                formId="movimentacao"
                title="Encaminhar"
                action={salvarMovimentacao}
                onChangeDialog={onChangeDialog}
                exibeDialog={exibeDialog}
                isValid={movimentacao.uorDestino_id != demanda.uorDestinoAtual_id}
            >
                <Grid container spacing={1}>
                    <Grid item xs={6}>
                        <SelectUor
                            label="Para"
                            id="uorDestino_id"
                            value={movimentacao.uorDestino_id}
                            onChange={onChangeMovimentacao}
                            required
                        />
                    </Grid>

                    {/* <Grid item xs={4}>
                        <SelectStatusMovimentacaoDemanda
                            value={movimentacao.status_id}
                            onChange={onChangeMovimentacao}
                            required
                        // tipoMovimentacao_id={movimentacao.tipoMovimentacao_id}
                        />
                    </Grid> */}

                    <Grid item xs={12}>
                        <TextAreaDescricao
                            value={movimentacao.descricao}
                            onChange={onChangeMovimentacao}
                            required
                        />
                    </Grid>
                </Grid>
            </DialogForm>

        </div>
    );
};

const mapDispatchToProps = ({ message });
export default connect(() => { }, mapDispatchToProps)(Component);

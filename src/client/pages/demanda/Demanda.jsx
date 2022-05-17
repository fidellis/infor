import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { message } from '~/store/app';
import { getData, save, destroy } from '~/lib/api';
import Card from '~/components/Card';
import Icon from '~/components/icons/Icon';
import Text from '~/components/Text';
import AvatarUsuario from '~/components/avatar/AvatarUsuario';
import Grid from '~/components/Grid';
import { TextInput, TextArea, NumberInput, DateInput, Select } from '~/components/form/form/inputs';
import SelectStatusDemanda from '~/components/select/SelectStatusDemanda';
import SelectStatusMovimentacaoDemanda from '~/components/select/SelectStatusMovimentacaoDemanda';
import SelectUor from '~/components/select/SelectUor';
import TextField from '~/components/inputs/TextField';
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
    console.log('demanda', demanda)
    return (
        <div>
            <Grid container spacing={2}>

                <Grid item xs={12}>
                    <Card width="90%">
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <Text variant="h5">{demanda.titulo}</Text>
                            </Grid>
                            <Grid item xs={5}>
                                <TextField label="UOR SOLICITANTE" value={demanda.uorInclusao.nome} />
                            </Grid>
                            <Grid item xs={5}>
                                <TextField label="UOR RESPONSÁVEL" value={demanda.uorResponsavel.nome} />
                            </Grid>
                            <Grid item xs={4}>
                                {demanda.responsaveis.map(r => <AvatarUsuario chave={r.usuario_id} />)}
                            </Grid>
                        </Grid>
                    </Card>
                </Grid>

                <Grid item xs={12}>
                    <Card width="90%">
                        <TableDemanda
                            usuario={usuario}
                            demanda={demanda}
                            movimentacoes={movimentacoes}
                            onClickActionDescricao={onClickActionDescricao}
                            onClickActionStatus={onClickActionStatus}
                            onClickActionMovimentacao={onClickActionMovimentacao}
                        />
                    </Card>
                </Grid>

            </Grid>

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

                    {!status.statusAutomatico &&
                        <Grid item xs={4}>
                            <SelectStatusDemanda
                                value={status.status_id}
                                onChange={onChangestatus}
                                required
                                statusId={demanda.status_id}
                                params={{ id: [1, 2, 3] }}
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
                // title="Encaminhar"
                action={salvarMovimentacao}
                onChangeDialog={onChangeDialog}
                exibeDialog={exibeDialog}
                isValid={movimentacao.uorDestino_id != demanda.uorDestinoAtual_id}
            >
                <Grid container spacing={1}>
                    {!movimentacao.uorDestinoAutomatica &&
                        <Grid item xs={6}>
                            <SelectUor
                                label="Para"
                                id="uorDestino_id"
                                value={movimentacao.uorDestino_id}
                                onChange={onChangeMovimentacao}
                                required
                            />
                        </Grid>}

                    {/* {movimentacao.devolucao &&
                        <Grid item xs={4}>
                            <SelectStatusMovimentacaoDemanda
                                value={movimentacao.status_id}
                                onChange={onChangeMovimentacao}
                                required
                            />
                        </Grid>} */}

                    <Grid item xs={12}>
                        <TextAreaDescricao
                            value={movimentacao.descricao}
                            onChange={onChangeMovimentacao}
                        />
                    </Grid>
                </Grid>
            </DialogForm>

        </div >
    );
};

const mapDispatchToProps = ({ message });
export default connect(() => { }, mapDispatchToProps)(Component);

import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { message } from '~/store/app';
import moment from 'moment';
import Form from '~/components/form/Form';
import { TextInput, NumberInput, DateInput, Select, TextArea } from '~/components/form/form/inputs';
import SelectTipoPainel from '~/components/select/SelectTipoPainel';
import SelectTipoProvidencia from '~/components/select/SelectTipoProvidencia';
import SelectUsuario from '~/components/select/SelectUsuario';
import SelectStatusPainel from '~/components/select/SelectStatusPainel';
import SelectTagPainel from '~/components/select/SelectTagPainel';
import { Grid } from '@material-ui/core';
import { save, destroy } from '~/lib/api';
import qs from 'qs';
import { getDado } from './hook';

const Component = (props) => {

  const id = Number(props.match.params.id);
  const response = getDado({ id, include: ['usuarioInclusao', 'tags'] });
  const [data, setData] = useState(response);

  useEffect(() => {
    setData(response);
  }, [response]);


  function onChange({ id, value }) {
    console.log(id, value)
    setData({ ...data, [id]: value });
  }

  async function salvar() {
    const response = await save('/painel', data);
    if (response) {
      props.message('Salvo com sucesso');
      atualizar(response.id);
    }
  }

  async function excluir(id) {
    if (confirm('Excluir?')) {
      const response = await destroy(`/paineis/painel/${id}`);
      if (response) {
        props.message('Excluído com sucesso');
        voltar();
      }
    }
  }

  function atualizar(id) {
    props.history.push(`/painel/${id}`);
  }

  function voltar() {
    props.history.push(`/paineis`);
  }

  return (
    <div>
      <Form
        width="80%"
        action={salvar}
        actions={[
          {
            label: 'Novo',
            onClick: () => atualizar(0),
            hide: !id,
          },
          {
            type: 'submit',
            label: 'Salvar',
          },
          {
            label: 'Excluir',
            onClick: () => excluir(id),
            hide: !id,
          },
          {
            label: 'Voltar',
            onClick: voltar,
          },
        ]}>
        <Grid container spacing={2}>

          <Grid item xs={3}>
            <TextInput
              id="dataHoraInclusao"
              label="Data Inclusão"
              value={moment(data.dataHoraInclusao).format('DD/MM/YYYY')}
              disabled
              hide={!id}
            />
          </Grid>

          <Grid item xs={9}>
            <TextInput
              id="usuarioInclusao"
              label="Usuário Inclusão"
              value={data.usuarioInclusao.nome}
              disabled
              hide={!id}
            />
          </Grid>

          <Grid item xs={12}>
            <TextInput
              id="nome"
              label="Título"
              value={data.nome}
              onChange={onChange}
              required
              maxLength={100}
            />
          </Grid>

          <Grid item xs={4}>
            <SelectUsuario
              id="responsavel_id"
              label="Responsável"
              value={data.responsavel_id}
              onChange={onChange}
              params={{ prefixo: 9973, uor_id: 283521, order: ['nome'] }}
              required
            />
          </Grid>

          <Grid item xs={4}>
            <SelectUsuario
              id="responsavel2_id"
              label="Responsável Lateral"
              value={data.responsavel2_id}
              onChange={onChange}
              params={{ prefixo: 9973, uor_id: 283521, order: ['nome'] }}
            />
          </Grid>

          <Grid item xs={4}>
            <SelectTagPainel
              value={data.tags}
              onChange={onChange}
              required
              isMulti
            />
          </Grid>

          <Grid item xs={2}>
            <SelectTipoPainel
              value={data.tipo_id}
              onChange={onChange}
              required
            />
          </Grid>

          <Grid item xs={10}>
            <TextInput
              id="link"
              label="Endereço Painel"
              value={data.link}
              onChange={onChange}
              required
            />
          </Grid>

          <Grid item xs={2}>
            <DateInput
              id="dataCriacao"
              label="Data Criação"
              value={data.dataCriacao}
              onChange={onChange}
              required
            />
          </Grid>

          <Grid item xs={8}>
            <TextInput
              id="linkPop"
              label="Link do POP"
              value={data.linkPop}
              onChange={onChange}
            />
          </Grid>


          <Grid item xs={2}>
            <SelectStatusPainel
              value={data.status_id}
              onChange={onChange}
            />
          </Grid>

          <Grid item xs={12}>
            <TextArea
              id="descricao"
              label="Descrição"
              value={data.descricao}
              onChange={onChange}
              maxLength={100}
              rows={4}
              required
            />
          </Grid>

        </Grid>
      </Form>
    </div>
  );
}

Component.propTypes = {};
const mapStateToProps = ({ app: { usuario } }) => ({ usuario });
const mapDispatchToProps = ({ message });

export default connect(mapStateToProps, mapDispatchToProps)(Component);
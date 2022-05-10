import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { message } from '~/store/app';
import Card from '~/components/Card';
import Grid from '~/components/Grid';
import Form from '~/components/form/Form';
import { TextInput, TextArea, NumberInput, DateInput, Select } from '~/components/form/form/inputs';
import SelectUor from '~/components/select/SelectUor';
import { getData, save, destroy } from '~/lib/api';
//import qs from 'qs';

const Component = ({ match, message, history }) => {
  const id = Number(match.params.id);
  //const query = qs.parse(props.location.search.replace('?', ''));
  const [data, setData] = useState({ usuarioInclusao: {} });

  async function change() {
    const response = await getData(`/demanda/demanda/${id}`);
    setData(response);
  }

  useEffect(() => {
    if (id) change();
  }, []);


  function onChange({ id, value }) {
    setData({ ...data, [id]: value });
  }

  async function salvar() {
    const response = await save('/demanda', data);
    if (response) {
      message('Salvo com sucesso');
      atualizar(response.id);
    }
  }

  async function excluir() {
    if (confirm('Excluir?')) {
      const response = await destroy(`/demanda/demanda/${id}`);
      if (response) {
        message('Excluído com sucesso');
        voltar();
      }
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
      <Card width="80%">
        <Form
          action={salvar}
          actions={[
            {
              label: 'Novo',
              onClick: () => atualizar(0),
              hide: !id,
            },
            {
              type: 'submit',
              label: 'Salvar'
            },
            {
              label: 'Excluir',
              onClick: () => excluir(),
              hide: !id,
            },
            {
              label: 'Voltar',
              onClick: voltar
            },
          ]}>
          <Grid container spacing={2}>

            <Grid item xs={12}>
              <TextInput
                id="titulo"
                label="Título"
                value={data.titulo}
                onChange={onChange}
                required
                maxLength={255}
              />
            </Grid>

            {/* <Grid item xs={3}>
              <DateInput
                id="dataHoraInclusao"
                label="Data"
                value={data.dataHoraInclusao}
                onChange={onChange}
              />
            </Grid> */}

            <Grid item xs={3}>
              <SelectUor
                id="uorResponsavel_id"
                label="UOR Destino"
                value={data.uorResponsavel_id}
                onChange={onChange}
                required
              />
            </Grid>

            <Grid item xs={12}>
              <TextArea
                id="descricao"
                label="Descrição"
                value={data.descricao}
                onChange={onChange}
                required
                rows={10}
              />
            </Grid>

          </Grid>
        </Form>
      </Card>
    </div>
  );
};

const mapDispatchToProps = ({ message });

export default connect(() => { }, mapDispatchToProps)(Component);
